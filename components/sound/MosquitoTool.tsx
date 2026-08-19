'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext } from '@/lib/audio';
import { CARD } from './ui';
import { MOSQUITO_UI, type SoundLang } from '@/lib/sound-ui-intl';

const STEPS = [
  { hz: 15000 },
  { hz: 16000 },
  { hz: 17000 },
  { hz: 18000 },
  { hz: 19000 },
  { hz: 20000 },
];

export default function MosquitoTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = MOSQUITO_UI[lang];
  const [playing, setPlaying] = useState<number | null>(null);
  const [heard, setHeard] = useState<number[]>([]);
  const oscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => () => oscRef.current?.stop(), []);

  const play = (hz: number) => {
    oscRef.current?.stop();
    if (playing === hz) { setPlaying(null); oscRef.current = null; return; }

    const ctx = audioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz;
    // 고주파는 귀에 부담이 커서 볼륨을 낮게 고정한다
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    setPlaying(hz);
  };

  const toggleHeard = (hz: number) =>
    setHeard(prev => (prev.includes(hz) ? prev.filter(h => h !== hz) : [...prev, hz]));

  const top = heard.length ? Math.max(...heard) : null;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s.hz}
            className={`rounded-lg border px-4 py-3.5 flex items-center gap-3 transition-colors ${
              playing === s.hz
                ? 'border-lime-300 bg-lime-50 dark:bg-lime-950/40'
                : 'chip-off'
            }`}
          >
            <button
              onClick={() => play(s.hz)}
              className="shrink-0 w-12 h-12 rounded-xl bg-sec-soft font-bold text-lg"
            >
              {playing === s.hz ? '■' : '▶'}
            </button>
            <span className="hub-card-body">
              <span className="block text-sm font-black text-slate-800 dark:text-slate-100">{(s.hz / 1000).toFixed(0)}kHz</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{ui.ages[i]}</span>
            </span>
            <button
              onClick={() => toggleHeard(s.hz)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold border transition-colors ${
                heard.includes(s.hz)
                  ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
            >
              {heard.includes(s.hz) ? ui.heard : ui.check}
            </button>
          </div>
        ))}
      </div>

      {top && (
        <div className="mt-4 rounded-lg bg-sec px-6 py-6 text-center">
          <p className="text-sm opacity-70 mb-1">{ui.highestHeard}</p>
          <p className="text-4xl font-black">{(top / 1000).toFixed(0)}kHz</p>
          <p className="text-sm opacity-80 mt-2">{ui.ages[STEPS.findIndex(s => s.hz === top)]}</p>
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
