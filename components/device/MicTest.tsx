'use client';
import ToolIcon from '@/components/ToolIcon';
import { MIC_TEST_UI, type DeviceLang } from '@/lib/device-ui-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 마이크 테스트 — 입력 레벨을 실시간으로 보여주고, 녹음해서 들려준다.
 *
 * 레벨 미터만으로는 "소리는 들어오는데 왜 상대가 못 알아듣지"를 못 잡는다.
 * 실제로 어떻게 들리는지가 중요해서 녹음·재생을 같이 넣었다. 녹음물은
 * Blob URL로 이 탭 안에서만 재생되고 어디로도 올라가지 않는다.
 */
const BARS = 24;

export default function MicTest({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = MIC_TEST_UI[lang];
  const [state, setState] = useState<'idle' | 'starting' | 'on' | 'denied'>('idle');
  const [error, setError] = useState('');
  const [level, setLevel] = useState(0);
  const [peak, setPeak] = useState(0);
  const [bars, setBars] = useState<number[]>(() => Array(BARS).fill(0));
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState('');
  const [recording, setRecording] = useState(false);
  const [clip, setClip] = useState('');

  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const clipRef = useRef('');

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (recRef.current?.state === 'recording') recRef.current.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    ctxRef.current?.close();
    ctxRef.current = null;
    setState('idle');
    setLevel(0);
    setPeak(0);
    setBars(Array(BARS).fill(0));
    setRecording(false);
  }, []);

  // 탭을 떠날 때 마이크를 반드시 놓아준다 — 안 그러면 녹음 표시등이 계속 켜져 있다
  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    ctxRef.current?.close();
    if (clipRef.current) URL.revokeObjectURL(clipRef.current);
  }, []);

  const start = useCallback(async (id?: string) => {
    setState('starting');
    setError('');
    try {
      streamRef.current?.getTracks().forEach(t => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: id ? { deviceId: { exact: id } } : true,
      });
      streamRef.current = stream;

      const Ctx: typeof AudioContext =
        window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.75;
      ctx.createMediaStreamSource(stream).connect(analyser);

      const time = new Uint8Array(analyser.fftSize);
      const freq = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser.getByteTimeDomainData(time);
        let sum = 0;
        for (const v of time) {
          const d = (v - 128) / 128;
          sum += d * d;
        }
        // RMS를 그대로 쓰면 말소리가 20%대에서만 논다. 체감에 맞게 완만히 편다.
        const rms = Math.sqrt(sum / time.length);
        const pct = Math.min(100, Math.round(Math.pow(rms, 0.6) * 190));
        setLevel(pct);
        setPeak(p => Math.max(p, pct));

        analyser.getByteFrequencyData(freq);
        const step = Math.floor(freq.length / BARS);
        setBars(Array.from({ length: BARS }, (_, i) => {
          let m = 0;
          for (let j = i * step; j < (i + 1) * step; j++) m = Math.max(m, freq[j]);
          return Math.round((m / 255) * 100);
        }));

        rafRef.current = requestAnimationFrame(tick);
      };
      tick();

      setState('on');
      // 권한을 받은 뒤에야 장치 이름이 채워진다 — 그 전에는 빈 문자열이다
      const list = await navigator.mediaDevices.enumerateDevices();
      setDevices(list.filter(d => d.kind === 'audioinput'));
      setDeviceId(stream.getAudioTracks()[0]?.getSettings().deviceId ?? '');
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

  const record = useCallback(() => {
    const stream = streamRef.current;
    if (!stream) return;
    const chunks: BlobPart[] = [];
    const rec = new MediaRecorder(stream);
    recRef.current = rec;
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = () => {
      if (clipRef.current) URL.revokeObjectURL(clipRef.current);
      const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
      clipRef.current = url;
      setClip(url);
      setRecording(false);
    };
    rec.start();
    setRecording(true);
    window.setTimeout(() => {
      if (rec.state === 'recording') rec.stop();
    }, 6000);
  }, []);

  return (
    <div>
      {state !== 'on' ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-5 py-10 text-center">
          <ToolIcon emoji="🎤" className="w-12 h-12 mx-auto mb-3 text-slate-800 dark:text-slate-100" />
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
            {ui.prompt1}
            <br />
            {ui.prompt2}
          </p>
          <button
            onClick={() => start()}
            disabled={state === 'starting'}
            className="rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold px-7 py-3 text-sm shadow-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {state === 'starting' ? ui.opening : ui.startTest}
          </button>
          {error && (
            <p className="mt-4 text-xs text-rose-600 dark:text-rose-400 leading-relaxed max-w-sm mx-auto">{error}</p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border chip-off p-5">
          <div className="flex items-end justify-center gap-[3px] h-28 mb-5">
            {bars.map((b, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-rose-500 to-orange-400 transition-[height] duration-75"
                style={{ height: `${Math.max(2, b)}%` }}
              />
            ))}
          </div>

          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400">{ui.inputLevel}</span>
            <span className="font-mono text-slate-400 dark:text-slate-500">
              {ui.levelPeak(level, peak)}
            </span>
          </div>
          <div className="relative h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-[width] duration-75 ${
                level > 90 ? 'bg-rose-500' : level > 15 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
              style={{ width: `${level}%` }}
            />
            <div className="absolute inset-y-0 w-0.5 bg-slate-400/70" style={{ left: `${peak}%` }} />
          </div>

          <p className="mt-3 text-center text-sm font-bold">
            {peak === 0 ? (
              <span className="text-slate-400 dark:text-slate-500">{ui.saySomething}</span>
            ) : peak < 12 ? (
              <span className="text-amber-600">{ui.tooQuiet}</span>
            ) : peak > 96 ? (
              <span className="text-rose-500">{ui.tooLoud}</span>
            ) : (
              <span className="text-emerald-600">{ui.working}</span>
            )}
          </p>

          {devices.length > 1 && (
            <label className="mt-5 block">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.deviceLabel}</span>
              <select
                value={deviceId}
                onChange={e => { setDeviceId(e.target.value); start(e.target.value); }}
                className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200"
              >
                {devices.map((d, i) => (
                  <option key={d.deviceId} value={d.deviceId}>{d.label || ui.deviceN(i + 1)}</option>
                ))}
              </select>
            </label>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={record}
              disabled={recording}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3 text-sm text-slate-700 dark:text-slate-200 hover:border-rose-300 disabled:opacity-60 transition-colors"
            >
              {recording ? ui.recording : ui.recordAndListen}
            </button>
            <button
              onClick={stop}
              className="rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-3 text-sm hover:opacity-90 transition-opacity"
            >
              {ui.turnOff}
            </button>
          </div>

          {clip && (
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.resultTitle}</p>
              <audio src={clip} controls className="w-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
