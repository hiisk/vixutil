'use client';
import ToolIcon from '@/components/ToolIcon';
import { WEBCAM_UI, type DeviceLang } from '@/lib/device-ui-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 웹캠 테스트 — 화면이 나오는지, 어떤 해상도·프레임으로 들어오는지 본다.
 *
 * 트랙 설정(getSettings)이 알려주는 값은 "요청한 값"에 가깝다. 실제로 몇 장이
 * 그려지는지는 따로 세야 해서, 지원되면 requestVideoFrameCallback으로 실측한다.
 *
 * 미리보기는 좌우 반전이 기본이다 — 거울처럼 보여야 사람이 자기 얼굴을 맞춘다.
 * 다만 스냅샷은 반전 상태 그대로 저장한다(보이는 대로 저장돼야 헷갈리지 않는다).
 */
type FrameVideo = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number;
};

export default function WebcamTest({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = WEBCAM_UI[lang];
  const [state, setState] = useState<'idle' | 'starting' | 'on' | 'denied'>('idle');
  const [error, setError] = useState('');
  const [info, setInfo] = useState<{ w: number; h: number; fps: number | null; label: string } | null>(null);
  const [measured, setMeasured] = useState(0);
  const [mirror, setMirror] = useState(true);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState('');
  const [shot, setShot] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const shotRef = useRef('');
  const framesRef = useRef(0);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setState('idle');
    setInfo(null);
    setMeasured(0);
  }, []);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (shotRef.current) URL.revokeObjectURL(shotRef.current);
  }, []);

  // 초당 실제로 도착한 프레임 수를 센다.
  useEffect(() => {
    if (state !== 'on') return;
    const id = window.setInterval(() => {
      setMeasured(framesRef.current);
      framesRef.current = 0;
    }, 1000);
    return () => window.clearInterval(id);
  }, [state]);

  const start = useCallback(async (id?: string) => {
    setState('starting');
    setError('');
    try {
      streamRef.current?.getTracks().forEach(t => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: id ? { deviceId: { exact: id } } : { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;

      const video = videoRef.current as FrameVideo | null;
      if (video) {
        video.srcObject = stream;
        await video.play().catch(() => {});
        const count = () => {
          framesRef.current += 1;
          video.requestVideoFrameCallback?.(count);
        };
        video.requestVideoFrameCallback?.(count);
      }

      const track = stream.getVideoTracks()[0];
      const s = track.getSettings();
      setInfo({
        w: s.width ?? video?.videoWidth ?? 0,
        h: s.height ?? video?.videoHeight ?? 0,
        fps: s.frameRate ? Math.round(s.frameRate) : null,
        label: track.label || ui.cameraWord,
      });
      setState('on');

      const list = await navigator.mediaDevices.enumerateDevices();
      setDevices(list.filter(d => d.kind === 'videoinput'));
      setDeviceId(s.deviceId ?? '');
    } catch (e) {
      const name = e instanceof DOMException ? e.name : '';
      setState('denied');
      setError(
        name === 'NotAllowedError'
          ? ui.denied
          : name === 'NotFoundError'
            ? ui.notFound
            : ui.cannotOpen,
      );
    }
  }, []);

  const snapshot = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      if (!blob) return;
      if (shotRef.current) URL.revokeObjectURL(shotRef.current);
      const url = URL.createObjectURL(blob);
      shotRef.current = url;
      setShot(url);
    }, 'image/png');
  }, [mirror]);

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`w-full h-full object-cover ${state === 'on' ? '' : 'hidden'} ${mirror ? 'scale-x-[-1]' : ''}`}
        />
        {state !== 'on' && (
          <div className="text-center px-6">
            <ToolIcon emoji="📷" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              {ui.prompt}
            </p>
            <button
              onClick={() => start()}
              disabled={state === 'starting'}
              className="rounded-xl bg-sec font-bold px-7 py-3 text-sm shadow-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {state === 'starting' ? ui.opening : ui.startTest}
            </button>
            {error && <p className="mt-4 text-xs text-rose-300 leading-relaxed max-w-sm mx-auto">{error}</p>}
          </div>
        )}
        {state === 'on' && info && (
          <span className="absolute top-2.5 left-3 rounded-lg bg-black/55 px-2.5 py-1 text-[11px] font-mono text-white">
            {info.w}×{info.h} · {measured || info.fps || '–'}fps
          </span>
        )}
      </div>

      {state === 'on' && info && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="rounded-xl border chip-off px-3 py-3 text-center">
              <p className="text-base font-black text-cyan-600">{info.w}×{info.h}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{ui.resolution}</p>
            </div>
            <div className="rounded-xl border chip-off px-3 py-3 text-center">
              <p className="text-base font-black text-blue-600">{measured || info.fps || '–'}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{ui.measuredFps}</p>
            </div>
            <div className="rounded-xl border chip-off px-3 py-3 text-center">
              <p className="text-base font-black text-indigo-600">{info.fps ?? '–'}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{ui.setFps}</p>
            </div>
          </div>

          <p className="mt-2.5 text-center text-xs text-slate-400 dark:text-slate-500 truncate">{info.label}</p>

          {devices.length > 1 && (
            <label className="mt-4 block">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.deviceLabel}</span>
              <select
                value={deviceId}
                onChange={e => { setDeviceId(e.target.value); start(e.target.value); }}
                className="fld mt-1.5 w-full text-slate-700 dark:text-slate-200"
              >
                {devices.map((d, i) => (
                  <option key={d.deviceId} value={d.deviceId}>{d.label || ui.deviceN(i + 1)}</option>
                ))}
              </select>
            </label>
          )}

          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              onClick={snapshot}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3 text-sm text-slate-700 dark:text-slate-200 hover:border-cyan-300 transition-colors"
            >
              {ui.snapshot}
            </button>
            <button
              onClick={() => setMirror(m => !m)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3 text-sm text-slate-700 dark:text-slate-200 hover:border-cyan-300 transition-colors"
            >
              {mirror ? ui.mirrorOn : ui.mirrorOff}
            </button>
            <button
              onClick={stop}
              className="rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 text-sm hover:opacity-90 transition-opacity"
            >
              {ui.turnOff}
            </button>
          </div>

          {shot && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.snapshotTitle}</p>
                <a
                  href={shot}
                  download="webcam-test.png"
                  className="text-xs font-bold text-cyan-600 hover:underline"
                >
                  {ui.saveImage}
                </a>
              </div>
              {/* 로컬 Blob URL이라 next/image의 최적화 대상이 아니다 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot} alt={ui.snapshotAlt} className="w-full rounded-xl border border-slate-200 dark:border-slate-700" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
