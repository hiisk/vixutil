/**
 * 공예 섹션 — 양초 두 번째 묶음 (8종)
 *
 * 앞의 여덟은 "왁스 몇 g"으로 끝났다. 여기 여덟은 그 왁스에 무엇을 얼마나
 * 섞고, 어디까지 채우고, 얼마에 파는지다.
 *
 * 왁스가 품을 수 있는 양에는 한계가 있고, 그 한계는 향료 혼자 쓰는 것이
 * 아니다. 염료·UV안정제·바이브레이션 첨가제가 모두 같은 자리를 나눠 쓴다.
 * 그래서 염료 도구도 향 비율을 함께 받아 둘을 합친 비율을 보여준다 — 향만 보고
 * 8%라 안심하다가 표면에 기름이 배는 일이 이 자리에서 생긴다.
 *
 * 소이는 굳으면서 꺼진다. 첫 붓기만으로 끝나지 않고 5~15%를 다시 부어 메우는데,
 * 그 몫을 미리 녹여 두지 않으면 두 번째 붓기 때 왁스 온도가 달라져 경계선이
 * 남는다. 그래서 2차 붓기를 따로 세는 도구를 둔다.
 *
 * 가격은 재료비에서 시작하지만 재료비로 끝나지 않는다. 여기 계산에는 실패한
 * 개수·포장·배송·수수료가 없다 — 그 사실을 숨기지 않고 적어 둔다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const CANDLE2_TOOLS: FormulaTool[] = [
  {
    slug: 'wax-topup',
    icon: '🔄',
    category: '양초',
    fields: [
      { key: 'fp', term: 'firstPour', unit: 'gram', def: 180, min: 1 },
      { key: 'sh', term: 'shrinkPct', unit: 'percent', def: 10, min: 0, max: 30, step: 0.5 },
    ],
    formula: '{topUpWt} = {firstPour} × {shrinkPct} ÷ 100',
    compute: v => {
      const top = v.fp * v.sh / 100;
      return [
        { term: 'topUpWt', unit: 'gram', value: round(top, 1), digits: 1, primary: true },
        { term: 'waxWeight', unit: 'gram', value: round(v.fp + top, 0), digits: 0 },
      ];
    },
    ko: { title: '2차 붓기 왁스 계산기', desc: '첫 붓기 무게와 수축률로 2차 붓기 양과 총 왁스를 구합니다.',
      long: '소이는 굳으면서 심지 주변이 꺼지고 표면에 구멍이 생깁니다. 첫 붓기 180g에 수축률 10%면 18g을 다시 부어 메우게 되므로, 처음부터 198g을 녹여 둡니다. 수축률은 왁스와 용기, 식는 속도가 함께 정하는 값이라 같은 왁스도 유리병과 양철 캔이 다릅니다.',
      note: '2차 붓기는 첫 층이 굳은 뒤에 하고, 온도는 첫 붓기보다 5~10도 낮게 잡습니다. 뜨거운 왁스를 부으면 첫 층까지 녹아 다시 꺼집니다. 남긴 왁스를 냄비에 그대로 두고 다시 데우면 향이 날아가므로, 2차 붓기 몫은 따로 덜어 두는 편이 낫습니다.' },
    en: { title: 'Second Pour Wax Calculator', desc: 'Top-up pour weight and total wax to melt from a shrinkage figure.',
      long: 'Soy sinks around the wick as it sets and leaves a hole in the surface. A 180 g first pour at 10% shrinkage takes 18 g to fill, so melt 198 g from the start. Shrinkage depends on the wax, the vessel and how fast it cools — the same wax behaves differently in glass and in a tin.',
      note: 'Do the top-up once the first layer has set, and pour it 5–10 °C cooler than the first. Wax poured hot remelts the layer below and sinks again. Reheating the leftover in the pot drives the fragrance off, so it is better to set the top-up portion aside separately.' },
  },
  {
    slug: 'candle-dye-load',
    icon: '🎨',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 500, min: 1 },
      { key: 'dp', term: 'waxDyePct', unit: 'percent', def: 0.5, min: 0, max: 5, step: 0.1 },
      { key: 'fp', term: 'fragrancePct', unit: 'percent', def: 8, min: 0, max: 20, step: 0.5 },
    ],
    formula: '{waxDyeWt} = {waxWeight} × {waxDyePct} ÷ 100',
    compute: v => [
      { term: 'waxDyeWt', unit: 'gram', value: round(v.wax * v.dp / 100, 2), digits: 2, primary: true },
      { term: 'fragranceWt', unit: 'gram', value: round(v.wax * v.fp / 100, 1), digits: 1 },
      { term: 'totalLoadPct', unit: 'percent', value: round(v.dp + v.fp, 1), digits: 1 },
    ],
    ko: { title: '양초 염료 비율 계산기', desc: '왁스 무게와 염료 비율로 염료 양과 전체 첨가 비율을 구합니다.',
      long: '염료는 왁스 무게 기준으로 0.1~1%가 보통입니다. 500g에 0.5%면 2.5g, 염료 블록으로 치면 손톱만 한 조각입니다. 향료 8%를 함께 넣으면 왁스가 품는 것이 8.5%가 되는데, 왁스 설명서의 허용치는 이 합계와 비교해야 하는 숫자입니다.',
      note: '염료와 향료는 왁스가 품을 수 있는 같은 자리를 나눠 씁니다. 향을 최대치까지 넣은 상태에서 색을 진하게 올리면 표면에 기름이 배거나 심지가 막힙니다. 크레용은 쓰지 마세요 — 안료 입자가 녹지 않고 심지에 걸려 불꽃이 죽습니다. 유색 왁스는 굳으면 한 톤 밝아지므로 녹은 상태의 색으로 판단하지 마세요.' },
    en: { title: 'Candle Dye Calculator', desc: 'Dye weight from a wax weight and dye percentage, with the combined load.',
      long: 'Dye normally runs 0.1–1% of the wax weight. Half a per cent of 500 g is 2.5 g — a fingernail-sized piece of a dye block. Add 8% fragrance and the wax is carrying 8.5% in total, and it is that total the manufacturer\'s maximum load has to be compared against.',
      note: 'Dye and fragrance compete for the same capacity in the wax. Deepening the colour while the fragrance is already at maximum leaves oil weeping on the surface or clogs the wick. Do not use wax crayons — the pigment particles do not dissolve and choke the wick. Coloured wax lightens a shade as it sets, so judge the colour cold, not molten.' },
  },
  {
    slug: 'wax-blend',
    icon: '🥣',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 1000, min: 1 },
      { key: 'pa', term: 'percentA', unit: 'percent', def: 70, min: 0, max: 100, step: 1 },
    ],
    formula: '{waxA} = {waxWeight} × {percentA} ÷ 100,  {waxB} = {waxWeight} − {waxA}',
    compute: v => {
      const a = v.wax * v.pa / 100;
      return [
        { term: 'waxA', unit: 'gram', value: round(a, 0), digits: 0, primary: true },
        { term: 'waxB', unit: 'gram', value: round(v.wax - a, 0), digits: 0 },
        { term: 'percentB', unit: 'percent', value: round(100 - v.pa, 0), digits: 0 },
      ];
    },
    ko: { title: '왁스 블렌딩 계산기', desc: '전체 무게와 A 왁스 비율로 두 왁스의 무게를 나눕니다.',
      long: '단단한 왁스와 무른 왁스를 섞어 원하는 성질을 맞춥니다. 1kg을 7:3으로 섞으면 A가 700g, B가 300g입니다. 컨테이너용 소이에 파라핀이나 비즈왁스를 10~30% 섞으면 표면이 매끈해지고 향이 더 오래 남지만, 비즈왁스를 넣으면 융점이 올라가 심지를 한 단계 굵게 바꿔야 합니다.',
      note: '섞은 왁스는 두 왁스의 성질 사이에 놓이지만 융점처럼 단순 비례하는 값은 아닙니다. 비율을 정했으면 그 비율로 한 개를 만들어 이틀 굳히고 태워 보세요 — 배합을 바꿀 때마다 심지 시험을 다시 해야 합니다. 소이와 파라핀은 굳는 속도가 달라 경계에 얼룩(프로스팅)이 남을 수 있습니다.' },
    en: { title: 'Wax Blend Calculator', desc: 'Split a total wax weight between two waxes at a chosen ratio.',
      long: 'Blending a hard wax with a soft one tunes the properties. A kilo at 7:3 is 700 g of A and 300 g of B. Adding 10–30% paraffin or beeswax to a container soy smooths the top and holds fragrance longer, but beeswax raises the melt point, which usually means going up one wick size.',
      note: 'A blend sits between its two waxes, though values like melt point do not scale in a straight line. Once the ratio is set, pour one candle, cure it two days and burn it — every change of blend needs the wick tested again. Soy and paraffin set at different rates, so the boundary can frost or mottle.' },
  },
  {
    slug: 'layer-pour',
    icon: '🎂',
    category: '양초',
    fields: [
      { key: 'vol', term: 'containerVol', unit: 'ml', def: 200, min: 1 },
      { key: 'n', term: 'waxLayers', unit: 'none', def: 3, min: 1, max: 10, step: 1 },
      { key: 'fill', term: 'fillPct', unit: 'percent', def: 90, min: 10, max: 100 },
      { key: 'd', term: 'waxDensity', unit: 'gPerCm3', def: 0.9, min: 0.5, max: 1.2, step: 0.01 },
    ],
    formula: '{waxPerLayer} = {containerVol} × {fillPct} ÷ 100 × {waxDensity} ÷ {waxLayers}',
    compute: v => {
      const usable = v.vol * v.fill / 100;
      const perLayerVol = ratio(usable, v.n);
      return [
        { term: 'waxPerLayer', unit: 'gram', value: round(perLayerVol * v.d, 1), digits: 1, primary: true },
        { term: 'waxWeight', unit: 'gram', value: round(usable * v.d, 0), digits: 0 },
        { term: 'layerVol', unit: 'ml', value: round(perLayerVol, 0), digits: 0 },
      ];
    },
    ko: { title: '레이어 양초 계산기', desc: '용기 부피와 층 수로 한 층에 붓는 왁스 무게를 구합니다.',
      long: '200ml 용기를 90%까지 채우면 180ml, 한 개에 162g입니다. 세 층으로 나누면 한 층이 60ml, 54g입니다. 층 두께를 다르게 하려면 이 값을 기준으로 층마다 비율을 곱해 나누세요 — 아래를 두껍게 두면 무게 중심이 낮아 보기에 안정적입니다.',
      note: '다음 층은 앞 층 표면이 굳어 손으로 눌러 자국이 남지 않을 때 붓습니다. 덜 굳은 층에 부으면 색이 섞여 경계가 흐려지고, 완전히 식힌 뒤 부으면 층끼리 붙지 않아 태울 때 갈라집니다. 층마다 향을 다르게 넣는 것은 권하지 않습니다 — 타는 동안 아래 층 향까지 함께 데워져 섞입니다.' },
    en: { title: 'Layered Candle Calculator', desc: 'Wax per layer and per candle for a layered pour.',
      long: 'A 200 ml vessel filled to 90% holds 180 ml, or 162 g of wax. Split into three layers that is 60 ml and 54 g each. For uneven layers, take this figure and apply a ratio to each — a thicker bottom layer puts the visual weight low and looks steadier.',
      note: 'Pour the next layer when the surface below has set enough that a finger leaves no mark. Pour onto a soft layer and the colours bleed; pour onto a fully cold one and the layers do not bond, so they split when burned. Different fragrances per layer are a poor idea — the burn warms the layers below and mixes them anyway.' },
  },
  {
    slug: 'container-fill-height',
    icon: '📏',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 180, min: 1 },
      { key: 'd', term: 'vesselD', unit: 'cm', def: 7, min: 0.5, step: 0.1 },
      { key: 'dens', term: 'waxDensity', unit: 'gPerCm3', def: 0.9, min: 0.5, max: 1.2, step: 0.01 },
    ],
    formula: '{waxHeight} = {waxWeight} ÷ {waxDensity} ÷ (π × ({vesselD} ÷ 2)²)',
    compute: v => {
      const vol = ratio(v.wax, v.dens);
      const area = Math.PI * (v.d / 2) ** 2;
      return [
        { term: 'waxHeight', unit: 'cm', value: round(ratio(vol, area), 1), digits: 1, primary: true },
        { term: 'containerVol', unit: 'ml', value: round(vol, 0), digits: 0 },
        { term: 'baseArea', unit: 'cm2', value: round(area, 1), digits: 1 },
      ];
    },
    ko: { title: '왁스 높이 계산기', desc: '왁스 무게와 용기 안지름으로 왁스가 차는 높이를 구합니다.',
      long: '180g을 밀도 0.9로 나누면 200ml, 안지름 7cm의 바닥 면적은 38.5㎠이므로 왁스는 5.2cm 높이까지 찹니다. 이 높이를 알아야 심지 탭이 왁스에 잠기는지, 라벨 위쪽 선을 넘지 않는지 붓기 전에 확인할 수 있습니다.',
      note: '심지 탭은 두께 3~6mm입니다. 왁스가 그보다 얕으면 탭이 드러나 마지막에 열이 유리 바닥으로 몰립니다. 아래가 좁아지는 용기는 이 값보다 높이 차고, 각진 용기는 지름 대신 한 변으로 넣으면 실제보다 낮게 나옵니다. 라벨은 왁스 높이의 아래쪽에 붙이세요 — 왁스 표면 위에 걸치면 태우는 동안 열로 들뜹니다.' },
    en: { title: 'Candle Fill Height Calculator', desc: 'How high a wax weight sits in a vessel of a given inside diameter.',
      long: 'Dividing 180 g by a density of 0.9 gives 200 ml, and a 7 cm inside diameter has a base area of 38.5 cm², so the wax stands 5.2 cm high. Knowing that height before pouring is how you check the wick tab is covered and the fill stays below the top of the label.',
      note: 'Wick tabs are 3–6 mm thick; wax shallower than that leaves the tab exposed and drives the last of the heat into the glass base. A tapered vessel fills higher than this, and entering a side length instead of a diameter for a square vessel reads low. Set the label below the wax line — a label sitting above the surface lifts as the candle warms.' },
  },
  {
    slug: 'fragrance-max',
    icon: '💦',
    category: '양초',
    fields: [
      { key: 'wax', term: 'waxWeight', unit: 'gram', def: 500, min: 1 },
      { key: 'mp', term: 'maxFragrancePct', unit: 'percent', def: 10, min: 0, max: 20, step: 0.5 },
      { key: 'fp', term: 'fragrancePct', unit: 'percent', def: 8, min: 0, max: 20, step: 0.5 },
    ],
    formula: '{maxFragranceWt} = {waxWeight} × {maxFragrancePct} ÷ 100,  {fragranceHeadroom} = ({maxFragrancePct} − {fragrancePct}) × {waxWeight} ÷ 100',
    compute: v => [
      { term: 'maxFragranceWt', unit: 'gram', value: round(v.wax * v.mp / 100, 1), digits: 1, primary: true },
      { term: 'fragranceWt', unit: 'gram', value: round(v.wax * v.fp / 100, 1), digits: 1 },
      { term: 'fragranceHeadroom', unit: 'gram', value: round(v.wax * (v.mp - v.fp) / 100, 1), digits: 1 },
    ],
    ko: { title: '최대 향 허용치 계산기', desc: '왁스의 허용 비율로 넣을 수 있는 향료 한계와 남은 여유를 구합니다.',
      long: '왁스 설명서에 적힌 최대 허용치가 10%라면 500g에 넣을 수 있는 향료는 50g입니다. 8%로 잡아 40g을 넣으면 10g이 남습니다. 남은 여유는 향료만의 몫이 아니라 염료와 다른 첨가제가 함께 나눠 쓰는 자리입니다.',
      note: '여유가 음수로 나오면 이미 허용치를 넘긴 것입니다. 넘긴 향료는 왁스에 붙지 않고 굳은 표면으로 배어 나오거나 바닥에 고이고, 심지를 적셔 불꽃이 커집니다. 허용치를 채워도 향이 약하다면 비율이 아니라 향료 종류·넣는 온도·숙성 기간을 보세요 — 소이는 1~2주 숙성해야 향이 제대로 납니다.' },
    en: { title: 'Maximum Fragrance Load Calculator', desc: 'The oil ceiling for a wax and how much headroom your planned load leaves.',
      long: 'If the wax states a 10% maximum, 500 g can carry 50 g of oil. Planning 8% puts in 40 g and leaves 10 g of headroom. That headroom is not reserved for fragrance alone — dye and any other additive share the same allowance.',
      note: 'A negative headroom means the ceiling is already passed. Oil beyond it does not bind: it weeps out of the set surface or pools at the bottom, and it wicks up to give an oversized flame. If the candle still smells weak at maximum load, the answer is the oil, the adding temperature or the cure rather than the percentage — soy needs one to two weeks to throw properly.' },
  },
  {
    slug: 'candle-price',
    icon: '💰',
    category: '양초',
    fields: [
      { key: 'c', term: 'unitCost', unit: 'money', def: 4000, min: 0 },
      { key: 'm', term: 'marginRate', unit: 'percent', def: 60, min: 0, max: 90, step: 1 },
      { key: 'p', term: 'salePrice', unit: 'money', def: 9000, min: 0 },
    ],
    formula: '{finalPrice} = {unitCost} ÷ (1 − {marginRate} ÷ 100),  {marginAtPrice} = ({salePrice} − {unitCost}) ÷ {salePrice} × 100',
    compute: v => [
      { term: 'finalPrice', unit: 'money', value: round(ratio(v.c, 1 - v.m / 100), 0), digits: 0, primary: true },
      { term: 'marginAtPrice', unit: 'percent', value: round(ratio(v.p - v.c, v.p) * 100, 1), digits: 1 },
      { term: 'profit', unit: 'money', value: round(v.p - v.c, 0), digits: 0 },
    ],
    ko: { title: '양초 판매가 계산기', desc: '재료비와 목표 이익률로 판매가를, 정한 값으로 실제 이익률을 구합니다.',
      long: '이익률은 판매가를 기준으로 셉니다. 재료비 4,000원에 60%를 남기려면 4,000 ÷ (1 − 0.6) = 10,000원입니다. 재료비를 4,000원에 60%를 얹어 6,400원으로 매기면 이익률은 60%가 아니라 37.5%입니다. 9,000원에 팔면 이익은 5,000원, 이익률은 55.6%입니다.',
      note: '여기 들어간 것은 재료비뿐입니다. 실패해서 버린 개수, 포장과 완충재, 배송비, 플랫폼 수수료(대개 판매가의 3~10%), 사진과 라벨에 든 시간은 전부 빠져 있습니다. 도매를 함께 한다면 도매가가 이 재료비의 두 배는 되어야 소매가를 무너뜨리지 않습니다.' },
    en: { title: 'Candle Pricing Calculator', desc: 'Selling price from a target margin, and the margin a chosen price actually gives.',
      long: 'Margin is measured against the selling price. To keep 60% on a 4,000 material cost the price is 4,000 ÷ (1 − 0.6) = 10,000. Adding 60% to the cost instead gives 6,400, which is a 37.5% margin, not 60%. Selling at 9,000 leaves 5,000 of profit and a 55.6% margin.',
      note: 'Only materials are in this figure. Failed pours, packaging and void fill, postage, platform fees (commonly 3–10% of the price) and the hours spent on photos and labels are all outside it. If you also sell wholesale, the wholesale price needs to be at least twice this material cost for the retail price to survive.' },
  },
  {
    slug: 'candles-from-wax',
    icon: '🪔',
    category: '양초',
    fields: [
      { key: 'st', term: 'waxStock', unit: 'gram', def: 5000, min: 1 },
      { key: 'per', term: 'waxWeight', unit: 'gram', def: 180, min: 1 },
      { key: 'loss', term: 'meltLossPct', unit: 'percent', def: 5, min: 0, max: 20, step: 0.5 },
    ],
    formula: '{candleCount} = ⌊{waxStock} × (1 − {meltLossPct} ÷ 100) ÷ {waxWeight}⌋',
    compute: v => {
      const lost = v.st * v.loss / 100;
      const usable = v.st - lost;
      const n = Math.floor(ratio(usable, v.per));
      return [
        { term: 'candleCount', unit: 'candle', value: n, digits: 0, primary: true },
        { term: 'leftoverWax', unit: 'gram', value: round(usable - n * v.per, 0), digits: 0 },
        { term: 'waxLoss', unit: 'gram', value: round(lost, 0), digits: 0 },
      ];
    },
    ko: { title: '왁스로 만들 개수 계산기', desc: '가진 왁스로 정해진 크기 양초를 몇 개 만들 수 있는지 구합니다.',
      long: '5kg 한 봉지에서 냄비와 주둥이에 남는 5%를 빼면 실제로 쓰는 것은 4,750g입니다. 한 개에 180g이면 26개가 나오고 70g이 남습니다. 남는 70g은 다음 배치에 합치거나 왁스 멜트로 만드세요 — 한 개 몫이 안 되는 양이 매번 남습니다.',
      note: '향료는 이 셈에 들어 있지 않습니다. 향은 왁스 무게 위에 얹히는 것이므로 개수를 줄이지 않지만, 향료값은 따로 듭니다. 손실률은 배치 크기에 따라 달라집니다 — 5kg을 한 번에 녹이면 5%면 넉넉하지만, 500g씩 열 번 녹이면 냄비에 남는 몫이 그대로 열 번이라 10%를 넘어갑니다.' },
    en: { title: 'How Many Candles From Wax Calculator', desc: 'How many candles of a given size a quantity of wax will make.',
      long: 'Take a 5 kg bag, lose 5% to the pot and the jug, and 4,750 g is what actually gets poured. At 180 g each that is 26 candles with 70 g left. Combine the 70 g into the next batch or pour it as a wax melt — something short of one candle is left over every time.',
      note: 'Fragrance is not in this count. Oil is added on top of the wax weight, so it does not reduce the number of candles, but it is a separate cost. The loss percentage depends on batch size: 5% is generous for melting 5 kg at once, but melting 500 g ten times leaves the same residue ten times over and pushes past 10%.' },
  },
];
