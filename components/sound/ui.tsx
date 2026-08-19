'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext } from '@/lib/audio';
import { SOUND_COMMON, type SoundLang } from '@/lib/sound-ui-intl';

/** 소리 도구가 함께 쓰는 조각들 */

export const CARD = 'rounded-lg border chip-off p-5';

export function Stat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-xl border chip-off px-3 py-3 text-center">
      <p className={`text-lg font-black tabular-nums ${accent ?? 'text-slate-800 dark:text-slate-100'}`}>{value}</p>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

export function Slider({
  label, value, min, max, step = 1, unit = '', onChange, accent = 'accent-indigo-500', color = 'text-indigo-600',
}: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string;
  onChange: (n: number) => void; accent?: string; color?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
        <span className={`text-sm font-black tabular-nums ${color}`}>{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={`w-full ${accent}`} aria-label={label}
      />
    </div>
  );
}

export function PlayButton({
  playing, onToggle, gradient = 'from-indigo-500 to-violet-600', label, lang = 'ko',
}: {
  playing: boolean; onToggle: () => void; gradient?: string; label?: string; lang?: SoundLang;
}) {
  const c = SOUND_COMMON[lang];
  return (
    <button
      onClick={onToggle}
      className={`w-full rounded-xl font-bold py-3.5 text-sm shadow-sm text-white transition-opacity hover:opacity-90 ${
        playing ? 'bg-slate-700' : `bg-gradient-to-r ${gradient}`
      }`}
    >
      {playing ? c.stop : `▶ ${label ?? c.play}`}
    </button>
  );
}

/**
 * 마이크를 열고 분석기를 붙인다. 소리는 브라우저 밖으로 나가지 않는다 —
 * 스트림을 분석기에만 연결하고 어디에도 보내지 않기 때문이다.
 */
export function useMicAnalyser(active: boolean, fftSize = 2048, lang: SoundLang = 'ko') {
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    const open = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        const ctx = audioContext();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = fftSize;
        ctx.createMediaStreamSource(stream).connect(analyser);
        analyserRef.current = analyser;
        setReady(true);
        setError('');
      } catch (e) {
        const name = e instanceof DOMException ? e.name : '';
        setError(
          name === 'NotAllowedError'
            ? SOUND_COMMON[lang].micDenied
            : SOUND_COMMON[lang].micFailed,
        );
      }
    };
    void open();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      analyserRef.current = null;
      setReady(false);
    };
  }, [active, fftSize]);

  return { analyser: analyserRef, error, ready };
}

/** 마이크가 필요할 때 먼저 보여주는 시작 화면 */
export function MicGate({
  onStart, error, icon, gradient, children, lang = 'ko',
}: {
  onStart: () => void; error?: string; icon: string; gradient: string; children: React.ReactNode; lang?: SoundLang;
}) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-5 py-10 text-center">
      <div className="text-5xl mb-3">{icon}</div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">{children}</p>
      <button
        onClick={onStart}
        className={`rounded-xl bg-gradient-to-r ${gradient} text-white font-bold px-7 py-3 text-sm shadow-sm hover:opacity-90 transition-opacity`}
      >
        {SOUND_COMMON[lang].micStart}
      </button>
      {error && <p className="mt-4 text-xs text-rose-600 dark:text-rose-400 leading-relaxed max-w-sm mx-auto">{error}</p>}
    </div>
  );
}
