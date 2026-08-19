'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 순음 재생기 — 주파수 하나를 들려준다.
 *
 * 브라우저는 사용자가 누르기 전에는 소리를 못 낸다. 그래서 AudioContext를 처음
 * 누를 때 만든다. 미리 만들어 두면 정지 상태로 태어나 아무 소리도 안 나고,
 * 왜 안 나는지도 화면에 드러나지 않는다.
 *
 * 시작과 끝에 30밀리초 경사를 준다. 진폭을 0에서 갑자기 올리면 "툭" 하는 잡음이
 * 함께 나는데, 그 잡음은 온 주파수에 걸쳐 있어서 정작 들려주려는 순음을 가린다.
 */
export default function TonePlayer({
  hz,
  playLabel,
  stopLabel,
  volumeLabel,
  safety,
  noAudioLabel,
}: {
  hz: number;
  playLabel: string;
  stopLabel: string;
  volumeLabel: string;
  safety: string;
  noAudioLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const [broken, setBroken] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // 화면을 떠날 때 소리가 남아 있으면 안 된다
  useEffect(() => () => {
    oscRef.current?.stop();
    ctxRef.current?.close();
  }, []);

  // 음량 손잡이는 재생 중에도 바로 먹혀야 한다
  useEffect(() => {
    const g = gainRef.current;
    const ctx = ctxRef.current;
    if (g && ctx && playing) g.gain.setTargetAtTime(volume, ctx.currentTime, 0.02);
  }, [volume, playing]);

  const stop = () => {
    const ctx = ctxRef.current;
    const g = gainRef.current;
    const osc = oscRef.current;
    if (ctx && g && osc) {
      const t = ctx.currentTime;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 0.03);
      osc.stop(t + 0.04);
    }
    oscRef.current = null;
    gainRef.current = null;
    setPlaying(false);
  };

  const start = () => {
    try {
      const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) { setBroken(true); return; }
      const ctx = ctxRef.current ?? new Ctor();
      ctxRef.current = ctx;
      // 다른 화면에서 돌아왔을 때 멈춰 있을 수 있다
      if (ctx.state === 'suspended') void ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = hz;
      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(volume, t + 0.03);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setPlaying(true);
    } catch {
      setBroken(true);
    }
  };

  if (broken) {
    return <p className="text-sm text-slate-500 dark:text-slate-400 text-center">{noAudioLabel}</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4" data-tone={playing ? 'playing' : 'stopped'} data-hz={hz}>
      <button
        type="button"
        onClick={playing ? stop : start}
        aria-pressed={playing}
        className={`w-full max-w-xs h-14 rounded-lg font-black text-white text-base shadow-sm transition-all active:scale-95 ${
          playing
            ? 'bg-sec'
            : 'bg-sec hover:-translate-y-0.5'
        }`}
      >
        <span className="inline-flex items-center gap-2">
          {playing ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5.5v13l11-6.5z" /></svg>
          )}
          {playing ? stopLabel : playLabel}
        </span>
      </button>

      <label className="w-full max-w-xs flex items-center gap-3">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{volumeLabel}</span>
        <input
          type="range"
          min={0}
          max={0.5}
          step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="flex-1 accent-emerald-500"
          data-volume
        />
        <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 tabular-nums w-8 text-right">
          {Math.round((volume / 0.5) * 100)}
        </span>
      </label>

      <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center leading-relaxed max-w-sm">{safety}</p>
    </div>
  );
}
