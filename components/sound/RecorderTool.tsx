'use client';
import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '@/lib/date-calc';
import { CARD } from './ui';
import { RECORDER_UI, type SoundLang } from '@/lib/sound-ui-intl';

export default function RecorderTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = RECORDER_UI[lang];
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
      setError(name === 'NotAllowedError' ? ui.micDenied : ui.micFailed);
    }
  };

  const stop = () => {
    cancelAnimationFrame(rafRef.current);
    if (recRef.current?.state === 'recording') recRef.current.stop();
  };

  return (
    <div>
      <div className={`rounded-lg px-6 py-10 text-center transition-colors ${state === 'recording' ? 'bg-rose-600' : 'bg-slate-900'}`}>
        <p className="text-5xl font-bold text-white tabular-nums">{formatDuration(elapsed)}</p>
        <p className="text-sm text-white/60 mt-2">
          {state === 'recording' ? ui.recording : state === 'done' ? ui.done : ui.idle}
        </p>
        {state === 'recording' && (
          <div className="mt-5 h-3 rounded-full bg-white dark:bg-slate-900/20 overflow-hidden max-w-xs mx-auto">
            <div className="h-full bg-white transition-[width] duration-75" style={{ width: `${level}%` }} />
          </div>
        )}
      </div>

      {error && <p className="mt-3 text-center text-xs text-rose-600 dark:text-rose-400">{error}</p>}

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={state === 'recording' ? stop : start}
          className={`rounded-xl font-bold py-3.5 text-sm shadow-sm transition-opacity hover:opacity-90 ${
            state === 'recording' ? 'bg-slate-700' : 'bg-sec'
          }`}
        >
          {state === 'recording' ? ui.stopRec : state === 'done' ? ui.again : ui.startRec}
        </button>
        {clip ? (
          <a
            href={clip}
            download="recording.webm"
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-fuchsia-300 transition-colors flex items-center justify-center"
          >
            {ui.saveFile}
          </a>
        ) : (
          <span className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-3.5 text-sm text-slate-300 dark:text-slate-600 flex items-center justify-center">
            {ui.nothingToSave}
          </span>
        )}
      </div>

      {clip && (
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.listen}</p>
          <audio src={clip} controls className="w-full" />
        </div>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
