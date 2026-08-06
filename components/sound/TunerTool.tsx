'use client';
import { useEffect, useRef, useState } from 'react';
import { audioContext, detectPitch, frequencyToNote } from '@/lib/audio';
import { CARD, MicGate, Stat, useMicAnalyser } from './ui';
import { TUNER_UI, type SoundLang } from '@/lib/sound-ui-intl';

/** 기타·우쿨렐레 개방현 — 조율할 때 기준음을 들려주려고 둔다 */
const STRINGS = {
  guitar: { notes: [['E2', 82.41], ['A2', 110.0], ['D3', 146.83], ['G3', 196.0], ['B3', 246.94], ['E4', 329.63]] },
  ukulele: { notes: [['G4', 392.0], ['C4', 261.63], ['E4', 329.63], ['A4', 440.0]] },
  bass: { notes: [['E1', 41.2], ['A1', 55.0], ['D2', 73.42], ['G2', 98.0]] },
} as const;

export default function TunerTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = TUNER_UI[lang];
  const [on, setOn] = useState(false);
  const [a4, setA4] = useState(440);
  const [instrument, setInstrument] = useState<keyof typeof STRINGS>('guitar');
  const [reading, setReading] = useState<{ freq: number; note: string; octave: number; cents: number } | null>(null);
  const { analyser, error } = useMicAnalyser(on, 4096, lang);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!on) return;
    const buffer = new Float32Array(4096);
    const loop = () => {
      const node = analyser.current;
      if (node) {
        node.getFloatTimeDomainData(buffer);
        const freq = detectPitch(buffer, node.context.sampleRate);
        if (freq) {
          const n = frequencyToNote(freq, a4);
          setReading({ freq, note: n.note, octave: n.octave, cents: n.cents });
        } else {
          setReading(null);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [on, a4, analyser]);

  const playReference = (freq: number) => {
    const ctx = audioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.7);
  };

  if (!on) {
    return (
      <MicGate onStart={() => setOn(true)} error={error} icon="🎸" gradient="from-emerald-500 to-teal-600" lang={lang}>
        {ui.gate}
        <br />
        {ui.gateNote}
      </MicGate>
    );
  }

  const cents = reading?.cents ?? 0;
  const inTune = reading !== null && Math.abs(cents) <= 5;

  return (
    <div>
      <div className={`rounded-2xl px-6 py-10 text-center transition-colors ${inTune ? 'bg-emerald-600' : 'bg-slate-900'}`}>
        <p className="text-7xl font-black text-white">
          {reading ? reading.note : '—'}
          {reading && <span className="text-3xl text-white/60">{reading.octave}</span>}
        </p>
        <p className="text-sm text-white/60 mt-2">
          {reading ? `${reading.freq.toFixed(1)} Hz` : ui.waiting}
        </p>

        {/* 오차 눈금 — 가운데가 정확한 음이다 */}
        <div className="relative h-12 mt-6 mx-auto max-w-xs">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/20" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-white/60" />
          {reading && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-[left] ${
                inTune ? 'bg-emerald-300' : Math.abs(cents) < 20 ? 'bg-amber-300' : 'bg-rose-400'
              }`}
              style={{ left: `${50 + Math.max(-50, Math.min(50, cents))}%` }}
            />
          )}
        </div>
        <p className="text-sm font-bold text-white/80">
          {!reading ? ' ' : inTune ? ui.inTune : cents > 0 ? ui.sharpBy(cents) : ui.flatBy(-cents)}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.note} value={reading ? `${reading.note}${reading.octave}` : '—'} accent="text-emerald-600" />
        <Stat label={ui.freqLabel} value={reading ? `${reading.freq.toFixed(1)}Hz` : '—'} />
        <Stat label={ui.errorLabel} value={reading ? ui.centsSuffix(cents > 0 ? Number(`+${cents}`) : cents) : '—'} accent={inTune ? 'text-emerald-600' : 'text-amber-600'} />
      </div>

      <div className={`${CARD} mt-4`}>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {(Object.keys(STRINGS) as (keyof typeof STRINGS)[]).map((k, i) => (
            <button
              key={k}
              onClick={() => setInstrument(k)}
              className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                instrument === k
                  ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {ui.instruments[i]}
            </button>
          ))}
        </div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.openStrings}</p>
        <div className="flex flex-wrap gap-2">
          {STRINGS[instrument].notes.map(([name, freq]) => (
            <button
              key={String(name)}
              onClick={() => playReference(Number(freq))}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-300 transition-colors"
            >
              🔊 {String(name)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.refA4}</span>
          <input
            type="number" min={430} max={450} value={a4}
            onChange={e => setA4(Math.min(450, Math.max(430, Number(e.target.value) || 440)))}
            className="w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 cell-num"
          />
          <span className="text-xs text-slate-400 dark:text-slate-500">{ui.refA4Note}</span>
        </div>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.footNote}
        </p>
      </div>
    </div>
  );
}
