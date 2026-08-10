/**
 * 공예 섹션 — 비누·수지 확장 (8종)
 *
 * 먼저 있던 soap.ts는 오일 한 가지를 다룬다. 그런데 실제 레시피에 오일이 하나인
 * 경우는 없다 — 올리브로 무르게, 코코넛으로 거품, 캐스터로 크림을 맞추는 식으로
 * 셋을 섞는다. 오일마다 SAP이 다르므로 소다 양은 "오일별 무게 × 그 오일의 SAP"을
 * 더한 뒤 한 번만 환산해야 한다. 그 구조를 multi-oil-lye에서 눈에 보이게 뒀다.
 * 환산 상수는 soap.ts와 같은 1402.5(KOH 56.1 × 1000 ÷ NaOH 40.0)를 쓴다 — 두
 * 파일이 다른 상수를 쓰면 같은 레시피가 페이지마다 다른 답을 낸다.
 *
 * 물은 반응에 들어가지 않고 굳는 동안 날아간다. 그래서 물을 줄이는 것(water
 * discount)은 "덜 넣는다"가 아니라 "소다액을 진하게 한다"는 뜻이고, 진해지면
 * 트레이스가 빨라진다. 양이 아니라 농도를 결과로 내놓는 이유다.
 *
 * 수지 쪽은 부피를 먼저 세운다. 코팅은 면적 × 두께, 돔은 구면 캡 부피
 * (V = πh(3a² + h²)/6), 몰드는 안쪽 치수 — 어느 쪽이든 부피를 구한 뒤 밀도로
 * 무게를 만들고, 무게비로 A와 B를 가른다. 부피비로 갈라도 되는 제품이 있지만
 * 이 섹션은 전부 무게비로 고정하고 문구에서 그 사실을 밝힌다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** SAP(mg KOH/g) → NaOH 환산 상수 — soap.ts와 같은 값이어야 한다 */
const KOH_TO_NAOH = 1402.5;

