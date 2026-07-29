'use client';
import { useMemo, useState } from 'react';
import { CUP_ML } from '@/lib/food';
import { CARD, Choice, NumberField, Result, Stat } from './ui';

/** 쌀 부피 대비 물 비율 — 쌀 1에 물 몇 */
const GRAINS = [
  { id: 'white', label: '백미', ratio: 1.2, soak: '30분', note: '햅쌀은 1.1, 묵은쌀은 1.3' },
  { id: 'brown', label: '현미', ratio: 1.6, soak: '2시간 이상', note: '겨층이 물을 잘 안 먹습니다' },
  { id: 'mixed', label: '잡곡', ratio: 1.4, soak: '1시간', note: '콩은 따로 더 불리세요' },
] as const;
type Grain = (typeof GRAINS)[number]['id'];

const TEXTURES = [
  { id: 'firm', label: '고슬', adjust: -0.1 },
  { id: 'normal', label: '보통', adjust: 0 },
  { id: 'soft', label: '진밥', adjust: 0.15 },
] as const;
type Texture = (typeof TEXTURES)[number]['id'];

export default function RiceTool() {
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
      <NumberField label="쌀 (계량컵)" value={cups} onChange={setCups} unit="컵" step={0.5} min={0.5} />

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">쌀 종류</p>
      <Choice
        options={GRAINS.map(g => ({ id: g.id, label: g.label, note: `물 ${g.ratio}배` }))}
        value={grain}
        onChange={setGrain}
      />

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">밥의 질기</p>
      <Choice options={TEXTURES.map(t => ({ id: t.id, label: t.label }))} value={texture} onChange={setTexture} />

      <Result sub={`쌀 : 물 = 1 : ${water.ratio} · 물 ${water.cups}컵`}>
        물 {water.ml}<span className="text-xl ml-1">ml</span>
      </Result>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Stat label="쌀" value={`${cups}컵`} />
        <Stat label="물" value={`${water.ml}ml`} accent="text-lime-600" />
        <Stat label="불리는 시간" value={info.soak} accent="text-emerald-600" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{info.label} 요령</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{info.note}</p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          손등 기준으로는 쌀을 평평하게 고른 뒤 손등이 잠길 정도(약 1.5cm)가 백미 보통입니다. 다만
          냄비 지름에 따라 크게 달라지므로, 같은 냄비를 쓸 때만 믿을 만한 기준입니다.
        </p>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
          쌀을 씻은 뒤 체에 밭쳐 물기를 빼고 재야 정확합니다. 젖은 쌀은 이미 물을 먹은 상태입니다.
        </p>
      </div>
    </div>
  );
}
