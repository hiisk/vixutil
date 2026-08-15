/**
 * 공예 섹션 — 비누·수지 (8종)
 *
 * 비누는 계산이 틀리면 다치는 몇 안 되는 공예다. 가성소다 양은 비누가 아니라
 * 오일이 정하는데, 오일마다 비누화값(SAP)이 달라서 "오일 500g에 소다 몇 g"이라는
 * 하나의 답이 없다. 그래서 SAP을 입력으로 드러내고 한 번에 한 가지 오일만
 * 계산한다 — 여러 오일을 섞은 레시피는 오일별로 구해서 더한다.
 *
 * SAP은 관습적으로 mg KOH/g으로 공표된다. 그래서 KOH는 단위만 맞추면(÷1000)
 * 되고, NaOH는 분자량 비율로 한 번 더 나눈다 — 56.1 × 1000 ÷ 40.0 = 1402.5가
 * 그 상수다. 상수를 이름 없이 코드에 박아 두면 나중에 아무도 못 되짚으므로
 * 여기 적어 둔다.
 *
 * 수지는 부피로 담고 무게로 섞는다. 몰드 부피를 밀도로 무게로 바꾼 뒤 A:B로
 * 가르는데, 같은 제품이 부피비와 무게비를 둘 다 적어 두는 일이 흔하다. 그래서
 * 이 섹션의 혼합비는 전부 무게비로 고정하고 문구에서 그 사실을 밝힌다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** SAP(mg KOH/g) → NaOH 환산 상수: KOH 56.1 g/mol × 1000 ÷ NaOH 40.0 g/mol */
const KOH_TO_NAOH = 1402.5;

