'use client';
import { useMemo, useState } from 'react';
import { CARD, NumberField, Result } from './ui';

const USES = [
  { pct: 2, label: '겉절이·즉석', note: '살짝만 절일 때' },
  { pct: 6, label: '배추 절이기', note: '김장 기본' },
  { pct: 10, label: '장아찌', note: '오래 두고 먹을 때' },
  { pct: 15, label: '염장', note: '아주 오래 보관' },
];

export default function SaltTool() {
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
        {([['salt', '소금량 구하기'], ['percent', '염도 구하기']] as const).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              mode === v
                ? 'border-sky-300 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <NumberField label="물" value={water} onChange={setWater} unit="ml" step={100} />
        {mode === 'salt'
          ? <NumberField label="원하는 염도" value={percent} onChange={setPercent} unit="%" step={0.5} />
          : <NumberField label="넣은 소금" value={salt} onChange={setSalt} unit="g" step={5} />}
      </div>

      <Result sub={mode === 'salt' ? '물 무게 기준 · 총량 기준으로는 아래 참고' : '물 대비 / 총량 대비'}>
        {mode === 'salt'
          ? <>소금 {result.byWater}<span className="text-xl ml-1">g</span></>
          : <>{result.pctWater}<span className="text-xl ml-1">%</span></>}
      </Result>

      <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
        {mode === 'salt'
          ? `총량(물+소금) 기준으로 정확히 ${percent}%를 맞추려면 ${result.byTotal}g`
          : `총량(물+소금) 기준으로는 ${result.pctTotal}%`}
      </p>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">용도별 권장 염도</p>
        <div className="grid grid-cols-2 gap-2">
          {USES.map(u => (
            <button
              key={u.pct}
              onClick={() => { setMode('salt'); setPercent(u.pct); }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-left hover:border-sky-300 transition-colors"
            >
              <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">{u.label} {u.pct}%</span>
              <span className="block text-[11px] text-slate-400 dark:text-slate-500">{u.note}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          소금 종류에 따라 같은 부피라도 무게가 다릅니다. 굵은 소금은 알갱이 사이 공간이 많아 같은 컵에
          담아도 가볍고, 맛소금은 첨가물이 있어 더 짜게 느껴집니다. 저울로 무게를 재는 편이 확실합니다.
        </p>
      </div>
    </div>
  );
}
