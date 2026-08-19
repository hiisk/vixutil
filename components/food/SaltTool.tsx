'use client';
import { useMemo, useState } from 'react';
import { CARD, NumberField, Result } from './ui';
import { SALT_UI, type FoodLang } from '@/lib/food-ui-intl';

const USES = [
  { pct: 2 },
  { pct: 6 },
  { pct: 10 },
  { pct: 15 },
];

export default function SaltTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = SALT_UI[lang];
  const [water, setWater] = useState(1000);
  const [percent, setPercent] = useState(6);
  const [mode, setMode] = useState<'salt' | 'percent'>('salt');
  const [salt, setSalt] = useState(60);

  const result = useMemo(() => {
    if (mode === 'salt') {
      // 염도 = 소금 / (물 + 소금) 이 정석이지만, 요리에서는 물 대비로 재는 관행이 흔하다.
      // 둘 다 보여줘서 어느 기준인지 헷갈리지 않게 한다.
      const byWater = Math.round((water * percent) / 100);
      const byTotal = Math.round((water * percent) / (100 - percent));
      return { byWater, byTotal };
    }
    const pctWater = Math.round((salt / water) * 1000) / 10;
    const pctTotal = Math.round((salt / (water + salt)) * 1000) / 10;
    return { pctWater, pctTotal };
  }, [water, percent, salt, mode]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {(['salt', 'percent'] as const).map((v, i) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              mode === v
                ? 'border-sky-300 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.modes[i]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <NumberField label={ui.water} value={water} onChange={setWater} unit="ml" step={100} />
        {mode === 'salt'
          ? <NumberField label={ui.targetPct} value={percent} onChange={setPercent} unit="%" step={0.5} />
          : <NumberField label={ui.saltAdded} value={salt} onChange={setSalt} unit="g" step={5} />}
      </div>

      <Result sub={mode === 'salt' ? ui.subSalt : ui.subPct}>
        {mode === 'salt'
          ? <>{ui.saltWord} {result.byWater}<span className="text-xl ml-1">g</span></>
          : <>{result.pctWater}<span className="text-xl ml-1">%</span></>}
      </Result>

      <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
        {mode === 'salt'
          ? ui.byTotalExact(percent, result.byTotal ?? 0)
          : ui.byTotalPct(result.pctTotal ?? 0)}
      </p>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.presetTitle}</p>
        <div className="grid grid-cols-2 gap-2">
          {USES.map((u, i) => (
            <button
              key={u.pct}
              onClick={() => { setMode('salt'); setPercent(u.pct); }}
              className="fld text-left hover:border-slate-300 dark:hover:border-slate-700"
            >
              <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">{ui.presets[i]} {u.pct}%</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{ui.presetNotes[i]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
