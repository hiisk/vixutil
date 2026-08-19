'use client';
import { useMemo, useState } from 'react';
import { CUP_ML, INGREDIENTS, TBSP_ML, TSP_ML, US_CUP_ML, findIngredient, gramToVolume, toSpoons, volumeToGram } from '@/lib/food';
import { INGREDIENT_INTL } from '@/lib/food-intl';
import { MEASURE_UI, type FoodLang } from '@/lib/food-ui-intl';
import { CARD, NumberField, Result } from './ui';

export default function MeasureTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = MEASURE_UI[lang];
  const names = INGREDIENT_INTL[lang];
  // 영어권 레시피의 1컵은 240ml이라 값이 20% 어긋난다 — 기본값을 언어별로 바꾼다
  const [usCup, setUsCup] = useState(lang === 'en');
  const cupMl = usCup ? US_CUP_ML : CUP_ML;
  const [ingredientId, setIngredientId] = useState('flour');
  const [mode, setMode] = useState<'toGram' | 'toVolume'>('toGram');
  const [cup, setCup] = useState(1);
  const [tbsp, setTbsp] = useState(0);
  const [tsp, setTsp] = useState(0);
  const [gram, setGram] = useState(100);

  const ingredient = findIngredient(ingredientId)!;

  const result = useMemo(() => {
    if (mode === 'toGram') {
      const ml = cup * cupMl + tbsp * TBSP_ML + tsp * TSP_ML;
      return { ml, gram: volumeToGram(ml, ingredient.density) };
    }
    const ml = gramToVolume(gram, ingredient.density);
    return { ml, gram, spoons: toSpoons(ml, cupMl) };
  }, [mode, cup, tbsp, tsp, gram, ingredient, cupMl]);

  const spoons = toSpoons(result.ml, cupMl);

  return (
    <div>
      <label className="block">
        <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{ui.ingredient}</span>
        <select
          value={ingredientId}
          onChange={e => setIngredientId(e.target.value)}
          className="w-full rounded-xl border chip-off px-3.5 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-400"
        >
          {INGREDIENTS.map(i => <option key={i.id} value={i.id}>{names[i.id]?.name ?? i.name}</option>)}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-2 mt-3">
        {(['toGram', 'toVolume'] as const).map((v, i) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              mode === v
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.modes[i]}
          </button>
        ))}
      </div>

      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.cupStandard}</p>
      <div className="grid grid-cols-2 gap-2">
        {[false, true].map((us, i) => (
          <button
            key={ui.standards[i]}
            onClick={() => setUsCup(us)}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              usCup === us
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.standards[i]}
          </button>
        ))}
      </div>

      {mode === 'toGram' ? (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <NumberField label={ui.cup} value={cup} onChange={setCup} unit={ui.cupUnit} step={0.25} />
          <NumberField label={ui.tbsp} value={tbsp} onChange={setTbsp} unit="T" step={0.5} />
          <NumberField label={ui.tsp} value={tsp} onChange={setTsp} unit="t" step={0.5} />
        </div>
      ) : (
        <div className="mt-4">
          <NumberField label={ui.weight} value={gram} onChange={setGram} unit="g" step={10} />
        </div>
      )}

      <Result sub={ui.basedOn(names[ingredient.id]?.name ?? ingredient.name, result.ml)}>
        {mode === 'toGram' ? (
          <>{result.gram}<span className="text-xl ml-1">g</span></>
        ) : (
          <>
            {spoons.cup > 0 && <>{spoons.cup}{ui.cupUnit} </>}
            {spoons.tbsp > 0 && <>{spoons.tbsp}{ui.tbsp} </>}
            {spoons.tsp > 0 && <>{spoons.tsp}{ui.tsp}</>}
            {spoons.cup === 0 && spoons.tbsp === 0 && spoons.tsp === 0 && <>0</>}
          </>
        )}
      </Result>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.whyTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.why}
          {names[ingredient.id]?.note && <><br /><b className="text-slate-800 dark:text-slate-100">{names[ingredient.id].name}</b> — {names[ingredient.id].note}</>}
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
          {ui.standardNote(cupMl)}
        </p>
      </div>
    </div>
  );
}