export const SOAP_TOOLS: FormulaTool[] = [
  {
    slug: 'lye-naoh',
    icon: '⚗️',
    category: '비누·수지',
    fields: [
      { key: 'oil', term: 'oilWeight', unit: 'gram', def: 500, min: 1 },
      { key: 'sap', term: 'sapValue', unit: 'none', def: 190, min: 100, max: 300, step: 0.1 },
      { key: 'sf', term: 'superfat', unit: 'percent', def: 5, min: 0, max: 20, step: 0.5 },
    ],
    formula: '{lyeWeight} = {oilWeight} × {sapValue} ÷ 1402.5 × (1 − {superfat} ÷ 100)',
    compute: v => {
      const lye = v.oil * v.sap / KOH_TO_NAOH * (1 - v.sf / 100);
      const water = lye * 2; // 물:소다 2:1 — 흔히 쓰는 출발점, 비율은 따로 계산기가 있다
      return [
        { term: 'lyeWeight', unit: 'gram', value: round(lye, 1), digits: 1, primary: true },
        { term: 'waterWeight', unit: 'gram', value: round(water, 0), digits: 0 },
        { term: 'batchTotal', unit: 'gram', value: round(v.oil + lye + water, 0), digits: 0 },
      ];
    },
    ko: { title: '가성소다(NaOH) 계산기', desc: '오일 무게와 SAP 값으로 필요한 가성소다 양을 구합니다.',
      long: 'SAP 값은 오일 1g을 비누로 만드는 데 드는 수산화칼륨(KOH)의 mg 수로 공표됩니다. 가성소다로 쓰려면 1402.5로 나눕니다(KOH 56.1과 NaOH 40.0의 분자량 비율). 올리브오일은 SAP이 190이라 500g에 슈퍼팻 5%면 소다 64g입니다. SAP은 오일마다 다르므로 반드시 그 오일의 값을 쓰세요 — 이 계산기는 한 번에 한 가지 오일을 다루고, 여러 오일을 섞은 레시피는 오일별로 구해 더합니다. 물은 소다의 두 배를 기본으로 함께 보여줍니다.',
      note: '소다는 언제나 물에 소다를 넣습니다. 반대로 하면 순간적으로 끓어올라 튑니다. 보안경과 장갑을 끼고, 스테인리스나 HDPE 통을 쓰세요 — 알루미늄은 소다와 반응해 수소를 냅니다. 섞는 순간 스스로 80~90℃까지 오르니 유리컵이나 얇은 플라스틱은 쓰지 않습니다. 소다가 모자라면 굳지 않는 무른 비누가 되고, 넘치면 피부를 상하게 하는 비누가 됩니다.' },
    en: { title: 'Lye Calculator (NaOH)', desc: 'Turn an oil weight and its SAP value into the sodium hydroxide it needs.',
      long: 'SAP values are published as milligrams of potassium hydroxide per gram of oil, so using one for NaOH means dividing by 1402.5 — the molar ratio of KOH at 56.1 against NaOH at 40.0, scaled from milligrams. Olive oil has a SAP of 190, so 500 g at 5% superfat needs 64 g of lye. The value belongs to the oil, not to soap in general: this tool takes one oil at a time, and a blended recipe is worked oil by oil and the lye added up. Water is shown alongside at twice the lye as a starting point.',
      note: 'Lye goes into the water, never water into the lye — the wrong order can boil up and spit in seconds. Wear goggles and gloves, and mix in stainless steel or HDPE, never aluminium, which lye attacks and turns into hydrogen. The solution heats itself to 80–90°C on contact, so no glass and no thin plastic. Too little lye leaves a soft bar that never firms up; too much leaves a caustic one.' },
  },
  {
    slug: 'lye-koh',
    icon: '🧪',
    category: '비누·수지',
    fields: [
      { key: 'oil', term: 'oilWeight', unit: 'gram', def: 500, min: 1 },
      { key: 'sap', term: 'sapValue', unit: 'none', def: 190, min: 100, max: 300, step: 0.1 },
      { key: 'sf', term: 'superfat', unit: 'percent', def: 3, min: 0, max: 10, step: 0.5 },
      { key: 'p', term: 'lyePurity', unit: 'percent', def: 90, min: 50, max: 100 },
    ],
    formula: '{lyeWeight} = {oilWeight} × {sapValue} ÷ 1000 × (1 − {superfat} ÷ 100) ÷ ({lyePurity} ÷ 100)',
    compute: v => {
      const pure = v.oil * v.sap / 1000 * (1 - v.sf / 100);
      const lye = ratio(pure, Math.max(v.p, 1) / 100);
      const water = lye * 3; // 액체비누는 3:1로 묽게 잡는다
      return [
        { term: 'lyeWeight', unit: 'gram', value: round(lye, 1), digits: 1, primary: true },
        { term: 'waterWeight', unit: 'gram', value: round(water, 0), digits: 0 },
        { term: 'batchTotal', unit: 'gram', value: round(v.oil + lye + water, 0), digits: 0 },
      ];
    },
    ko: { title: '가성가리(KOH) 계산기', desc: '액체비누용 수산화칼륨 양을 순도까지 넣어 구합니다.',
      long: 'SAP이 이미 KOH 기준이라 1402.5로 나눌 필요가 없습니다 — mg을 g으로 바꾸는 1000만 나눕니다. 다만 KOH 플레이크는 습기를 먹어 대개 90% 순도로 팔리므로, 순수 필요량을 순도로 다시 나눠야 실제로 달아야 할 무게가 나옵니다. 오일 500g(SAP 190)에 슈퍼팻 3%, 순도 90%면 102g입니다. SAP은 오일마다 다르니 그 오일의 값을 쓰고, 섞은 레시피는 오일별로 구해 더하세요.',
      note: '여기서도 물에 소다를 넣습니다 — 반대로 하면 끓어 튑니다. 보안경과 장갑, 스테인리스나 HDPE 통을 쓰고 알루미늄은 피하세요. KOH는 NaOH보다 발열이 세서 순간 온도가 더 높이 오릅니다. 액체비누는 슈퍼팻을 0~3%로 낮게 잡습니다 — 남은 오일이 물에 풀리지 않아 비누물이 흐려지기 때문입니다. 소다가 모자라면 풀리지 않는 오일이 뜨고, 넘치면 pH가 높아 쓸 수 없습니다.' },
    en: { title: 'KOH Lye Calculator', desc: 'Work out potassium hydroxide for liquid soap, purity included.',
      long: 'SAP values are already quoted in KOH, so there is no 1402.5 here — only the 1000 that turns milligrams into grams. KOH flakes take up water from the air and are usually sold at 90% purity, so the pure requirement has to be divided by that purity to get the weight you actually put on the scale. Oil at 500 g and SAP 190, 3% superfat, 90% purity comes to 102 g. SAP still belongs to the oil, so blends are worked one oil at a time and summed.',
      note: 'Lye into the water here too — reversed, it boils and spits. Goggles, gloves, and a stainless or HDPE vessel; aluminium is attacked by lye. KOH runs hotter than NaOH, so the peak temperature is higher. Liquid soap keeps superfat low, 0–3%, because unsaponified oil will not dissolve and clouds the finished soap. Short on lye and free oil floats on top; long on lye and the pH climbs past usable.' },
  },
  {
    slug: 'water-lye-ratio',
    icon: '🪣',
    category: '비누·수지',
    fields: [
      { key: 'lye', term: 'lyeWeight', unit: 'gram', def: 65, min: 1 },
      { key: 'r', term: 'waterRatio', unit: 'times', def: 2, min: 0.8, max: 4, step: 0.1 },
      { key: 'oil', term: 'oilWeight', unit: 'gram', def: 500, min: 0 },
    ],
    formula: '{waterWeight} = {lyeWeight} × {waterRatio}',
    compute: v => {
      const r = Math.max(v.r, 0);
      const water = v.lye * r;
      return [
        { term: 'waterWeight', unit: 'gram', value: round(water, 0), digits: 0, primary: true },
        { term: 'concentration', unit: 'percent', value: round(ratio(100, 1 + r), 1), digits: 1 },
        { term: 'batchTotal', unit: 'gram', value: round(v.oil + v.lye + water, 0), digits: 0 },
      ];
    },
    ko: { title: '물:가성소다 비율 계산기', desc: '소다 무게와 물:소다 비율로 물 양과 소다액 농도를 구합니다.',
      long: '물은 소다를 녹여 오일에 고르게 퍼뜨리는 몫이라 비누화 반응에는 들어가지 않고, 굳고 건조되는 동안 날아갑니다. 그래서 양보다 농도가 중요합니다 — 2:1이면 소다액 농도가 33%, 1.5:1이면 40%로 진해집니다. 소다 65g에 2:1이면 물 130g이고, 오일 500g을 더해 반죽은 695g입니다.',
      note: '물을 많이 잡으면 반죽이 묽어 무늬 넣기는 쉽지만 굳는 데 오래 걸리고 건조 중 수축이 큽니다. 진한 소다액은 열이 더 세게 오르니 찬물로 시작하세요. 물 대신 얼음을 쓰더라도 얼음 무게를 물 무게에 포함해서 재야 합니다.' },
    en: { title: 'Water to Lye Ratio Calculator', desc: 'Turn a lye weight and a water : lye ratio into water and solution strength.',
      long: 'Water only carries the lye into the oils — it takes no part in saponification and leaves again while the bar cures. That makes the strength of the solution the number that matters: 2 : 1 is a 33% lye solution, 1.5 : 1 is 40%. Sixty-five grams of lye at 2 : 1 takes 130 g of water, and with 500 g of oil the batter comes to 695 g.',
      note: 'More water gives a thinner batter that is easier to swirl, but it takes longer to unmould and shrinks more as it cures. A stronger solution heats harder, so start with cold water. If you replace some water with ice, the ice still counts towards the water weight.' },
  },
  {
    slug: 'soap-batch-scale',
    icon: '🥣',
    category: '비누·수지',
    fields: [
      { key: 'oil', term: 'oilWeight', unit: 'gram', def: 500, min: 1 },
      { key: 'lye', term: 'lyeWeight', unit: 'gram', def: 65, min: 0 },
      { key: 'water', term: 'waterWeight', unit: 'gram', def: 130, min: 0 },
      { key: 's', term: 'recipeScale', unit: 'times', def: 1.5, min: 0.1, max: 20, step: 0.1 },
    ],
    // 좌변을 빼야 대입식이 "500 = 500 × 1.5"가 되지 않는다
    formula: '{oilWeight} × {recipeScale}',
    compute: v => {
      const s = Math.max(v.s, 0);
      return [
        { term: 'oilWeight', unit: 'gram', value: round(v.oil * s, 1), digits: 1, primary: true },
        { term: 'lyeWeight', unit: 'gram', value: round(v.lye * s, 1), digits: 1 },
        { term: 'waterWeight', unit: 'gram', value: round(v.water * s, 1), digits: 1 },
        { term: 'batchTotal', unit: 'gram', value: round((v.oil + v.lye + v.water) * s, 0), digits: 0 },
      ];
    },
    ko: { title: '비누 레시피 배율 계산기', desc: '레시피의 오일·소다·물을 원하는 배율로 한꺼번에 늘립니다.',
      long: '비누 레시피는 전부 비례해서 움직입니다 — 오일을 1.5배로 하면 소다와 물도 그대로 1.5배입니다. 배율은 몰드 부피로 잡으면 편합니다: 지금 쓰는 몰드가 1,200ml, 새 몰드가 1,800ml면 1.5배입니다. 오일 500g·소다 65g·물 130g 레시피를 1.5배로 하면 오일 750g, 소다 97.5g, 물 195g이 됩니다.',
      note: '소다를 처음부터 다시 계산하지 말고 배율만 곱하세요 — 오일 구성이 그대로면 SAP도 그대로입니다. 대신 양이 커지면 반죽이 열을 오래 붙들고 있어 굳는 속도가 빨라지고, 진한 색이나 향은 더 급하게 굳습니다. 오일 종류를 바꿨다면 배율이 아니라 SAP부터 다시 구해야 합니다.' },
    en: { title: 'Soap Recipe Resize Calculator', desc: 'Scale a recipe\'s oil, lye and water to a bigger or smaller batch.',
      long: 'Everything in a soap recipe moves together: 1.5× the oil is 1.5× the lye and 1.5× the water. Mould volume is the easy way to pick the factor — a 1,200 mL mould going to 1,800 mL is 1.5×. A recipe of 500 g oil, 65 g lye and 130 g water scaled by 1.5 becomes 750 g, 97.5 g and 195 g.',
      note: 'Do not recalculate the lye from scratch, just scale it — the SAP has not changed while the oils are the same. Do expect the behaviour to change: a bigger batch holds its heat longer and thickens faster, and strong colours or fragrances speed that up further. Swap an oil and it is the SAP, not the scale, that has to be redone.' },
  },
  {
    slug: 'resin-volume',
    icon: '🔷',
    category: '비누·수지',
    fields: [
      { key: 'w', term: 'boxW', unit: 'cm', def: 10, min: 0.1 },
      { key: 'd', term: 'boxD', unit: 'cm', def: 10, min: 0.1 },
      { key: 'h', term: 'boxH', unit: 'cm', def: 2, min: 0.1 },
      { key: 'den', term: 'resinDensity', unit: 'gPerCm3', def: 1.1, min: 0.8, max: 1.6, step: 0.01 },
    ],
    formula: '{resinWeight} = {boxW} × {boxD} × {boxH} × {resinDensity}',
    compute: v => {
      const vol = v.w * v.d * v.h; // 1㎤ = 1ml
      return [
        { term: 'resinWeight', unit: 'gram', value: round(vol * v.den, 0), digits: 0, primary: true },
        { term: 'mouldVol', unit: 'ml', value: round(vol, 0), digits: 0 },
      ];
    },
    ko: { title: '레진 소요량 계산기', desc: '사각 몰드 치수와 밀도로 부어야 할 레진 무게를 구합니다.',
      long: '사각 몰드는 가로 × 세로 × 깊이가 그대로 부피이고, 1㎤가 1ml입니다. 레진은 물보다 조금 무거워 에폭시가 1.1 g/㎤ 안팎이므로 10 × 10 × 2cm 코스터 몰드는 200ml, 220g입니다. 원형 몰드라면 지름의 절반을 제곱해 π를 곱한 값에 깊이를 곱하세요 — 어느 쪽이든 안쪽 치수로 재야 합니다.',
      note: '5~10%는 더 계량하세요. 컵과 막대에 남는 양이 생각보다 많고, 붓다가 모자라면 이어 부은 자리에 층이 보입니다. 한 번에 부을 수 있는 두께는 제품마다 정해져 있습니다(대개 5~10mm) — 깊은 몰드는 발열 때문에 나눠 부어야 하니 이 무게를 층 수로 나누세요.' },
    en: { title: 'Epoxy Resin Calculator', desc: 'Get the resin weight to mix from a rectangular mould and a density.',
      long: 'A rectangular mould is just width × depth × height, and one cubic centimetre is one millilitre. Resin runs a little heavier than water — epoxy sits around 1.1 g/cm³ — so a 10 × 10 × 2 cm coaster mould is 200 mL and 220 g. For a round mould, square half the diameter, multiply by π, then by the depth. Either way, measure the inside.',
      note: 'Mix 5–10% more than the answer. More clings to the cup and stick than you expect, and running short mid-pour leaves a visible line where the second batch met the first. Every resin also has a maximum pour depth, usually 5–10 mm: a deep mould has to be poured in layers, so divide this weight by the number of layers.' },
  },
  {
    slug: 'resin-mix',
    icon: '🥄',
    category: '비누·수지',
    fields: [
      { key: 'w', term: 'resinWeight', unit: 'gram', def: 220, min: 1 },
      { key: 'a', term: 'mixRatioA', unit: 'none', def: 2, min: 0.1, step: 0.1 },
      { key: 'b', term: 'mixRatioB', unit: 'none', def: 1, min: 0.1, step: 0.1 },
    ],
    formula: '{partA} = {resinWeight} × {mixRatioA} ÷ ({mixRatioA} + {mixRatioB})',
    compute: v => {
      const parts = v.a + v.b;
      const a = ratio(v.w * v.a, parts);
      return [
        { term: 'partA', unit: 'gram', value: round(a, 1), digits: 1, primary: true },
        { term: 'partB', unit: 'gram', value: round(parts > 0 ? v.w - a : 0, 1), digits: 1 },
      ];
    },
    ko: { title: '레진 혼합비 계산기', desc: '필요한 레진 총량을 A:B 비율로 나눕니다.',
      long: '2:1이면 총량을 세 몫으로 나눠 둘을 A제(레진), 하나를 B제(경화제)에 줍니다 — 220g이면 A 146.7g, B 73.3g입니다. 여기서 쓰는 비율은 무게비입니다. 같은 제품이 부피비 2:1과 무게비 100:45를 함께 적어 두는 일이 흔하니, 저울로 잴 때는 반드시 무게비 쪽을 보세요.',
      note: '비율을 틀리면 굳지 않습니다. 경화제를 더 넣어도 더 단단해지지 않고, 끈적한 채로 남거나 열이 몰려 갈라집니다. 0.1g까지 읽는 저울을 쓰고, 20g 이하 소량은 오차 비중이 커지므로 조금 넉넉히 계량해 나눠 쓰세요. 컵을 바꿔 옮기면 남은 양만큼 비율이 어긋납니다.' },
    en: { title: 'Resin Mix Ratio Calculator', desc: 'Split a total resin weight into part A and part B.',
      long: 'A 2 : 1 resin divides the total into three shares — two of resin, one of hardener — so 220 g is 146.7 g of A and 73.3 g of B. The ratio here is by weight. Products routinely print both, a 2 : 1 by volume alongside 100 : 45 by weight, so read the weight figure when you are working on a scale.',
      note: 'Off-ratio resin does not cure. Extra hardener does not make it harder; it stays tacky, or the heat concentrates and it cracks. Use a scale that reads to 0.1 g, and for small pours under about 20 g mix a little extra and pour from it, because the error weighs more than the resin does. Decanting into a second cup shifts the ratio by whatever stayed in the first.' },
  },
  {
    slug: 'resin-pigment',
    icon: '🎨',
    category: '비누·수지',
    fields: [
      { key: 'w', term: 'resinWeight', unit: 'gram', def: 220, min: 1 },
      { key: 'pct', term: 'pigmentPct', unit: 'percent', def: 3, min: 0, max: 10, step: 0.5 },
    ],
    formula: '{pigmentWt} = {resinWeight} × {pigmentPct} ÷ 100',
    compute: v => {
      const pig = v.w * v.pct / 100;
      return [
        { term: 'pigmentWt', unit: 'gram', value: round(pig, 2), digits: 2, primary: true },
        { term: 'totalBatch', unit: 'gram', value: round(v.w + pig, 1), digits: 1 },
      ];
    },
    ko: { title: '레진 색소 비율 계산기', desc: '레진 무게와 색소 비율로 넣을 색소 양을 구합니다.',
      long: '색소는 A제와 B제를 섞은 총 무게 기준으로 잡습니다. 220g에 3%면 6.6g입니다. 미카 파우더는 1~3%면 충분히 진하고, 액상 염료는 몇 방울(0.5% 안팎)로도 색이 납니다 — 투명하게 남기려면 0.5% 아래로 두세요.',
      note: '색소가 많으면 굳지 않습니다. 총량의 6%가 대체로 안전선이고, 그보다 넣으면 경화를 방해해 표면이 끈적하게 남습니다. A제와 B제를 완전히 섞은 뒤에 색소를 넣으세요 — 색을 먼저 넣으면 두 액이 다 섞였는지 눈으로 확인할 수 없습니다. 수채·아크릴처럼 물기가 있는 색소는 레진을 흐리게 만들고 경화를 늦춥니다.' },
    en: { title: 'Resin Pigment Calculator', desc: 'Turn a resin weight and a pigment load into grams of colour.',
      long: 'Pigment load is a percentage of the mixed total, resin plus hardener. Three per cent of 220 g is 6.6 g. Mica powder is already strong at 1–3%, and liquid dyes colour a batch with a few drops, around half a per cent — keep it under 0.5% if you want the piece to stay translucent.',
      note: 'Too much pigment stops the cure. About 6% of the total is the practical ceiling; past it the colour interferes with the reaction and the surface stays tacky. Add colour after A and B are fully combined — tint first and you cannot see whether the two parts actually mixed. Water-based colour such as watercolour or acrylic clouds the resin and slows the cure.' },
  },
  {
    slug: 'silicone-mould',
    icon: '🧊',
    category: '비누·수지',
    fields: [
      { key: 'box', term: 'containerVol', unit: 'ml', def: 500, min: 1 },
      { key: 'model', term: 'modelVol', unit: 'ml', def: 120, min: 0 },
      // 실리콘 밀도는 수지 밀도 칸을 그대로 쓴다 — 재료가 달라도 부피→무게는 같은 계산이다
      { key: 'den', term: 'resinDensity', unit: 'gPerCm3', def: 1.15, min: 0.8, max: 1.6, step: 0.01 },
    ],
    formula: '{siliconeWt} = ({containerVol} − {modelVol}) × {resinDensity}',
    compute: v => {
      const vol = Math.max(0, v.box - v.model);
      return [
        { term: 'siliconeWt', unit: 'gram', value: round(vol * v.den, 0), digits: 0, primary: true },
        { term: 'mouldVol', unit: 'ml', value: round(vol, 0), digits: 0 },
      ];
    },
    ko: { title: '실리콘 몰드 계산기', desc: '상자 부피에서 원형 부피를 빼 필요한 실리콘 양을 구합니다.',
      long: '실리콘은 상자에서 원형이 차지한 만큼을 뺀 나머지입니다. 원형 부피는 물을 담은 컵에 넣어 넘치는 물의 부피로 재면 정확합니다. 500ml 상자에 120ml 원형이면 실리콘은 380ml이고, 밀도 1.15로 437g입니다. 상자 부피는 안쪽 치수로 재세요 — 가로 × 세로 × 높이(cm)가 곧 ml입니다.',
      note: '원형과 상자 벽 사이는 최소 1cm 남기세요. 벽이 얇으면 몰드가 벌어져 레진이 새고 몇 번 쓰면 찢어집니다. 실리콘도 A:B로 섞으니 이 무게를 혼합비 계산기로 다시 나누고, 컵에 남는 몫으로 5%를 더하세요 — 실리콘은 중간에 이어 부으면 그 자리가 갈라집니다.' },
    en: { title: 'Silicone Mould Calculator', desc: 'Subtract the model from the box to find the silicone you need.',
      long: 'The silicone is whatever the model does not fill. The most reliable way to get the model volume is displacement: drop it into a full cup of water and measure what overflows. A 500 mL box around a 120 mL model needs 380 mL of silicone, which at a density of 1.15 is 437 g. Measure the box on the inside — width × depth × height in centimetres is millilitres.',
      note: 'Leave at least a centimetre of silicone between the model and the walls. Thin walls let the mould splay so resin leaks, and they tear after a few pours. Silicone is also an A : B mix, so run this weight through the mix ratio tool, and add 5% for what stays in the cup — a silicone pour joined halfway through splits at the join.' },
  },
];
