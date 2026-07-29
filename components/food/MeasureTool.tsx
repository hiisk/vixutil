'use client';
import { useMemo, useState } from 'react';
import { CUP_ML, INGREDIENTS, TBSP_ML, TSP_ML, findIngredient, gramToVolume, toSpoons, volumeToGram } from '@/lib/food';
import { CARD, NumberField, Result } from './ui';

export default function MeasureTool() {
  const [ingredientId, setIngredientId] = useState('flour');
  const [mode, setMode] = useState<'toGram' | 'toVolume'>('toGram');
  const [cup, setCup] = useState(1);
  const [tbsp, setTbsp] = useState(0);
  const [tsp, setTsp] = useState(0);
  const [gram, setGram] = useState(100);

  const ingredient = findIngredient(ingredientId)!;

  const result = useMemo(() => {
    if (mode === 'toGram') {
      const ml = cup * CUP_ML + tbsp * TBSP_ML + tsp * TSP_ML;
      return { ml, gram: volumeToGram(ml, ingredient.density) };
    }
    const ml = gramToVolume(gram, ingredient.density);
    return { ml, gram, spoons: toSpoons(ml) };
  }, [mode, cup, tbsp, tsp, gram, ingredient]);

  const spoons = toSpoons(result.ml);

  return (
    <div>
      <label className="block">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">재료</span>
        <select
          value={ingredientId}
          onChange={e => setIngredientId(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-400"
        >
          {INGREDIENTS.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-2 mt-3">
        {([['toGram', '계량도구 → 그램'], ['toVolume', '그램 → 계량도구']] as const).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              mode === v
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'toGram' ? (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <NumberField label="컵" value={cup} onChange={setCup} unit="컵" step={0.25} />
          <NumberField label="큰술" value={tbsp} onChange={setTbsp} unit="T" step={0.5} />
          <NumberField label="작은술" value={tsp} onChange={setTsp} unit="t" step={0.5} />
        </div>
      ) : (
        <div className="mt-4">
          <NumberField label="무게" value={gram} onChange={setGram} unit="g" step={10} />
        </div>
      )}

      <Result sub={`${ingredient.name} 기준 · 부피 ${result.ml}ml`}>
        {mode === 'toGram' ? (
          <>{result.gram}<span className="text-xl ml-1">g</span></>
        ) : (
          <>
            {spoons.cup > 0 && <>{spoons.cup}컵 </>}
            {spoons.tbsp > 0 && <>{spoons.tbsp}큰술 </>}
            {spoons.tsp > 0 && <>{spoons.tsp}작은술</>}
            {spoons.cup === 0 && spoons.tbsp === 0 && spoons.tsp === 0 && <>0</>}
          </>
        )}
      </Result>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">왜 재료를 골라야 하나요</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          같은 1컵이라도 밀가루는 120g, 설탕은 200g, 꿀은 284g입니다. 부피가 같아도 밀도가 다르기
          때문입니다. &lsquo;1컵 = 200g&rsquo;으로 퉁치면 베이킹은 거의 실패합니다.
          {ingredient.note && <><br /><b className="text-slate-800 dark:text-slate-100">{ingredient.name}</b> — {ingredient.note}</>}
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
          한국 기준(1컵 200ml, 1큰술 15ml, 1작은술 5ml)입니다. 미국 레시피의 1컵은 240ml이니 출처를 확인하세요.
        </p>
      </div>
    </div>
  );
}
