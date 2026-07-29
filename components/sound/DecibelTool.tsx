'use client';
import { useEffect, useRef, useState } from 'react';
import { rmsToDb } from '@/lib/audio';
import { CARD, MicGate, Stat, useMicAnalyser } from './ui';

/**
 * 소음 측정 — 마이크 입력의 크기.
 *
 * 절대 데시벨(dB SPL)은 잴 수 없다. 브라우저는 마이크의 감도를 모르고 기기마다
 * 다르기 때문이다. 그래서 디지털 최대치(0dBFS) 기준의 상대값을 보여주고,
 * 생활 소음 기준과 견주는 것으로 감을 잡게 한다.
 */
const REFERENCE = [
  { db: -60, label: '아주 조용한 방' },
  { db: -45, label: '도서관' },
  { db: -35, label: '조용한 사무실' },
  { db: -25, label: '보통 대화' },
  { db: -15, label: '번화가·지하철' },
  { db: -6, label: '아주 시끄러움' },
];

export default function DecibelTool() {
  const [on, setOn] = useState(false);
  const [db, setDb] = useState(-60);
  const [peak, setPeak] = useState(-100);
  const [avg, setAvg] = useState(-60);
  const { analyser, error } = useMicAnalyser(on, 2048);
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
      <MicGate onStart={() => setOn(true)} error={error} icon="📢" gradient="from-rose-500 to-orange-500">
        마이크로 주변 소리의 크기를 재서 생활 소음 기준과 견줘 보여줍니다.
        <br />
        소리는 브라우저 안에서만 분석되고 저장되지 않습니다.
      </MicGate>
    );
  }

  // -60dB을 바닥으로 잡아 0~100%로 편다
  const level = Math.max(0, Math.min(100, ((db + 60) / 60) * 100));
  const nearest = REFERENCE.reduce((best, r) => (Math.abs(r.db - db) < Math.abs(best.db - db) ? r : best));

  return (
    <div>
      <div className="rounded-2xl bg-slate-900 px-6 py-10 text-center">
        <p className="text-6xl font-black text-white tabular-nums">{db.toFixed(1)}</p>
        <p className="text-sm text-white/60 mt-1">dBFS · {nearest.label} 정도</p>

        <div className="mt-6 h-4 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-[width] duration-75 ${level > 80 ? 'bg-rose-500' : level > 55 ? 'bg-amber-400' : 'bg-emerald-500'}`}
            style={{ width: `${level}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="현재" value={`${db.toFixed(0)}dB`} accent="text-rose-600" />
        <Stat label="최고" value={`${peak.toFixed(0)}dB`} accent="text-orange-600" />
        <Stat label="평균" value={`${avg.toFixed(0)}dB`} />
      </div>

      <button
        onClick={() => { setPeak(-100); historyRef.current = []; }}
        className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-rose-300 transition-colors"
      >
        기록 초기화
      </button>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">기준</p>
        <div className="flex flex-col gap-1.5">
          {REFERENCE.map(r => (
            <div key={r.db} className="flex items-center gap-3 text-sm">
              <span className="w-14 font-mono font-bold text-slate-500 dark:text-slate-400 tabular-nums">{r.db}dB</span>
              <span className={`flex-1 ${nearest.db === r.db ? 'font-bold text-rose-600' : 'text-slate-600 dark:text-slate-300'}`}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          기기마다 마이크 감도가 달라 절대 소음도(dB SPL)는 잴 수 없습니다. 여기 값은 디지털 최대치를
          0으로 둔 상대값이라, 같은 기기에서 소리의 크기를 비교하는 용도로만 쓰세요.
        </p>
      </div>
    </div>
  );
}
