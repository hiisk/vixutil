'use client';
import { useMemo, useState } from 'react';
import { kelvinToRgb, rgbToHex, rgbString } from '@/lib/color';
import { CARD, ValueRow } from './ui';

const PRESETS = [
  { k: 1900, label: '촛불', note: '아주 붉고 따뜻함' },
  { k: 2700, label: '전구색', note: '집 안 조명, 아늑함' },
  { k: 4000, label: '주백색', note: '사무실·주방' },
  { k: 5600, label: '한낮 햇빛', note: '사진의 기준광' },
  { k: 6500, label: '주광색', note: '푸르스름한 흰빛' },
  { k: 9000, label: '흐린 하늘', note: '차가운 파랑' },
];

export default function TemperatureTool() {
  const [kelvin, setKelvin] = useState(4000);
  const [compare, setCompare] = useState(6500);

  const a = useMemo(() => kelvinToRgb(kelvin), [kelvin]);
  const b = useMemo(() => kelvinToRgb(compare), [compare]);

  return (
    <div>
      <div className="flex rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-40">
        <div className="flex-1 flex flex-col items-center justify-center" style={{ background: rgbToHex(a) }}>
          <span className="text-2xl font-black text-slate-900/70">{kelvin}K</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center" style={{ background: rgbToHex(b) }}>
          <span className="text-2xl font-black text-slate-900/70">{compare}K</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">왼쪽 색온도</span>
          <span className="text-sm font-black text-orange-600 tabular-nums">{kelvin}K</span>
        </div>
        <input
          type="range" min={1000} max={12000} step={100} value={kelvin}
          onChange={e => setKelvin(Number(e.target.value))}
          className="w-full accent-orange-500" aria-label="왼쪽 색온도"
        />
        <div className="flex items-baseline justify-between mt-3 mb-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">오른쪽 색온도 (비교용)</span>
          <span className="text-sm font-black text-cyan-600 tabular-nums">{compare}K</span>
        </div>
        <input
          type="range" min={1000} max={12000} step={100} value={compare}
          onChange={e => setCompare(Number(e.target.value))}
          className="w-full accent-cyan-500" aria-label="오른쪽 색온도"
        />
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">자주 쓰는 값</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PRESETS.map(p => (
          <button
            key={p.k}
            onClick={() => setKelvin(p.k)}
            className={`rounded-xl border px-3 py-2.5 text-left transition-colors ${
              kelvin === p.k
                ? 'border-orange-300 bg-orange-50 dark:bg-orange-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded border border-slate-200 dark:border-slate-600 shrink-0" style={{ background: rgbToHex(kelvinToRgb(p.k)) }} />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.label}</span>
            </span>
            <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{p.k}K · {p.note}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <ValueRow label="HEX" value={rgbToHex(a).toUpperCase()} />
        <ValueRow label="RGB" value={rgbString(a)} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">숫자가 클수록 차갑다</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          말과 반대로, 켈빈 값이 낮을수록 붉고 &lsquo;따뜻한&rsquo; 빛이고 높을수록 푸르고 &lsquo;차가운&rsquo; 빛입니다.
          쇠를 달굴 때 처음엔 붉게, 더 뜨거워지면 희고 푸르게 빛나는 것을 기준으로 삼았기 때문입니다.
          집 안 조명은 2700~3000K, 작업 공간은 4000~5000K가 무난합니다.
        </p>
      </div>
    </div>
  );
}
