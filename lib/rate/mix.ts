/** 비율 섹션 - 농도·배합 (6종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const MIX_TOOLS: FormulaTool[] = [
  {
    slug: 'concentration',
    icon: '🧪',
    category: '농도·배합',
    fields: [
      { key: 'solute', term: 'solute', unit: 'gram', def: 30, min: 0 },
      { key: 'solution', term: 'solution', unit: 'gram', def: 200, min: 0.01 },
    ],
    formula: '{concentration} = {solute} ÷ {solution} × 100',
    compute: v => [
      { term: 'concentration', unit: 'percent', value: round(ratio(v.solute, v.solution) * 100, 2), digits: 2, primary: true },
      { term: 'solvent', unit: 'gram', value: round(v.solution - v.solute, 2), digits: 2 },
    ],
    ko: { title: '농도 계산기', desc: '용질과 용액의 무게로 퍼센트 농도를 구합니다.',
      long: '농도는 용질을 용액 전체로 나눈 값입니다. 물 200g에 소금 30g을 녹였다면 용액은 230g이므로 농도는 13%입니다.',
      note: '용매(물)가 아니라 용액(물+용질)으로 나눠야 합니다. 200으로 나누면 15%가 나와 틀립니다.' },
    en: { title: 'Concentration Calculator', desc: 'Get percent concentration from the mass of solute and solution.',
      long: 'Concentration is solute divided by the whole solution. Dissolving 30 g of salt in 200 g of water gives 230 g of solution, so 13%.',
      note: 'Divide by the solution (water plus solute), not by the water alone — dividing by 200 gives 15%, which is wrong.' },
  },
  {
    slug: 'dilute-water',
    icon: '💧',
    category: '농도·배합',
    fields: [
      { key: 'conc', term: 'concentration', unit: 'percent', def: 20, min: 0.01, max: 100 },
      { key: 'solution', term: 'solution', unit: 'gram', def: 300, min: 0 },
      { key: 'target', term: 'targetConc', unit: 'percent', def: 5, min: 0.01, max: 100 },
    ],
    formula: '{addWater} = {solution} × ({concentration} ÷ {targetConc} − 1)',
    compute: v => {
      const need = v.solution * (ratio(v.conc, v.target) - 1);
      return [
        { term: 'addWater', unit: 'gram', value: round(Math.max(0, need), 1), digits: 1, primary: true },
        { term: 'solution', unit: 'gram', value: round(v.solution + Math.max(0, need), 1), digits: 1 },
      ];
    },
    verdict: v => v.target > v.conc ? {
      ko: '목표 농도가 현재보다 높습니다. 물을 넣어서는 농도를 올릴 수 없습니다.',
      en: 'The target is higher than the current concentration — adding water cannot raise it.',
      l10n: {
        es: 'La concentración objetivo es mayor que la actual: añadiendo agua no se puede subir.',
        'pt-br': 'A concentração desejada é maior que a atual: acrescentar água não faz subir.',
        ja: '目標濃度が今より高くなっています。水を足して濃度を上げることはできません。',
        de: 'Die Zielkonzentration liegt über der aktuellen — mit Wasser lässt sie sich nicht anheben.',
        fr: 'La concentration visée dépasse l’actuelle : ajouter de l’eau ne peut pas la faire monter.',
        hi: 'लक्ष्य सांद्रता अभी से ज़्यादा है — पानी मिलाकर सांद्रता बढ़ाई नहीं जा सकती।',
      },
      tone: 'bad',
    } : null,
    ko: { title: '희석에 넣을 물 계산기', desc: '농도를 목표까지 낮추려면 물을 얼마나 더 넣어야 하는지 구합니다.',
      long: '희석해도 용질의 양은 변하지 않습니다. 그래서 최종 용액의 무게는 처음 농도를 목표 농도로 나눈 배수만큼 커집니다.',
      note: '20% 300g을 5%로 만들려면 물 900g을 더 넣어 전체를 1,200g으로 만듭니다 — 농도를 4분의 1로 낮추려면 양이 4배가 됩니다.' },
    en: { title: 'Water Needed to Dilute', desc: 'How much water to add to bring a solution down to a target concentration.',
      long: 'Diluting does not change the amount of solute, so the final mass grows by the ratio of the starting concentration to the target.',
      note: 'Taking 300 g of 20% down to 5% needs 900 g more water for 1,200 g total — quartering the strength quadruples the volume.' },
  },
  {
    slug: 'mix-two',
    icon: '🧫',
    category: '농도·배합',
    fields: [
      { key: 'a', term: 'ratioA', unit: 'gram', def: 200, min: 0 },
      { key: 'ra', term: 'percentA', unit: 'percent', def: 30, min: 0, max: 100 },
      { key: 'b', term: 'ratioB', unit: 'gram', def: 300, min: 0 },
      { key: 'rb', term: 'percentB', unit: 'percent', def: 10, min: 0, max: 100 },
    ],
    formula: '{concentration} = ({ratioA} × {percentA} + {ratioB} × {percentB}) ÷ ({ratioA} + {ratioB})',
    compute: v => {
      const total = v.a + v.b;
      return [
        { term: 'concentration', unit: 'percent', value: round(ratio(v.a * v.ra + v.b * v.rb, total), 2), digits: 2, primary: true },
        { term: 'solution', unit: 'gram', value: round(total, 1), digits: 1 },
        { term: 'solute', unit: 'gram', value: round((v.a * v.ra + v.b * v.rb) / 100, 2), digits: 2 },
      ];
    },
    ko: { title: '두 용액 혼합 농도', desc: '농도가 다른 두 용액을 섞었을 때 최종 농도를 구합니다.',
      long: '각 용액의 용질을 모두 더한 뒤 전체 무게로 나눕니다. 농도끼리 평균을 내면 양이 다를 때 틀립니다.',
      note: '30% 200g과 10% 300g을 섞으면 18%입니다. 두 농도의 단순평균 20%가 아닙니다.' },
    en: { title: 'Mixing Two Solutions', desc: 'Find the resulting concentration when two solutions of different strengths are combined.',
      long: 'Add up the solute from both, then divide by the combined mass. Averaging the two concentrations fails when the amounts differ.',
      note: '200 g of 30% plus 300 g of 10% gives 18%, not the 20% you get by averaging.' },
  },
  {
    slug: 'salt-water',
    icon: '⚗️',
    category: '농도·배합',
    fields: [
      { key: 'target', term: 'targetConc', unit: 'percent', def: 3, min: 0, max: 100 },
      { key: 'total', term: 'solution', unit: 'gram', def: 1000, min: 0 },
    ],
    formula: '{addSolute} = {solution} × {targetConc} ÷ 100',
    compute: v => {
      const solute = v.total * (v.target / 100);
      return [
        { term: 'addSolute', unit: 'gram', value: round(solute, 1), digits: 1, primary: true },
        { term: 'addWater', unit: 'gram', value: round(v.total - solute, 1), digits: 1 },
      ];
    },
    ko: { title: '소금물 만들기 계산기', desc: '목표 농도의 용액을 원하는 양만큼 만들 배합을 구합니다.',
      long: '만들 총량에 농도를 곱하면 필요한 소금이고, 나머지가 물입니다. 3% 소금물 1kg은 소금 30g에 물 970g입니다.',
      note: '물 1L에 소금 30g을 넣는 것과는 다릅니다. 그러면 총량이 1,030g이 되어 농도가 2.9%로 내려갑니다.' },
    en: { title: 'Make a Saline Solution', desc: 'Work out the mix needed to make a given amount at a target concentration.',
      long: 'Multiply the batch size by the concentration for the solute; the rest is water. 1 kg of 3% saline is 30 g of salt and 970 g of water.',
      note: 'That is not the same as adding 30 g of salt to 1 L of water — that gives 1,030 g total and only 2.9%.' },
  },
  {
    slug: 'dilution-fold',
    icon: '🌱',
    category: '농도·배합',
    fields: [
      { key: 'fold', term: 'foldRate', unit: 'times', def: 1000, min: 1 },
      { key: 'batch', term: 'volumeL', def: 20, min: 0.01, step: 0.5 },
    ],
    formula: '{stockMl} = {volumeL} × 1000 ÷ {foldRate}',
    compute: v => [
      { term: 'stockMl', unit: 'ml', value: round(ratio(v.batch * 1000, v.fold), 2), digits: 2, primary: true },
      { term: 'perLiterMl', unit: 'ml', value: round(ratio(1000, v.fold), 2), digits: 2 },
    ],
    ko: { title: '배율 희석 계산기', desc: '1000배 희석처럼 배율로 지시된 약제의 원액량을 구합니다.',
      long: '농약과 영양제는 배율로 표기됩니다. 1000배 희석은 물 1L에 원액 1ml라는 뜻이고, 20L 분무기라면 20ml가 필요합니다.',
      note: '배율이 클수록 원액이 적게 들어갑니다. 500배가 1000배보다 두 배 진한 것이니 헷갈리지 마세요.' },
    en: { title: 'Fold Dilution Calculator', desc: 'Convert a dilution like "1:1000" into the millilitres of stock you need.',
      long: 'Pesticides and nutrients are labelled by fold. 1:1000 means 1 mL of stock per litre of water, so a 20 L sprayer takes 20 mL.',
      note: 'A larger fold means less stock — 1:500 is twice as strong as 1:1000, not half.' },
  },
  {
    slug: 'ppm-percent',
    icon: '⚛️',
    category: '농도·배합',
    fields: [
      { key: 'percent', term: 'concentration', unit: 'percent', def: 0.05, min: 0, step: 0.001 },
    ],
    formula: '{ppmValue} = {concentration} × 10000',
    compute: v => [
      { term: 'ppmValue', value: round(v.percent * 10000, 2), digits: 2, primary: true },
      { term: 'mgPerL', value: round(v.percent * 10000, 2), digits: 2 },
    ],
    ko: { title: '% ↔ ppm 변환', desc: '퍼센트 농도를 ppm과 mg/L로 바꿉니다.',
      long: 'ppm은 100만분의 1, %는 100분의 1이므로 1%는 10,000ppm입니다. 묽은 수용액에서는 1ppm이 1mg/L와 거의 같습니다.',
      note: 'mg/L 환산은 밀도가 1g/ml에 가까운 수용액에서만 성립합니다. 유기용매에서는 밀도를 따로 반영해야 합니다.' },
    en: { title: '% to ppm Converter', desc: 'Convert a percentage concentration into ppm and mg/L.',
      long: 'ppm is parts per million and percent is parts per hundred, so 1% is 10,000 ppm. In dilute water solutions 1 ppm is about 1 mg/L.',
      note: 'The mg/L equivalence only holds where density is near 1 g/mL. For organic solvents you must apply the actual density.' },
  },
];
