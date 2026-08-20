'use client';
import { useEffect, useRef, useState } from 'react';
import { rmsToDb } from '@/lib/audio';
import { CARD, MicGate, Stat, useMicAnalyser } from './ui';
import { DECIBEL_UI, SOUND_COMMON, type SoundLang } from '@/lib/sound-ui-intl';

/**
 * 소음 측정 — 마이크 입력의 크기.
 *
 * 절대 데시벨(dB SPL)은 잴 수 없다. 브라우저는 마이크의 감도를 모르고 기기마다
 * 다르기 때문이다. 그래서 디지털 최대치(0dBFS) 기준의 상대값을 보여주고,
 * 생활 소음 기준과 견주는 것으로 감을 잡게 한다.
 */
const REFERENCE = [
  { db: -60 },
  { db: -45 },
  { db: -35 },
  { db: -25 },
  { db: -15 },
  { db: -6 },
];

export default function DecibelTool({ lang = 'ko' }: { lang?: SoundLang } = {}) {
  const ui = DECIBEL_UI[lang];
  const c = SOUND_COMMON[lang];
  const [on, setOn] = useState(false);
  const [db, setDb] = useState(-60);
  const [peak, setPeak] = useState(-100);
  const [avg, setAvg] = useState(-60);
  const { analyser, error } = useMicAnalyser(on, 2048, lang);
  const rafRef = useRef(0);
  const historyRef = useRef<number[]>([]);

  useEffect(() => {
    if (!on) return;
    const buffer = new Float32Array(2048);
    const loop = () => {
      const node = analyser.current;
      if (node) {
        node.getFloatTimeDomainData(buffer);
        let sum = 0;
        for (const v of buffer) sum += v * v;
        const value = rmsToDb(Math.sqrt(sum / buffer.length));
        setDb(value);
        setPeak(p => Math.max(p, value));
        historyRef.current = [...historyRef.current, value].slice(-100);
        setAvg(historyRef.current.reduce((a, b) => a + b, 0) / historyRef.current.length);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [on, analyser]);

  if (!on) {
    return (
      <MicGate onStart={() => setOn(true)} error={error} icon="📢" lang={lang}>
        {ui.gate}
        <br />
        {ui.gateNote}
      </MicGate>
    );
  }

  // -60dB을 바닥으로 잡아 0~100%로 편다
  const level = Math.max(0, Math.min(100, ((db + 60) / 60) * 100));
  const nearest = REFERENCE.reduce((best, r) => (Math.abs(r.db - db) < Math.abs(best.db - db) ? r : best));

  return (
    <div>
      <div className="rounded-lg bg-slate-900 px-6 py-10 text-center">
        <p className="text-6xl font-bold text-white tabular-nums">{db.toFixed(1)}</p>
        <p className="text-sm text-white/60 mt-1">dBFS · {ui.aboutLevel(ui.refs[REFERENCE.indexOf(nearest)])}</p>

        <div className="mt-6 h-4 rounded-full bg-white dark:bg-slate-900/10 overflow-hidden">
          <div
            className={`h-full transition-[width] duration-75 ${level > 80 ? 'bg-rose-500' : level > 55 ? 'bg-amber-400' : 'bg-emerald-500'}`}
            style={{ width: `${level}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.now} value={`${db.toFixed(0)}dB`} accent="text-rose-600" />
        <Stat label={ui.peak} value={`${peak.toFixed(0)}dB`} accent="text-orange-600" />
        <Stat label={ui.avg} value={`${avg.toFixed(0)}dB`} />
      </div>

      <button
        onClick={() => { setPeak(-100); historyRef.current = []; }}
        className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
      >
        {c.reset}
      </button>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.refsTitle}</p>
        <div className="flex flex-col gap-1.5">
          {REFERENCE.map((r, i) => (
            <div key={r.db} className="flex items-center gap-3 text-sm">
              <span className="w-14 font-mono font-bold text-slate-500 dark:text-slate-400 tabular-nums">{r.db}dB</span>
              <span className={`flex-1 ${nearest.db === r.db ? 'font-bold text-rose-600' : 'text-slate-600 dark:text-slate-300'}`}>
                {ui.refs[i]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