export const SOAP2_TOOLS: FormulaTool[] = [
  {
    slug: 'multi-oil-lye',
    icon: '🧴',
    category: '비누·수지',
    fields: [
      { key: 'o1', term: 'oil1Wt', unit: 'gram', def: 300, min: 0 },
      { key: 's1', term: 'oil1Sap', unit: 'none', def: 190, min: 0, max: 300, step: 0.1 },
      { key: 'o2', term: 'oil2Wt', unit: 'gram', def: 150, min: 0 },
      { key: 's2', term: 'oil2Sap', unit: 'none', def: 258, min: 0, max: 300, step: 0.1 },
      { key: 'o3', term: 'oil3Wt', unit: 'gram', def: 50, min: 0 },
      { key: 's3', term: 'oil3Sap', unit: 'none', def: 180, min: 0, max: 300, step: 0.1 },
      { key: 'sf', term: 'superfat', unit: 'percent', def: 5, min: 0, max: 20, step: 0.5 },
    ],
    formula: '{lyeWeight} = ({oil1Wt} × {oil1Sap} + {oil2Wt} × {oil2Sap} + {oil3Wt} × {oil3Sap}) ÷ 1402.5 × (1 − {superfat} ÷ 100)',
    compute: v => {
      // 오일별로 곱해 더한 뒤 한 번만 환산한다 — 평균 SAP을 먼저 내면 무게 가중이 빠진다
      const koh = v.o1 * v.s1 + v.o2 * v.s2 + v.o3 * v.s3;
      const oil = v.o1 + v.o2 + v.o3;
      const lye = koh / KOH_TO_NAOH * (1 - v.sf / 100);
      const water = lye * 2; // 물:소다 2:1 — 출발점, 줄이려면 물 감량 계산기로
      return [
        { term: 'lyeWeight', unit: 'gram', value: round(lye, 1), digits: 1, primary: true },
        { term: 'blendSap', unit: 'none', value: round(ratio(koh, oil), 1), digits: 1 },
        { term: 'waterWeight', unit: 'gram', value: round(water, 0), digits: 0 },
        { term: 'batchTotal', unit: 'gram', value: round(oil + lye + water, 0), digits: 0 },
      ];
    },
    ko: { title: '여러 오일 가성소다 계산기', desc: '오일 세 가지의 무게와 각자의 SAP 값으로 필요한 가성소다를 한 번에 구합니다.',
      long: '오일이 섞이면 소다는 오일별로 구해서 더해야 합니다 — 오일마다 SAP 값이 다르기 때문입니다. SAP 값은 비누가 아니라 그 오일의 것이므로 반드시 쓰는 오일의 자료값을 넣으세요(공급처 시트나 표준 SAP 표에 적혀 있습니다). 올리브 300g(SAP 190), 코코넛 150g(SAP 258), 캐스터 50g(SAP 180)을 슈퍼팻 5%로 잡으면 (300×190 + 150×258 + 50×180) = 104,700이고, 1402.5로 나눠 74.7g, 여기서 5%를 덜어 70.9g이 답입니다. 함께 나오는 평균 SAP 209.4는 무게로 가중한 값이라, 이 배합을 한 가지 오일처럼 다룰 때 쓰는 숫자입니다. 오일 하나를 바꾸면 평균 SAP이 움직이므로 소다도 다시 구해야 합니다.',
      note: '소다는 언제나 물에 소다를 넣습니다 — 반대로 하면 순간적으로 끓어올라 튑니다. 보안경과 장갑을 끼고, 스테인리스나 HDPE 통을 쓰세요. 알루미늄은 소다와 반응해 수소를 냅니다. 섞는 순간 스스로 80~90℃까지 오르니 유리컵이나 얇은 플라스틱은 쓰지 않습니다. 오일 무게를 한 칸이라도 잘못 넣으면 소다가 어긋나는데, 모자라면 굳지 않는 무른 비누가 되고 넘치면 피부를 상하게 하는 비누가 됩니다. 쓰지 않는 오일 칸은 무게를 0으로 두세요 — SAP만 남아 있어도 답은 바뀌지 않습니다.' },
    en: { title: 'Lye Calculator for Multiple Oils', desc: 'Add three oils, each with its own SAP value, and get the sodium hydroxide the blend needs.',
      long: 'A blended recipe has to be worked oil by oil and then added up, because the SAP value belongs to the oil and not to soap in general — take each figure from that oil\'s own data, whether a supplier sheet or a standard SAP table. Olive at 300 g (SAP 190), coconut at 150 g (SAP 258) and castor at 50 g (SAP 180) give 300×190 + 150×258 + 50×180 = 104,700, which divided by 1402.5 is 74.7 g of NaOH, and taking off 5% superfat leaves 70.9 g. The blend SAP shown alongside, 209.4 here, is the weighted average: it is the number to use if you later treat this blend as a single oil. Swap one oil and the blend SAP moves, so the lye has to be redone.',
      note: 'Lye goes into the water, never water into the lye — the wrong order can boil up and spit in seconds. Wear goggles and gloves, and mix in stainless steel or HDPE, never aluminium, which lye attacks and releases hydrogen from. The solution heats itself to 80–90°C on contact, so no glass and no thin plastic. One mistyped oil weight throws the lye off: too little leaves a soft bar that never firms, too much leaves a caustic one. Set an unused oil\'s weight to zero — a leftover SAP value on its own changes nothing.' },
  },
  {
    slug: 'water-discount',
    icon: '🍶',
    category: '비누·수지',
    fields: [
      { key: 'lye', term: 'lyeWeight', unit: 'gram', def: 71, min: 0 },
      { key: 'r', term: 'waterRatio', unit: 'times', def: 2, min: 0, max: 4, step: 0.1 },
      { key: 'd', term: 'waterDiscount', unit: 'percent', def: 20, min: 0, max: 50, step: 1 },
    ],
    formula: '{waterWeight} = {lyeWeight} × {waterRatio} × (1 − {waterDiscount} ÷ 100)',
    compute: v => {
      const full = v.lye * Math.max(v.r, 0);
      const water = Math.max(0, full * (1 - v.d / 100));
      const sol = v.lye + water;
      return [
        { term: 'waterWeight', unit: 'gram', value: round(water, 1), digits: 1, primary: true },
        { term: 'concentration', unit: 'percent', value: round(ratio(v.lye * 100, sol), 1), digits: 1 },
        { term: 'lyeSolution', unit: 'gram', value: round(sol, 1), digits: 1 },
      ];
    },
    ko: { title: '비누 물 감량 계산기', desc: '기준 물 양에서 몇 %를 줄일지 정하면 물 무게와 소다액 농도가 나옵니다.',
      long: '물은 비누화 반응에 들어가지 않고 소다를 오일에 퍼뜨린 뒤 건조 중에 날아갑니다. 그래서 물을 줄이는 것은 재료를 아끼는 일이 아니라 소다액을 진하게 하는 일입니다. 소다 71g에 2:1이면 물 142g, 농도 33%입니다. 여기서 20%를 줄이면 물 113.6g, 농도는 38.5%로 올라갑니다. 진한 소다액은 반죽에 들어가는 물이 적어 트레이스가 눈에 띄게 빨라집니다 — 무늬를 넣을 시간이 짧아지는 대신 하루 안에 몰드에서 빼낼 만큼 단단해지고, 건조 기간도 짧아지고 수축도 적습니다. 그래서 물 감량은 무늬가 없는 단색 비누나 급하게 굳혀야 할 때 씁니다. 반대로 복잡한 스월을 넣으려면 감량을 0으로 두거나 물을 더 잡습니다.',
      note: '농도 50%가 실질적인 한계입니다 — 그보다 진하면 소다가 다 녹지 않아 덩어리가 남고, 그 덩어리가 비누에 그대로 박힙니다. 감량이 클수록 소다액 온도가 더 높이 오르니 찬물로 시작하고, 물에 소다를 넣는 순서를 지키세요 — 반대로 하면 끓어 튑니다. 보안경과 장갑, 스테인리스나 HDPE 통을 쓰고 알루미늄은 쓰지 않습니다. 물을 줄여도 소다 무게는 절대 바뀌지 않습니다. 물을 줄인 만큼 소다도 줄이면 굳지 않는 무른 비누가 되고, 물 칸에 소다를 잘못 달면 피부를 상하게 하는 비누가 됩니다.' },
    en: { title: 'Water Discount Calculator', desc: 'Cut a percentage off the full water and see the water weight and the lye concentration it leaves.',
      long: 'Water takes no part in saponification: it carries the lye into the oils and then leaves again while the bar cures. Discounting it is therefore not about using less material but about making the lye solution stronger. Seventy-one grams of lye at 2 : 1 is 142 g of water, a 33% solution. Take 20% off and it is 113.6 g of water at 38.5%. A stronger solution puts less water in the batter, so trace arrives noticeably sooner — less time to swirl, but firm enough to unmould within a day, a shorter cure and less shrinkage. That is why discounts suit plain bars and rushed batches, while an intricate swirl wants the discount at zero or extra water instead.',
      note: 'Around 50% is the practical ceiling: stronger than that and the lye will not all dissolve, leaving grains that end up in the bar. The bigger the discount the hotter the solution peaks, so start with cold water — and keep the order, lye into water, or it boils and spits. Goggles, gloves, and stainless or HDPE, never aluminium. Cutting the water never changes the lye weight. Scale the lye down with the water and you get a soft bar that will not set; weigh lye into the water field by mistake and you get a caustic one.' },
  },
  {
    slug: 'soap-mold-fill',
    icon: '🍱',
    category: '비누·수지',
    fields: [
      { key: 'vol', term: 'mouldVol', unit: 'ml', def: 1200, min: 0 },
      { key: 'den', term: 'batterDensity', unit: 'gPerCm3', def: 0.95, min: 0.6, max: 1.3, step: 0.01 },
      { key: 'p', term: 'lyePctOfOil', unit: 'percent', def: 13.5, min: 0, max: 25, step: 0.1 },
      { key: 'r', term: 'waterRatio', unit: 'times', def: 2, min: 0, max: 4, step: 0.1 },
    ],
    formula: '{batchTotal} = {mouldVol} × {batterDensity}, {oilWeight} = {batchTotal} ÷ (1 + {lyePctOfOil} ÷ 100 × (1 + {waterRatio}))',
    compute: v => {
      const total = v.vol * v.den;
      const p = v.p / 100;
      const r = Math.max(v.r, 0);
      const oil = ratio(total, 1 + p + p * r); // 반죽 = 오일 + 소다 + 물, 소다와 물은 오일에 비례한다
      const lye = oil * p;
      return [
        { term: 'batchTotal', unit: 'gram', value: round(total, 0), digits: 0, primary: true },
        { term: 'oilWeight', unit: 'gram', value: round(oil, 0), digits: 0 },
        { term: 'lyeWeight', unit: 'gram', value: round(lye, 1), digits: 1 },
        { term: 'waterWeight', unit: 'gram', value: round(lye * r, 0), digits: 0 },
      ];
    },
    ko: { title: '비누 몰드 용량 계산기', desc: '몰드 부피와 반죽 밀도로 반죽 총량을 구하고, 그 안의 오일 무게까지 나눕니다.',
      long: '몰드는 부피로, 레시피는 무게로 말합니다. 그 사이를 잇는 것이 반죽 밀도입니다 — 비누 반죽은 물보다 조금 가벼워 0.9~1.0 g/ml 사이이고 0.95를 기본으로 뒀습니다. 1,200ml 몰드라면 반죽은 1,140g입니다. 여기서 오일 무게를 되짚을 때 쓰는 가정은 하나입니다: 소다는 오일 무게의 일정 비율(기본 13.5%, 흔한 배합의 실제 값)이고 물은 소다의 배수(기본 2배)라는 것. 그러면 반죽은 오일의 1 + 0.135 + 0.27 = 1.405배이므로 1,140 ÷ 1.405 = 811g이 오일, 소다 109.5g, 물 219g입니다. 정확한 소다 비율은 오일 배합이 정하므로, 배합이 확정되면 여러 오일 가성소다 계산기로 구한 소다 ÷ 오일 값을 이 칸에 넣으세요. 몰드 부피는 물을 채워 재는 것이 가장 정확하고, 실리콘 몰드는 부어 놓으면 벽이 조금 벌어져 계산보다 5% 정도 더 들어갑니다.',
      note: '몰드를 끝까지 채우지 마세요. 반죽은 열이 오르며 부풀고, 젤 단계에서 넘치면 몰드 밖으로 흘러 굳습니다 — 위로 1~1.5cm는 비워 둡니다. 반대로 너무 적게 부으면 바 높이가 낮아져 자를 때 부서집니다. 밀도는 배합에 따라 움직이는데, 코코넛 같은 단단한 오일이 많으면 무겁고 공기를 많이 물린(휘핑한) 반죽은 훨씬 가볍습니다 — 한 번 부어 본 몰드는 그때의 반죽 무게 ÷ 몰드 부피로 자신의 밀도를 적어 두는 편이 어떤 기본값보다 정확합니다.' },
    en: { title: 'Soap Mould Volume Calculator', desc: 'Turn a mould volume and a batter density into the batch weight, and the oil inside it.',
      long: 'Moulds are measured in volume, recipes in weight, and batter density is what joins them — soap batter runs a little lighter than water, 0.9–1.0 g/mL, and 0.95 is the default here. A 1,200 mL mould therefore holds about 1,140 g of batter. Reading the oil back out of that takes one assumption: the lye is a fixed share of the oil weight (13.5% by default, a realistic figure for common blends) and the water is a multiple of the lye (2× by default). The batter is then 1 + 0.135 + 0.27 = 1.405 times the oil, so 1,140 ÷ 1.405 = 811 g of oil, 109.5 g of lye and 219 g of water. The true lye share is set by your oil blend, so once the blend is fixed, put its lye ÷ oil figure from the multi-oil lye calculator into that field. Measure the mould with water, and expect a silicone mould to take about 5% more than the arithmetic, because the walls bow out under the batter.',
      note: 'Do not fill to the rim. Batter rises as it heats, and a batch that gels over the top sets in a puddle around the mould — leave 1–1.5 cm of headroom. Pour too little instead and the bars come out shallow and crumble when cut. Density moves with the recipe: hard oils such as coconut make it heavier, and whipped batter is far lighter. Once you have poured a mould, note its batter weight divided by its volume and use that — your own figure beats any default.' },
  },
  {
    slug: 'soap-cure-progress',
    icon: '⏳',
    category: '비누·수지',
    fields: [
      { key: 'done', term: 'curedDays', unit: 'day', def: 14, min: 0 },
      { key: 'target', term: 'targetCure', unit: 'day', def: 42, min: 0 },
    ],
    formula: '{curePct} = {curedDays} ÷ {targetCure} × 100',
    compute: v => {
      const pct = Math.min(100, ratio(v.done * 100, v.target));
      return [
        { term: 'curePct', unit: 'percent', value: round(pct, 0), digits: 0, primary: true },
        { term: 'daysLeft', unit: 'day', value: Math.max(0, Math.round(v.target - v.done)), digits: 0 },
      ];
    },
    ko: { title: '비누 건조 기간 계산기', desc: '만든 날부터 지난 날수와 목표 건조 일수로 진행률과 남은 날을 구합니다.',
      long: '건조(큐어)는 비누화가 아니라 물이 빠지는 과정입니다. 비누화 자체는 대개 24~48시간 안에 끝나서 그 시점부터 이미 "비누"이지만, 반죽에 넣은 물이 남아 있어 무르고 빨리 닳습니다. 4~6주 동안 그 물이 날아가면서 바가 단단해지고 거품이 곱고 오래갑니다. 6주(42일)를 목표로 잡고 14일이 지났다면 33%, 남은 날은 28일입니다. 목표는 마감이 아니라 눈금입니다 — 100%를 넘겨도 계속 좋아지고, 올리브가 많은 캐스틸 비누는 두세 달, 반년까지 두면 확실히 달라집니다. 진행을 눈으로 확인하려면 저울을 쓰세요. 바 하나를 골라 무게를 적어 두고 며칠마다 다시 달아, 무게가 더 이상 줄지 않으면 물이 다 빠진 것입니다 — 대개 처음 무게의 5~10%가 줄어듭니다.',
      note: '진행률은 날짜만 세는 숫자라 방 상태를 모릅니다. 습한 여름 실내에서는 42일이 지나도 무게가 계속 줄고, 건조한 겨울에는 더 빨리 끝납니다. 바 사이를 띄워 공기가 도는 선반에 옆으로 세워 두세요 — 겹쳐 두거나 상자에 담아 두면 날짜만 흐르고 물은 그대로 남습니다. 랩이나 비닐로 싸는 것은 건조가 끝난 뒤입니다. 소다가 모자라 무른 비누는 시간이 지나도 단단해지지 않습니다 — 건조로 고쳐지는 것은 물기뿐이고, 어긋난 소다 양은 고쳐지지 않습니다.' },
    en: { title: 'Soap Cure Time Calculator', desc: 'Days since you made it against a target cure gives the percentage cured and the days left.',
      long: 'Curing is water leaving, not saponification. The reaction itself is usually finished within 24–48 hours, so the loaf is already soap at that point, but it is soft and short-lived because the water you mixed in is still there. Over four to six weeks that water evaporates, the bar hardens and the lather turns finer and longer-lasting. Against a 42-day target, day 14 is 33% with 28 days to go. The target is a marker, not a deadline — bars keep improving past 100%, and an olive-heavy castile is visibly better at two or three months, better still at six. To watch it properly, use a scale: weigh one bar, note it, and re-weigh every few days; when the weight stops falling the water is gone, typically 5–10% below where it started.',
      note: 'This percentage counts days and knows nothing about your room. In a humid summer the weight is still dropping well past day 42; in dry winter air it finishes early. Stand the bars on edge with space between them on an airy shelf — stacked or boxed, the days pass while the water stays. Wrapping in film or plastic belongs after the cure, not during it. And a bar that is soft because the lye was short never hardens: curing fixes moisture, not a mis-weighed recipe.' },
  },
  {
    slug: 'resin-coverage',
    icon: '🟦',
    category: '비누·수지',
    fields: [
      { key: 'a', term: 'area', unit: 'cm2', def: 3600, min: 0 },
      { key: 't', term: 'thickness', unit: 'mm', def: 3, min: 0, step: 0.5 },
      { key: 'den', term: 'resinDensity', unit: 'gPerCm3', def: 1.1, min: 0.8, max: 1.6, step: 0.01 },
    ],
    formula: '{resinWeight} = {area} × {thickness} ÷ 10 × {resinDensity}',
    compute: v => {
      const vol = v.a * v.t / 10; // ㎠ × mm ÷ 10 = ㎤ = ml
      return [
        { term: 'resinWeight', unit: 'gram', value: round(vol * v.den, 0), digits: 0, primary: true },
        { term: 'resinVol', unit: 'ml', value: round(vol, 0), digits: 0 },
      ];
    },
    ko: { title: '레진 도포량 계산기', desc: '바를 면적과 두께로 코팅에 드는 레진 부피와 무게를 구합니다.',
      long: '코팅은 면적 × 두께가 곧 부피입니다. 단위만 맞추면 되는데, ㎠에 mm를 곱하면 10으로 나눠야 ㎤(=ml)가 됩니다. 60 × 60cm 트레이(3,600㎠)를 3mm로 덮으면 1,080ml, 밀도 1.1로 1,188g입니다. 테이블처럼 넓은 면은 한 번에 3mm 넘게 붓지 않는 것이 보통이라 두께를 층으로 나누는데, 층마다 이 계산을 다시 하지 말고 한 층 두께를 넣어 층 수만큼 반복하세요. 셀프 레벨링 레진은 수평인 면에서 스스로 퍼져 두께가 고르지만, 0.5도만 기울어도 낮은 쪽이 두꺼워지고 높은 쪽이 얇아집니다 — 붓기 전에 수평계로 확인하는 것이 계산보다 중요합니다.',
      note: '흘러넘치는 몫을 잊지 마세요. 테두리가 없는 면(테이블 상판, 트레이 바깥)은 부은 레진이 가장자리로 흘러 떨어지므로 계산값의 10~20%가 더 듭니다 — 테이프로 둑을 만들거나 아래에 받이를 두세요. 컵과 막대에 남는 몫으로 5~10%는 항상 더 계량합니다. 두껍게 한 번에 부으면 발열이 몰려 누렇게 변하거나 갈라지니 제품이 적어 둔 1회 최대 두께를 넘기지 마세요. 나무처럼 흡수하는 면은 첫 층이 스며들어 사라지므로, 얇게 한 번 씰링한 뒤 본 층을 붓습니다.' },
    en: { title: 'Resin Coverage Calculator', desc: 'Work out the resin volume and weight to coat an area at a given pour thickness.',
      long: 'Coating is area times thickness, and the only trap is units: square centimetres multiplied by millimetres have to be divided by 10 to land on cubic centimetres, which are millilitres. A 60 × 60 cm tray, 3,600 cm², at 3 mm takes 1,080 mL, or 1,188 g at a density of 1.1. Broad surfaces such as tabletops are rarely poured deeper than about 3 mm at once, so the thickness gets split into layers — enter one layer\'s thickness and repeat the pour rather than recalculating each time. Self-levelling resin evens itself out on a level surface, but half a degree of tilt thickens the low edge and starves the high one, so a spirit level matters more than the arithmetic.',
      note: 'Allow for what runs off. An unedged surface — a tabletop, the outside of a tray — loses resin over the sides, so budget 10–20% above the figure and either tape a dam or catch the drips. Always mix 5–10% extra for what clings to the cup and stick. Pouring the whole depth at once concentrates the exotherm and the slab yellows or cracks, so respect the maximum pour depth on the bottle. Porous surfaces such as bare wood drink the first coat, so seal them with a thin flood coat before the real layer.' },
  },
  {
    slug: 'resin-doming',
    icon: '🔶',
    category: '비누·수지',
    fields: [
      { key: 'd', term: 'diameter', unit: 'mm', def: 25, min: 0, step: 0.5 },
      { key: 'h', term: 'domeH', unit: 'mm', def: 3, min: 0, step: 0.1 },
      { key: 'n', term: 'count', unit: 'ea', def: 10, min: 0, step: 1 },
      { key: 'den', term: 'resinDensity', unit: 'gPerCm3', def: 1.1, min: 0.8, max: 1.6, step: 0.01 },
    ],
    formula: '{resinVol} = π × {domeH} × (3 × ({diameter} ÷ 2)² + {domeH}²) ÷ 6',
    compute: v => {
      const a = v.d / 2;
      const per = Math.PI * v.h * (3 * a * a + v.h * v.h) / 6 / 1000; // 구면 캡 부피(㎣ → ml)
      const n = Math.max(0, Math.floor(v.n));
      return [
        { term: 'resinVol', unit: 'ml', value: round(per, 2), digits: 2, primary: true },
        { term: 'total', unit: 'ml', value: round(per * n, 2), digits: 2 },
        { term: 'resinWeight', unit: 'gram', value: round(per * n * v.den, 1), digits: 1 },
      ];
    },
    ko: { title: '레진 돔 계산기', desc: '조각 지름과 돔 높이로 볼록하게 올리는 레진의 부피와 무게를 구합니다.',
      long: '돔은 원기둥이 아니라 구의 일부(구면 캡)입니다. 그래서 지름 × 높이로 곱하면 실제보다 많이 나옵니다 — 정확한 식은 πh(3a² + h²)/6이고 a는 반지름입니다. 지름 25mm 원판에 3mm 돔을 올리면 750㎣, 곧 0.75ml이고 열 개면 7.5ml, 밀도 1.1로 8.3g입니다. 돔 높이는 대개 지름의 8~12%가 자연스럽고(25mm면 2~3mm), 그보다 높이려 하면 표면장력이 버티지 못합니다. 표면장력이 이 계산의 전제입니다: 레진은 부어 놓은 자리에서 스스로 볼록한 렌즈를 만드는데, 그 높이는 계산으로 정하는 값이 아니라 점도와 표면장력이 정합니다. 그래서 이 결과는 "그 높이를 만들려면 몇 ml이 필요한가"이고, 실제로는 가장자리까지 채운 뒤 한 방울씩 올리며 눈으로 맞춥니다.',
      note: '돔은 흐릅니다. 가장자리에 모서리(립)가 없으면 레진이 옆으로 넘어 밑면까지 흘러내려 굳고, 그 자리를 갈아 내는 것은 다시 붓는 것보다 오래 걸립니다 — 뒷면에 테이프를 두르거나 립이 있는 베젤을 쓰세요. 점도가 낮은 레진(도밍용이 아닌 코팅용)은 아무리 조금 부어도 퍼져서 돔이 되지 않습니다. 기포는 붓기 전 30분 정도 두면 대부분 올라오고, 남은 것은 토치를 스치듯 지나가며 터뜨립니다 — 오래 대면 표면이 눌러 앉습니다.' },
    en: { title: 'Resin Doming Calculator', desc: 'Get the resin for a domed pour from the piece diameter and the dome height.',
      long: 'A dome is a slice of a sphere, not a cylinder, so multiplying diameter by height overstates it badly. The right formula is πh(3a² + h²)/6, with a as the radius. A 25 mm blank domed 3 mm high holds 750 mm³, which is 0.75 mL; ten of them is 7.5 mL, or 8.3 g at 1.1 g/cm³. A natural dome is roughly 8–12% of the diameter — 2–3 mm on a 25 mm piece — and pushing past that fails, because surface tension is the assumption underneath this calculation. Resin builds its own lens where you place it, and that height is set by viscosity and surface tension rather than by arithmetic. Treat the answer as "how much resin a dome that high contains", then fill to the rim and add drops by eye.',
      note: 'Domes run. Without a lip at the edge the resin creeps over the side, sets on the back, and grinding it off takes longer than pouring again — tape the underside or use a bezel with a rim. Low-viscosity resin sold for flood coats will simply spread instead of doming, however little you use. Let the mix stand about half an hour before pouring and most bubbles rise on their own; pass a torch quickly over what is left, because holding it there dents the surface.' },
  },
  {
    slug: 'resin-cups',
    icon: '🍯',
    category: '비누·수지',
    fields: [
      { key: 'w', term: 'resinWeight', unit: 'gram', def: 220, min: 0 },
      { key: 'n', term: 'colours', unit: 'ea', def: 3, min: 0, step: 1 },
      { key: 's', term: 'mainSharePct', unit: 'percent', def: 40, min: 0, max: 100, step: 1 },
    ],
    formula: '{mainCupWt} = {resinWeight} × {mainSharePct} ÷ 100, {cupWeight} = ({resinWeight} − {mainCupWt}) ÷ ({colours} − 1)',
    compute: v => {
      const n = Math.max(0, Math.floor(v.n));
      const even = ratio(v.w, n);
      const main = v.s > 0 ? v.w * v.s / 100 : even;
      // 주색 비율을 0으로 두면 전부 균등 분배로 되돌린다
      const others = v.s > 0 ? (n > 1 ? ratio(v.w - main, n - 1) : 0) : even;
      return [
        { term: 'mainCupWt', unit: 'gram', value: round(main, 1), digits: 1, primary: true },
        { term: 'cupWeight', unit: 'gram', value: round(others, 1), digits: 1 },
      ];
    },
    ko: { title: '레진 색 분배 계산기', desc: '전체 레진을 색 수에 맞춰 컵마다 몇 g씩 나눠 담을지 구합니다.',
      long: '색을 여러 개 쓰려면 레진을 컵에 나눠 담아야 하는데, 나누는 시점이 정해져 있습니다. A제와 B제를 완전히 섞은 뒤에 나눕니다. 220g을 세 색으로 균등하게 나누면 73.3g씩이고, 배경색을 40%로 크게 잡으면 88g에 나머지 두 색이 66g씩입니다. 주색 비율 칸을 0으로 두면 전부 균등 분배가 됩니다. 실제로는 균등한 경우가 드뭅니다 — 바탕이 되는 색이 절반 넘게 들어가고 강조색은 몇 g으로 끝나기 때문에, 배경 비율을 먼저 정하고 나머지를 쪼개는 편이 실제 배분에 맞습니다. 컵은 필요한 수보다 하나 더 준비하세요. 색을 섞다가 탁해지면 되돌릴 방법이 없고, 남겨 둔 무색 레진 몇 g이 그때 색을 살립니다.',
      note: '컵마다 완전히 섞은 뒤에 색소를 넣으세요. 색을 먼저 넣으면 A와 B가 다 섞였는지 눈으로 확인할 수 없고, 덜 섞인 컵은 그 컵만 끈적하게 남습니다. 나누는 데 쓰는 시간도 가동 시간(팟 라이프)에서 나갑니다 — 컵이 여섯 개면 마지막 컵은 이미 점도가 올라 있으니, 색이 많을 때는 한꺼번에 섞지 말고 두 번에 나눠 계량하세요. 옮길 때마다 컵 벽에 1~2g이 남아 실제로 부어지는 양은 계산보다 적습니다. 작은 컵은 밑면이 좁아 저울이 흔들리므로, 저울에 컵을 올린 뒤 영점을 잡고 한 컵씩 채웁니다.' },
    en: { title: 'Resin Colour Mixing Calculator', desc: 'Split a total resin weight into cups, one per colour, evenly or with a bigger base colour.',
      long: 'Working in several colours means dividing the resin into cups, and the order matters: combine A and B fully first, then split. Two hundred and twenty grams across three colours is 73.3 g each; give the base colour a 40% share and it becomes 88 g plus 66 g for each of the other two. Leaving the main share at zero returns an even split. Even splits are rare in practice — the background usually takes more than half while an accent needs only a few grams — so setting the base share first and dividing the rest matches how pieces actually get poured. Mix one more cup than you need: once a colour goes muddy there is no undoing it, and a few grams of clear resin held back is what rescues it.',
      note: 'Combine each cup fully before any pigment goes in. Tint first and you cannot see whether A and B actually married, and an under-mixed cup stays tacky on its own. The time spent decanting comes out of the pot life too: with six cups the last one is already thickening, so for many colours mix in two rounds rather than one. Every transfer leaves 1–2 g on the cup wall, so slightly less reaches the mould than the numbers say. Small cups have narrow bases that rock the scale — set the cup down, zero it, and fill one at a time.' },
  },
  {
    slug: 'silicone-ratio',
    icon: '🛢️',
    category: '비누·수지',
    fields: [
      { key: 'w', term: 'siliconeWt', unit: 'gram', def: 500, min: 0 },
      { key: 'a', term: 'mixRatioA', unit: 'none', def: 10, min: 0, step: 0.1 },
      { key: 'b', term: 'mixRatioB', unit: 'none', def: 1, min: 0, step: 0.1 },
    ],
    formula: '{partA} = {siliconeWt} × {mixRatioA} ÷ ({mixRatioA} + {mixRatioB})',
    compute: v => {
      const parts = v.a + v.b;
      const a = ratio(v.w * v.a, parts);
      return [
        { term: 'partA', unit: 'gram', value: round(a, 1), digits: 1, primary: true },
        { term: 'partB', unit: 'gram', value: round(parts > 0 ? v.w - a : 0, 1), digits: 1 },
        { term: 'catalystPct', unit: 'percent', value: round(ratio(v.b * 100, parts), 1), digits: 1 },
      ];
    },
    ko: { title: '실리콘 A:B 배합 계산기', desc: '실리콘 총 무게를 A:B 무게비로 갈라 각각 몇 g인지 구합니다.',
      long: '실리콘의 혼합비는 제품 계열이 갈라 놓습니다. 백금(플래티넘) 경화형은 대개 1:1이라 총량을 반으로 나누면 되고, 주석(틴) 경화형은 촉매를 조금만 쓰는 10:1이나 100:5(=20:1)입니다. 500g을 10:1로 하면 A 454.5g, B 45.5g이고 촉매는 전체의 9.1%입니다. 같은 500g을 1:1로 하면 250g씩, 촉매 50%로 완전히 다른 계량이 됩니다 — 통에 적힌 비율을 확인하지 않고 반으로 나누는 것이 가장 흔한 실수입니다. 여기서 쓰는 비율은 무게비입니다. 부피비를 함께 적어 둔 제품이 많으니 저울로 잴 때는 무게비 쪽을 보세요. 레진 혼합비 계산기와 계산은 같지만, 실리콘은 촉매가 한쪽으로 크게 쏠려 있어 소량을 만들 때 오차가 훨씬 위험합니다.',
      note: '촉매가 적은 쪽(B 45g 같은 값)에서 1g이 어긋나면 그것만으로 2% 오차입니다 — 0.1g까지 읽는 저울을 쓰고, B를 눈대중으로 떨어뜨리지 마세요. 부족하면 몰드 안쪽이 끈적하게 남아 벗겨지지 않고, 넘치면 빨리 굳어 다 붓기도 전에 흐르지 않습니다. 백금 경화형은 오염에 예민합니다 — 유황이 든 점토, 라텍스 장갑, 주석 경화형을 담았던 컵이 닿으면 그 부분만 영구히 굳지 않으므로, 원형이 의심스러우면 눈에 안 띄는 곳에 조금 시험해 보세요. 두 계열을 섞어 쓰는 것은 안 됩니다. 실리콘도 5%는 더 계량하세요 — 중간에 이어 부으면 그 자리가 갈라집니다.' },
    en: { title: 'Silicone Mixing Ratio Calculator', desc: 'Split a total silicone weight into part A and part B by weight.',
      long: 'The ratio depends on which family of silicone you have. Platinum (addition) cure is usually 1 : 1, so the total simply halves; tin (condensation) cure uses a small catalyst charge, typically 10 : 1 or 100 : 5, which is 20 : 1. Five hundred grams at 10 : 1 is 454.5 g of A and 45.5 g of B, with the catalyst at 9.1% of the batch. The same 500 g at 1 : 1 is 250 g each and a 50% catalyst share — a completely different weigh-out, which is why halving the total without reading the tin is the classic mistake. These are weight ratios; plenty of products print a volume ratio too, so use the weight figure when you work on a scale. The arithmetic matches the resin mix tool, but silicone is far less forgiving in small batches because the catalyst sits so heavily on one side.',
      note: 'When the catalyst side is only 45 g, being 1 g out is a 2% error on its own — use a scale reading to 0.1 g and never dose part B by eye. Short on catalyst and the mould stays tacky inside and will not release; long on it and the pot kicks before you have finished pouring. Platinum cure is also sensitive to contamination: sulphur-based clay, latex gloves, or a cup that held tin-cure will leave a permanently uncured patch, so test a hidden corner if you are unsure of the master. Never mix the two families. Weigh 5% extra as well — silicone poured in two goes splits along the join.' },
  },
];
