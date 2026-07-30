/**
 * 비율 섹션 - 농도·배합 둘째 묶음 (6종)
 *
 * 첫 묶음이 소금물과 ppm이었으니 여기는 실제로 뭘 섞을 때 막히는 것들 —
 * 도수 낮추기, 시럽 비율, 두 농도 섞기, 졸여서 농도 올리기.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const MIX2_TOOLS: FormulaTool[] = [
  {
    slug: 'alcohol-dilute',
    icon: '🍶',
    category: '농도·배합',
    fields: [
      { key: 'vol', term: 'volumeMl', unit: 'ml', def: 500, min: 0 },
      { key: 'from', term: 'origAbv', unit: 'percent', def: 40, min: 0, max: 100 },
      { key: 'to', term: 'targetAbv', unit: 'percent', def: 25, min: 0.1, max: 100 },
    ],
    formula: '{waterAddMl} = {volumeMl} × ({origAbv} ÷ {targetAbv} − 1)',
    compute: v => {
      const add = Math.max(0, v.vol * (ratio(v.from, v.to) - 1));
      return [
        { term: 'waterAddMl', unit: 'ml', value: Math.round(add), digits: 0, primary: true },
        { term: 'total', unit: 'ml', value: Math.round(v.vol + add), digits: 0 },
        { term: 'foldRate', unit: 'times', value: round(ratio(v.vol + add, v.vol), 2), digits: 2 },
      ];
    },
    ko: { title: '술 도수 낮추기 계산기', desc: '원하는 도수까지 물을 얼마나 넣어야 하는지 계산합니다.',
      long: '술 안의 알코올 양은 물을 넣어도 그대로입니다. 그래서 원래 부피 × 원래 도수 = 나중 부피 × 나중 도수가 성립하고, 여기서 넣을 물의 양이 나옵니다. 40도 500ml를 25도로 만들려면 물 300ml입니다.',
      note: '알코올과 물을 섞으면 부피가 약간 줄어들어 실제 도수는 계산보다 조금 높게 나옵니다. 정확히 맞춰야 하면 알코올 도수계로 확인하세요.' },
    en: { title: 'Dilute Spirits to a Target ABV', desc: 'How much water to add to bring a drink down to the strength you want.',
      long: 'Adding water does not change the alcohol inside, so original volume × original ABV = final volume × final ABV. Rearranged, it gives the water needed: 500 mL of 40% down to 25% takes 300 mL.',
      note: 'Alcohol and water contract slightly when mixed, so the real strength lands a touch above the calculation. Use a hydrometer if it must be exact.' },
  },
  {
    slug: 'syrup-ratio',
    icon: '🍯',
    category: '농도·배합',
    fields: [
      { key: 'total', term: 'volumeMl', unit: 'ml', def: 400, min: 0 },
      { key: 'syrup', term: 'syrupPart', unit: 'none', def: 1, min: 0 },
      { key: 'water', term: 'waterPart', unit: 'none', def: 4, min: 0 },
    ],
    formula: '{syrupMl} = {volumeMl} × {syrupPart} ÷ ({syrupPart} + {waterPart})',
    compute: v => {
      const parts = v.syrup + v.water;
      const s = ratio(v.total * v.syrup, parts);
      return [
        { term: 'syrupMl', unit: 'ml', value: Math.round(s), digits: 0, primary: true },
        { term: 'waterAddMl', unit: 'ml', value: Math.round(v.total - s), digits: 0 },
        { term: 'percent', unit: 'percent', value: round(ratio(v.syrup, parts) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '시럽·물 배합 계산기', desc: '1:4처럼 정한 비율로 원하는 양을 만들 때 각각 얼마인지 계산합니다.',
      long: '비율의 두 숫자를 더해 몫의 수를 만들고, 만들 양을 그 수로 나눠 한 몫을 구합니다. 1:4로 400ml를 만들면 다섯 몫이므로 시럽 80ml, 물 320ml입니다.',
      note: '1:4는 "시럽 1에 물 4"라는 뜻이고 "전체 4에 시럽 1"이 아닙니다. 이 둘을 헷갈리면 농도가 25% 차이 납니다.' },
    en: { title: 'Syrup to Water Ratio', desc: 'Split a batch into the parts a 1:4 style ratio calls for.',
      long: 'Add the two numbers to count the parts, then divide the batch by that. Making 400 mL at 1:4 gives five parts — 80 mL syrup and 320 mL water.',
      note: '1:4 means one part syrup to four of water, not one part in four. Confusing the two is a 25% error in strength.' },
  },
  {
    slug: 'mix-to-target',
    icon: '🧪',
    category: '농도·배합',
    fields: [
      { key: 'total', term: 'volumeMl', unit: 'ml', def: 1000, min: 0 },
      { key: 'a', term: 'percentA', unit: 'percent', def: 30, min: 0, max: 100 },
      { key: 'b', term: 'percentB', unit: 'percent', def: 5, min: 0, max: 100 },
      { key: 'target', term: 'targetConc', unit: 'percent', def: 12, min: 0, max: 100 },
    ],
    formula: '{amountA} = {volumeMl} × ({targetConc} − {percentB}) ÷ ({percentA} − {percentB})',
    compute: v => {
      const span = v.a - v.b;
      const wantA = span === 0 ? 0 : ratio(v.total * (v.target - v.b), span);
      const clamped = Math.min(Math.max(0, wantA), v.total);
      return [
        { term: 'amountA', unit: 'ml', value: Math.round(clamped), digits: 0, primary: true },
        { term: 'amountB', unit: 'ml', value: Math.round(v.total - clamped), digits: 0 },
        { term: 'concentration', unit: 'percent', value: round(ratio(clamped * v.a + (v.total - clamped) * v.b, v.total), 2), digits: 2 },
      ];
    },
    verdict: (v) => {
      const lo = Math.min(v.a, v.b);
      const hi = Math.max(v.a, v.b);
      return v.target < lo || v.target > hi
        ? { ko: `목표 농도가 두 원액 사이(${lo}~${hi}%)를 벗어나 섞어서는 만들 수 없습니다.`, en: `The target sits outside the ${lo}–${hi}% range of the two stocks, so mixing cannot reach it.`, tone: 'bad' }
        : { ko: '두 원액 사이의 농도이므로 섞어서 만들 수 있습니다.', en: 'The target lies between the two stocks, so this mix works.', tone: 'good' };
    },
    ko: { title: '두 농도 섞어 목표 맞추기', desc: '농도가 다른 두 액체를 섞어 원하는 농도를 만들 양을 계산합니다.',
      long: '진한 쪽과 묶은 쪽 사이 어디에 목표가 놓이는지를 보면 섞는 비율이 나옵니다. 목표가 묶은 쪽에서 얼마나 떨어졌는지를 두 농도의 간격으로 나누면 진한 쪽 비율입니다.',
      note: '목표가 두 농도 사이에 없으면 섞어서 만들 수 없습니다. 30%와 5%로는 35%를 만들 수 없고, 더 진한 원액이 필요합니다.' },
    en: { title: 'Blend Two Strengths to a Target', desc: 'How much of each liquid to combine for the concentration you want.',
      long: 'Where the target sits between the strong and weak stock sets the ratio. Divide the target’s distance from the weak stock by the gap between the two, and that is the share of the strong one.',
      note: 'If the target is not between the two, no mix reaches it. You cannot make 35% out of 30% and 5% — you need a stronger stock.' },
  },
  {
    slug: 'evaporate-to-concentrate',
    icon: '♨️',
    category: '농도·배합',
    fields: [
      { key: 'vol', term: 'solution', unit: 'gram', def: 800, min: 0 },
      { key: 'from', term: 'concentration', unit: 'percent', def: 6, min: 0.1, max: 100 },
      { key: 'to', term: 'targetConc', unit: 'percent', def: 15, min: 0.1, max: 100 },
    ],
    formula: '{evapMl} = {solution} × (1 − {concentration} ÷ {targetConc})',
    compute: v => {
      const keep = ratio(v.vol * v.from, v.to);
      const evap = Math.max(0, v.vol - keep);
      return [
        { term: 'evapMl', unit: 'gram', value: Math.round(evap), digits: 0, primary: true },
        { term: 'solution', unit: 'gram', value: Math.round(keep), digits: 0 },
        { term: 'solute', unit: 'gram', value: round(v.vol * (v.from / 100), 1), digits: 1 },
      ];
    },
    ko: { title: '졸여서 농도 올리기 계산기', desc: '물을 얼마나 날려야 목표 농도가 되는지 계산합니다.',
      long: '졸이는 동안 용질은 그대로 남고 물만 나갑니다. 남아야 할 전체 양은 용질 양을 목표 농도로 나눈 값이고, 처음 양에서 그걸 빼면 날려야 할 물의 양입니다.',
      note: '소스나 잼은 졸이면서 당·염 농도가 함께 올라가 맛이 급하게 진해집니다. 목표의 8할까지만 졸이고 맛을 보며 조절하는 편이 안전합니다.' },
    en: { title: 'Reduce to Raise Concentration', desc: 'How much water to boil off to reach a target strength.',
      long: 'Reducing drives off water while the solute stays. The weight you must keep is the solute divided by the target concentration; the rest is what has to evaporate.',
      note: 'In sauces and jams sugar and salt concentrate together, so flavour intensifies fast. Reduce to about 80% of target, then taste and adjust.' },
  },
  {
    slug: 'stock-to-ppm',
    icon: '🌱',
    category: '농도·배합',
    fields: [
      { key: 'water', term: 'volumeL', unit: 'none', def: 10, min: 0 },
      { key: 'stock', term: 'stockPct', unit: 'percent', def: 20, min: 0.01, max: 100 },
      { key: 'ppm', term: 'targetPpm', unit: 'none', def: 800, min: 0 },
    ],
    formula: '{stockNeedMl} = {volumeL} × {targetPpm} ÷ ({stockPct} × 10000) × 1000',
    compute: v => {
      // 목표 mg = 물(L) × ppm, 원액 1ml에 든 mg = 농도(%) × 10
      const needMg = v.water * v.ppm;
      const mgPerMl = v.stock * 10;
      return [
        { term: 'stockNeedMl', unit: 'ml', value: round(ratio(needMg, mgPerMl), 2), digits: 2, primary: true },
        { term: 'foldRate', unit: 'times', value: Math.round(ratio(v.stock * 10000, v.ppm)), digits: 0 },
        { term: 'perLiterMl', unit: 'ml', value: round(ratio(v.ppm, mgPerMl), 3), digits: 3 },
      ];
    },
    ko: { title: '원액 → 목표 ppm 희석 계산기', desc: '농도가 적힌 원액으로 목표 ppm 용액을 만들 때 필요한 원액량을 계산합니다.',
      long: '20% 원액 1ml에는 용질 200mg이 들어 있습니다. 물 10L를 800ppm으로 만들려면 8,000mg이 필요하므로 원액 40ml입니다. 비료·소독액·영양액이 모두 이 계산입니다.',
      note: '고체 비료는 %가 아니라 성분비(예: 20-20-20)로 표기됩니다. 그때는 목표 성분의 %만 떼어 계산하세요.' },
    en: { title: 'Stock Solution to Target ppm', desc: 'How much of a percentage-strength stock makes a solution at a target ppm.',
      long: 'One millilitre of 20% stock holds 200 mg of solute. Ten litres at 800 ppm needs 8,000 mg, so 40 mL of stock. Fertiliser, sanitiser and nutrient mixes all work this way.',
      note: 'Dry fertiliser is labelled by nutrient ratio (20-20-20), not a single percentage. Pull out the percentage of the nutrient you are targeting first.' },
  },
  {
    slug: 'two-part-mix',
    icon: '🎨',
    category: '농도·배합',
    fields: [
      { key: 'total', term: 'volumeMl', unit: 'ml', def: 1000, min: 0 },
      { key: 'a', term: 'ratioA', unit: 'none', def: 4, min: 0.1 },
      { key: 'b', term: 'ratioB', unit: 'none', def: 1, min: 0.1 },
    ],
    formula: '{mainMl} = {volumeMl} × {ratioA} ÷ ({ratioA} + {ratioB})',
    compute: v => {
      const parts = v.a + v.b;
      const main = ratio(v.total * v.a, parts);
      return [
        { term: 'mainMl', unit: 'ml', value: Math.round(main), digits: 0, primary: true },
        { term: 'hardenerMl', unit: 'ml', value: Math.round(v.total - main), digits: 0 },
        { term: 'percent', unit: 'percent', value: round(ratio(v.b, parts) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '2액형 배합 계산기 (주제:경화제)', desc: '에폭시·도료처럼 두 액을 정해진 비율로 섞을 때의 양을 계산합니다.',
      long: '비율의 두 숫자를 더해 몫의 수를 만들고 전체를 나눕니다. 4:1로 1L를 만들면 다섯 몫이라 주제 800ml, 경화제 200ml입니다.',
      note: '2액형은 비율이 어긋나면 굳지 않거나 물성이 나빠집니다. 부피 비율과 무게 비율이 다르게 표기된 제품이 있으니 지시서의 기준을 확인하세요.' },
    en: { title: 'Two-Part Mix (Resin : Hardener)', desc: 'Split a batch of epoxy or paint into its two components.',
      long: 'Add the ratio numbers to count the parts and divide the batch. A 4:1 litre is five parts — 800 mL resin and 200 mL hardener.',
      note: 'Get the ratio wrong and two-part systems either stay tacky or cure weak. Some products state the ratio by weight rather than volume, so check the datasheet.' },
  },
];
