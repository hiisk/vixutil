/**
 * 공예 섹션 — 양초 (8종)
 *
 * 양초는 부피로 담고 무게로 산다. 그 사이를 밀도가 잇는데, 소이·파라핀·비즈왁스가
 * 다르고 같은 소이도 브랜드마다 조금씩 다르다. 그래서 밀도를 입력으로 드러내
 * 둔다 — 0.9를 못박으면 다른 왁스를 쓰는 사람의 답이 틀린다.
 *
 * 향 비율은 왁스 무게 기준이다. 전체(왁스+향료) 기준으로 잡는 곳도 있어서
 * 같은 "10%"가 다른 양을 뜻하는데, 여기서는 흔히 쓰이는 왁스 기준으로 두고
 * 실제 비율을 되짚는 도구를 따로 둔다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const CANDLE_TOOLS: FormulaTool[] = [
  {
    slug: 'wax-weight',
    icon: '🕯️',
    category: '양초',
    fields: [
      { key: 'vol', term: 'containerVol', unit: 'ml', def: 200, min: 1 },
      { key: 'fill', term: 'fillPct', unit: 'percent', def: 90, min: 10, max: 100 },
      { key: 'd', term: 'waxDensity', unit: 'gPerCm3', def: 0.9, min: 0.5, max: 1.2, step: 0.01 },
    ],
    formula: '{waxWeight} = {containerVol} × {fillPct} ÷ 100 × {waxDensity}',
    compute: v => {
      const g = v.vol * v.fill / 100 * v.d;
      return [
        { term: 'waxWeight', unit: 'gram', value: round(g, 0), digits: 0, primary: true },
        { term: 'containerVol', unit: 'ml', value: round(v.vol * v.fill / 100, 0), digits: 0 },
      ];
    },
    ko: { title: '양초 왁스 무게 계산기', desc: '용기 부피로 필요한 왁스 무게를 구합니다.',
      long: '용기에 물을 채워 무게를 재면 부피(ml)가 나옵니다. 왁스는 물보다 가벼워서 같은 부피에 더 적은 무게가 들어갑니다 — 소이는 대체로 0.9 g/㎤ 안팎입니다.',
      note: '가득 채우지 마세요. 위쪽 10%는 심지를 세우고 향이 날아갈 공간으로 남깁니다. 소이는 굳으면서 꺼지므로 두 번 붓는 경우도 있습니다.' },
    en: { title: 'Candle Wax Calculator', desc: 'Convert a container volume into the weight of wax to melt.',
      long: 'Fill the vessel with water and weigh it: that gives the volume in millilitres. Wax is lighter than water, so the same volume takes less weight — soy sits around 0.9 g/cm³.',
      note: 'Do not fill to the brim. Leaving the top tenth clear gives room for the wick and the throw, and soy often sinks as it sets, so a second top-up pour is normal.' },
  },
  {
    slug: 'wax-multi',
    icon: '🔢',
    category: '양초',
    fields: [
      { key: 'vol', term: 'containerVol', unit: 'ml', def: 200, min: 1 },
      { key: 'n', term: 'candleCount', unit: 'candle', def: 12, min: 1 },
      { key: 'd', term: 'waxDensity', unit: 'gPerCm3', def: 0.9, min: 0.5, max: 1.2, step: 0.01 },
    ],
    formula: '{waxWeight} = {containerVol} × 0.9 × {candleCount} × {waxDensity}',
    compute: v => {
      const per = v.vol * 0.9 * v.d;
      return [
        { term: 'waxWeight', unit: 'gram', value: round(per * v.n, 0), digits: 0, primary: true },
        { term: 'spare', unit: 'gram', value: round(per * v.n * 0.05, 0), digits: 0 },
      ];
    },
    ko: { title: '양초 여러 개 왁스 계산기', desc: '같은 용기 여러 개를 만들 때 총 왁스 무게를 구합니다.',
      long: '한 개에 드는 무게에 개수를 곱합니다. 용기의 90%만 채우는 것을 기본으로 잡았습니다.',
      note: '5% 정도 더 녹이세요. 녹인 왁스는 냄비와 주둥이에 남고, 마지막 한 개가 모자라면 그 한 개를 위해 다시 녹여야 합니다.' },
    en: { title: 'Batch Candle Wax Calculator', desc: 'Total the wax for a run of identical containers.',
      long: 'Take the weight one vessel needs and multiply by the count. The figure assumes filling to nine tenths.',
      note: 'Melt about 5% extra. Some always clings to the pouring jug, and coming up short on the last candle means melting a whole second batch for it.' },
  },
  {
    slug: 'fragrance-load',
    icon: '💧',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 500, min: 1 },
      { key: 'pct', term: 'fragrancePct', unit: 'percent', def: 8, min: 0, max: 20, step: 0.5 },
    ],
    formula: '{fragranceWt} = {waxWeight} × {fragrancePct} ÷ 100',
    compute: v => {
      const fo = v.wax * v.pct / 100;
      return [
        { term: 'fragranceWt', unit: 'gram', value: round(fo, 1), digits: 1, primary: true },
        { term: 'totalBatch', unit: 'gram', value: round(v.wax + fo, 1), digits: 1 },
      ];
    },
    ko: { title: '양초 향료 비율 계산기', desc: '왁스 무게와 향 비율로 향료 무게를 구합니다.',
      long: '향 비율은 왁스 무게 기준입니다. 500g에 8%면 향료 40g이고, 반죽 총량은 540g이 됩니다. 왁스마다 품을 수 있는 한계가 있어 그보다 넣으면 향이 스미지 않고 표면에 뜹니다.',
      note: '향료는 부피가 아니라 무게로 재세요. 밀도가 물과 달라 ml로 재면 몇 %가 어긋납니다. 넣는 온도는 향료가 아니라 왁스 설명서를 따르세요.' },
    en: { title: 'Candle Fragrance Load Calculator', desc: 'Turn a wax weight and a fragrance percentage into grams of oil.',
      long: 'Fragrance load is a percentage of the wax, not of the finished candle. Eight per cent of 500 g is 40 g of oil, making a 540 g batch. Every wax has a ceiling it can hold; past that the oil sits on the surface instead of binding in.',
      note: 'Weigh fragrance oil rather than measuring it by volume — its density is not water\'s, so millilitres put you several per cent out. Follow the wax\'s stated adding temperature, not the oil\'s.' },
  },
  {
    slug: 'fragrance-percent',
    icon: '📊',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 500, min: 1 },
      { key: 'fo', term: 'fragranceWt', unit: 'gram', def: 40, min: 0 },
    ],
    formula: '{fragrancePct} = {fragranceWt} ÷ {waxWeight} × 100',
    compute: v => [
      { term: 'fragrancePct', unit: 'percent', value: v.wax > 0 ? round(v.fo / v.wax * 100, 2) : 0, digits: 2, primary: true },
      { term: 'totalBatch', unit: 'gram', value: round(v.wax + v.fo, 1), digits: 1 },
    ],
    ko: { title: '향 비율 역산 계산기', desc: '넣은 향료 무게로 실제 향 비율을 되짚습니다.',
      long: '레시피를 기록할 때, 또는 남은 향료를 다 쓰려고 넣은 뒤 몇 %였는지 확인할 때 씁니다. 전체 무게 기준으로 적는 곳도 있어서 같은 숫자가 다른 양을 뜻할 수 있는데, 여기서는 왁스 기준입니다.',
      note: '왁스 허용치를 넘으면 굳은 뒤 표면에 기름이 배거나 심지가 막힙니다. 향이 약하다고 비율만 올리는 것은 대개 해결이 아닙니다.' },
    en: { title: 'Fragrance Percentage Calculator', desc: 'Work back to the actual load from the oil you poured.',
      long: 'Useful when writing a recipe down, or after tipping in the last of a bottle and wanting to know what percentage that came to. Some suppliers quote load against the whole batch instead, so the same number can mean different amounts — this one is against the wax.',
      note: 'Going past the wax\'s stated maximum leaves oil weeping on the surface or clogs the wick. Raising the percentage is rarely the fix for a candle that smells weak.' },
  },
  {
    slug: 'candle-burn-time',
    icon: '⏱️',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 180, min: 1 },
      { key: 'rate', term: 'burnRate', unit: 'gPerHour', def: 7, min: 0.5, step: 0.5 },
    ],
    formula: '{burnHours} = {waxWeight} ÷ {burnRate}',
    compute: v => [
      { term: 'burnHours', unit: 'hour', value: v.rate > 0 ? round(v.wax / v.rate, 1) : 0, digits: 1, primary: true },
      { term: 'burnRate', unit: 'gPerHour', value: round(v.rate, 1), digits: 1 },
    ],
    ko: { title: '양초 연소 시간 계산기', desc: '왁스 무게와 시간당 소모량으로 총 연소 시간을 구합니다.',
      long: '한 번 켜서 무게 변화를 재면 시간당 몇 g이 타는지 알 수 있습니다. 그것으로 나누면 남은 시간이 나옵니다. 심지 굵기가 소모량을 정하므로, 같은 왁스라도 심지를 바꾸면 시간이 달라집니다.',
      note: '한 번에 네 시간을 넘기지 마세요. 그보다 길면 왁스가 과열되고 심지에 그을음이 앉습니다. 첫 연소는 표면 전체가 녹을 때까지 켜 두는 것이 좋습니다.' },
    en: { title: 'Candle Burn Time Calculator', desc: 'Estimate total burn hours from wax weight and hourly consumption.',
      long: 'Burn the candle once and weigh it before and after: that gives grams per hour. Dividing the wax by it gives the hours left. The wick size sets the rate, so the same wax in a thicker wick burns away faster.',
      note: 'Keep single burns under about four hours. Longer than that overheats the wax and sooty carbon builds on the wick. The first burn is worth running until the whole surface has melted.' },
  },
  {
    slug: 'container-volume',
    icon: '🥛',
    category: '양초',
    fields: [
      { key: 'd', term: 'vesselD', unit: 'cm', def: 7, min: 0.5 },
      { key: 'h', term: 'vesselH', unit: 'cm', def: 8, min: 0.5 },
      { key: 'fill', term: 'fillPct', unit: 'percent', def: 90, min: 10, max: 100 },
    ],
    formula: '{containerVol} = π × ({vesselD} ÷ 2)² × {vesselH} × {fillPct} ÷ 100',
    compute: v => {
      const full = Math.PI * (v.d / 2) ** 2 * v.h;
      return [
        { term: 'containerVol', unit: 'ml', value: round(full * v.fill / 100, 0), digits: 0, primary: true },
        { term: 'waxWeight', unit: 'gram', value: round(full * v.fill / 100 * 0.9, 0), digits: 0 },
      ];
    },
    ko: { title: '양초 용기 부피 계산기', desc: '용기 지름과 높이로 담기는 부피와 왁스 무게를 구합니다.',
      long: '원통 용기는 지름과 높이만 알면 부피가 나옵니다. 물을 채워 재는 것이 가장 정확하지만, 아직 용기가 없거나 주문 전이라면 치수로 미리 계산할 수 있습니다.',
      note: '아래가 좁아지는 용기는 이 값보다 적게 들어갑니다. 각진 용기는 지름 대신 한 변으로 잡으면 실제보다 크게 나옵니다 — 물로 확인하세요.' },
    en: { title: 'Candle Container Volume Calculator', desc: 'Get the usable volume and wax weight from a vessel\'s diameter and height.',
      long: 'A straight-sided jar needs only its inside diameter and height. Filling it with water is still the most accurate way, but this lets you work it out before the vessels arrive.',
      note: 'A tapered jar holds less than this. For a square vessel, using a side as the diameter overstates the volume — check that one with water.' },
  },
  {
    slug: 'melt-pour-batch',
    icon: '🧼',
    category: '양초',
    fields: [
      { key: 'n', term: 'candleCount', unit: 'candle', def: 6, min: 1 },
      { key: 'vol', term: 'containerVol', unit: 'ml', def: 100, min: 1 },
      { key: 'd', term: 'waxDensity', unit: 'gPerCm3', def: 1.05, min: 0.5, max: 1.3, step: 0.01 },
    ],
    formula: '{baseWeight} = {candleCount} × {containerVol} × {waxDensity} × 1.05',
    compute: v => {
      const g = v.n * v.vol * v.d * 1.05;
      return [
        { term: 'baseWeight', unit: 'gram', value: round(g, 0), digits: 0, primary: true },
        { term: 'unitCost', unit: 'gram', value: v.n > 0 ? round(g / v.n, 0) : 0, digits: 0 },
      ];
    },
    ko: { title: '몰드 베이스 소요량 계산기', desc: '몰드 개수와 부피로 녹여야 할 베이스 무게를 구합니다.',
      long: '비누·왁스 베이스는 물보다 조금 무거운 것이 많아 밀도를 1.05 정도로 잡습니다. 냄비와 주둥이에 남는 몫으로 5%를 더합니다.',
      note: '녹였다 굳힌 베이스는 다시 쓸 수 있습니다. 남는 것을 아끼려고 적게 녹이면 마지막 몰드가 반만 차는 쪽이 더 아깝습니다.' },
    en: { title: 'Melt and Pour Batch Calculator', desc: 'Work out the base to melt for a set of moulds.',
      long: 'Melt-and-pour bases usually run a little denser than water, so the default sits at 1.05. Five per cent is added for what stays behind in the jug and the pot.',
      note: 'Leftover base can be remelted, so erring high costs nothing. Erring low leaves the last mould half full, which does.' },
  },
  {
    slug: 'wax-cost-per-candle',
    icon: '🧾',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 180, min: 1 },
      { key: 'kg', term: 'unitPrice', unit: 'money', def: 9000, min: 0 },
      { key: 'extra', term: 'amount', unit: 'money', def: 1500, min: 0 },
    ],
    formula: '{unitCost} = {waxWeight} ÷ 1000 × {unitPrice} + {amount}',
    compute: v => [
      { term: 'unitCost', unit: 'money', value: round(v.wax / 1000 * v.kg + v.extra, 0), digits: 0, primary: true },
      { term: 'amount', unit: 'money', value: round(v.wax / 1000 * v.kg, 0), digits: 0 },
    ],
    ko: { title: '양초 개당 원가 계산기', desc: '왁스 단가와 부자재비로 한 개의 재료비를 구합니다.',
      long: '왁스는 kg 단위로 사고 한 개에는 g 단위로 들어갑니다. 1kg에 9,000원이고 180g을 쓰면 왁스만 1,620원입니다. 용기·심지·향료·라벨을 부자재비에 합쳐 넣으세요.',
      note: '재료비는 원가의 일부입니다. 판매한다면 실패한 개수, 포장, 배송, 수수료가 여기 없다는 것을 기억하세요.' },
    en: { title: 'Cost Per Candle Calculator', desc: 'Add wax cost and consumables into a per-candle material cost.',
      long: 'Wax is bought by the kilo and used by the gram. At 9,000 per kilo, a 180 g candle carries 1,620 of wax. Put the vessel, wick, fragrance and label into the consumables field.',
      note: 'Materials are only part of the cost. If you are selling, remember this figure excludes failed pours, packaging, postage and platform fees.' },
  },
];
