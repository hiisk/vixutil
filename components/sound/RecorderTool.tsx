'use client';
import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '@/lib/date-calc';
import { CARD } from './ui';

export default function RecorderTool() {
  const [state, setState] = useState<'idle' | 'recording' | 'done'>('idle');
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [level, setLevel] = useState(0);
  const [clip, setClip] = useState('');

  const recRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef(0);
  const startedRef = useRef(0);
  const clipRef = useRef('');

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    cancelAnimationFrame(rafRef.current);
    if (clipRef.current) URL.revokeObjectURL(clipRef.current);
  }, []);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const Ctx: typeof AudioContext =
        window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(analyser);
      analyserRef.current = analyser;

      const chunks: BlobPart[] = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = e => chunks.push(e.data);
      rec.onstop = () => {
        if (clipRef.current) URL.revokeObjectURL(clipRef.current);
        const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
        clipRef.current = url;
        setClip(url);
        setState('done');
        stream.getTracks().forEach(t => t.stop());
        void ctx.close();
      };
      rec.start();
      recRef.current = rec;
      startedRef.current = Date.now();
      setState('recording');
      setError('');

      const buffer = new Uint8Array(analyser.fftSize);
      const loop = () => {
        analyser.getByteTimeDomainData(buffer);
        let sum = 0;
        for (const v of buffer) { const d = (v - 128) / 128; sum += d * d; }
        setLevel(Math.min(100, Math.round(Math.pow(Math.sqrt(sum / buffer.length), 0.6) * 190)));
        setElapsed(Date.now() - startedRef.current);
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (e) {
      const name = e instanceof DOMException ? e.name : '';
      setError(name === 'NotAllowedError' ? '마이크 권한이 거부됐습니다. 주소창의 자물쇠 아이콘에서 허용해 주세요.' : '마이크를 열 수 없습니다.');
    }
  };

  const stop = () => {
    cancelAnimationFrame(rafRef.current);
    if (recRef.current?.state === 'recording') recRef.current.stop();
  };

  return (
    <div>
      <div className={`rounded-2xl px-6 py-10 text-center transition-colors ${state === 'recording' ? 'bg-rose-600' : 'bg-slate-900'}`}>
        <p className="text-5xl font-black text-white tabular-nums">{formatDuration(elapsed)}</p>
        <p className="text-sm text-white/60 mt-2">
          {state === 'recording' ? '● 녹음 중' : state === 'done' ? '녹음이 끝났습니다' : '녹음 버튼을 누르세요'}
        </p>
        {state === 'recording' && (
          <div className="mt-5 h-3 rounded-full bg-white/20 overflow-hidden max-w-xs mx-auto">
            <div className="h-full bg-white transition-[width] duration-75" style={{ width: `${level}%` }} />
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-center text-xs text-rose-600 dark:text-rose-400">{error}</p>}

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={state === 'recording' ? stop : start}
          className={`rounded-xl font-bold py-3.5 text-sm shadow-lg text-white transition-opacity hover:opacity-90 ${
            state === 'recording' ? 'bg-slate-700' : 'bg-gradient-to-r from-fuchsia-500 to-violet-600'
          }`}
        >
          {state === 'recording' ? '■ 녹음 정지' : state === 'done' ? '다시 녹음' : '● 녹음 시작'}
        </button>
        {clip ? (
          <a
            href={clip}
            download="recording.webm"
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-fuchsia-300 transition-colors flex items-center justify-center"
          >
            ⬇ 파일로 저장
          </a>
        ) : (
          <span className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-3.5 text-sm text-slate-300 dark:text-slate-600 flex items-center justify-center">
            저장할 녹음 없음
          </span>
        )}
      </div>

      {clip && (
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">들어보기</p>
          <audio src={clip} controls className="w-full" />
        </div>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          녹음은 이 브라우저 안에서만 만들어지고 저장 버튼을 눌러야 기기에 내려받습니다. 서버로
          전송되지 않으니 회의 메모나 발음 연습에 써도 됩니다. 탭을 닫으면 녹음도 사라집니다.
        </p>
      </div>
    </div>
  );
}
