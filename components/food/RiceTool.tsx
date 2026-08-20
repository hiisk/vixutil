'use client';
import { useMemo, useState } from 'react';
import { CUP_ML } from '@/lib/food';
import { CARD, Choice, NumberField, Result, Stat } from './ui';
import { RICE_UI, type FoodLang } from '@/lib/food-ui-intl';

/** 쌀 부피 대비 물 비율 — 쌀 1에 물 몇 */
const GRAINS = [
  { id: 'white', ratio: 1.2 },
  { id: 'brown', ratio: 1.6 },
  { id: 'mixed', ratio: 1.4 },
] as const;
type Grain = (typeof GRAINS)[number]['id'];

const TEXTURES = [
  { id: 'firm', adjust: -0.1 },
  { id: 'normal', adjust: 0 },
  { id: 'soft', adjust: 0.15 },
] as const;
type Texture = (typeof TEXTURES)[number]['id'];

export default function RiceTool({ lang = 'ko' }: { lang?: FoodLang } = {}) {
  const ui = RICE_UI[lang];
  const [cups, setCups] = useState(2);
  const [grain, setGrain] = useState<Grain>('white');
  const [texture, setTexture] = useState<Texture>('normal');

  const info = GRAINS.find(g => g.id === grain)!;
  const adjust = TEXTURES.find(t => t.id === texture)!.adjust;

  const water = useMemo(() => {
    const ratio = info.ratio + adjust;
    return { ratio: Math.round(ratio * 100) / 100, ml: Math.round(cups * CUP_ML * ratio), cups: Math.round(cups * ratio * 10) / 10 };
  }, [cups, info, adjust]);

  return (
    <div>
      <NumberField label={ui.riceCups} value={cups} onChange={setCups} unit={ui.cupUnit} step={0.5} min={0.5} />

      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.grainTitle}</p>
      <Choice
        options={GRAINS.map((g, i) => ({ id: g.id, label: ui.grains[i], note: ui.waterTimes(g.ratio) }))}
        value={grain}
        onChange={setGrain}
      />

      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.textureTitle}</p>
      <Choice options={TEXTURES.map((t, i) => ({ id: t.id, label: ui.textures[i] }))} value={texture} onChange={setTexture} />

      <Result sub={ui.ratioSub(water.ratio, water.cups)}>
        {ui.waterWord} {water.ml}<span className="text-xl ml-1">ml</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label={ui.riceLabel} value={`${cups} ${ui.cupUnit}`} />
        <Stat label={ui.waterLabel} value={`${water.ml}ml`} accent="text-lime-600" />
        <Stat label={ui.soakLabel} value={ui.soaks[GRAINS.indexOf(info)]} accent="text-emerald-600" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.tipTitle(ui.grains[GRAINS.indexOf(info)])}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.grainNotes[GRAINS.indexOf(info)]}</p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.knuckle}
        </p>
        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
          {ui.rinseNote}
        </p>
      </div>
    </div>
  );
}
