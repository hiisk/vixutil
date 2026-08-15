/**
 * 도형 - 생활 계산 둘째 묶음 (14종)
 *
 * 집을 고치거나 마당을 손볼 때 자재를 몇 개 사야 하는지 세는 계산들. 도형
 * 공식이 그대로 쓰이지만 손실률과 규격 단위 때문에 한 단계가 더 붙는다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;

export const PRACTICAL2_TOOLS: FormulaTool[] = [
  {
    slug: 'carpet-area',
    icon: '🧶',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'm', def: 4.2, min: 0 },
      { key: 'd', term: 'widthCm', unit: 'm', def: 3.6, min: 0 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{carpetArea} = {lengthCm} × {widthCm} × (1 + {extraPct} ÷ 100)',
    compute: v => {
      const base = v.w * v.d;
      return [
        { term: 'carpetArea', unit: 'm2', value: round(base * (1 + v.extra / 100), 2), digits: 2, primary: true },
        { term: 'area', unit: 'm2', value: round(base, 2), digits: 2 },
        { term: 'pyeong', unit: 'none', value: round(base / 3.3058, 2), digits: 2 },
      ];
    },
    ko: { title: '카펫·장판 소요 면적 계산기', desc: '방 크기와 여유율로 사야 할 면적을 구합니다.',
      long: '바닥 면적에 재단 손실을 더합니다. 무늬가 없으면 5~10%, 사선으로 깔거나 무늬를 맞춰야 하면 15~20%를 봅니다. 평수도 함께 보여 줍니다.',
      note: '방이 완전한 직사각형인 경우가 드뭅니다. 가장 긴 쪽으로 재고, 문턱과 붙박이장 아래까지 셀지 먼저 정하세요.' },
    en: { title: 'Carpet & Flooring Area', desc: 'How much to buy, room size plus a waste allowance.',
      long: 'Add cutting waste to the floor area: 5–10% for plain material, 15–20% if you lay on the diagonal or match a pattern.',
      note: 'Rooms are rarely true rectangles. Measure the longest span and decide up front whether to include thresholds and the space under fitted units.' },
  },
  {
    slug: 'fence-posts',
    icon: '🪵',
    category: '생활 계산',
    fields: [
      { key: 'len', term: 'fenceLen', unit: 'm', def: 24, min: 0 },
      { key: 'gap', term: 'postGap', unit: 'm', def: 2.4, min: 0.1 },
    ],
    formula: '{postCount} = {fenceLen} ÷ {postGap} + 1',
    compute: v => {
      const spans = Math.ceil(ratio(v.len, v.gap));
      return [
        { term: 'postCount', unit: 'piece', value: spans + 1, digits: 0, primary: true },
        { term: 'count', unit: 'piece', value: spans, digits: 0 },
        { term: 'postGap', unit: 'm', value: round(ratio(v.len, spans), 3), digits: 3 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `기둥 ${out[0].value}개, 사이 칸 ${out[1].value}개입니다. 실제 간격은 ${out[2].value}m로 고르게 나눠집니다.`,
      en: `${out[0].value} posts for ${out[1].value} spans, giving an even ${out[2].value} m spacing.`,
      l10n: { es: `${out[0].value} postes para ${out[1].value} vanos, con una separación pareja de ${out[2].value} m.`, 'pt-br': `${out[0].value} mourões para ${out[1].value} vãos, com espaçamento parelho de ${out[2].value} m.`, ja: `支柱${out[0].value}本、区間${out[1].value}個です。実際の間隔は${out[2].value}mで均等に割り切れます。`, de: `${out[0].value} Pfosten für ${out[1].value} Felder, das ergibt gleichmäßige ${out[2].value} m Abstand.`, fr: `${out[0].value} poteaux pour ${out[1].value} travées, soit un écart régulier de ${out[2].value} m.`, hi: `${out[1].value} खंडों के लिए ${out[0].value} खंभे, और असली दूरी बराबर ${out[2].value} मीटर बैठती है।` },
      tone: 'good',
    }),
    ko: { title: '울타리 기둥 개수 계산기', desc: '전체 길이와 간격으로 필요한 기둥 수를 구합니다.',
      long: '칸의 수는 길이를 간격으로 나눈 값이지만 기둥은 그보다 하나 많습니다. 양쪽 끝에도 기둥이 서기 때문입니다. 이 "하나 더"를 빼먹는 것이 자재 계산에서 가장 흔한 실수입니다.',
      note: '원형으로 둘러싸는 경우에는 시작과 끝이 같은 기둥이라 칸 수와 기둥 수가 같습니다.' },
    en: { title: 'Fence Post Count', desc: 'Posts needed from the total run and the spacing.',
      long: 'The number of spans is length over spacing, but you need one more post than that, because both ends carry a post. Forgetting that extra one is the classic materials mistake.',
      note: 'For a fence that closes in a loop, the start and end share a post, so posts equal spans.' },
  },
  {
    slug: 'gravel-weight',
    icon: '🪨',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'm', def: 5, min: 0 },
      { key: 'd', term: 'widthCm', unit: 'm', def: 3, min: 0 },
      { key: 'depth', term: 'gravelDepth', unit: 'cm', def: 8, min: 0 },
    ],
    formula: '{volume} = {lengthCm} × {widthCm} × {gravelDepth} ÷ 100',
    compute: v => {
      const m3 = v.w * v.d * (v.depth / 100);
      return [
        { term: 'volume', unit: 'm3', value: round(m3, 3), digits: 3, primary: true },
        { term: 'gravelWeight', unit: 'ton', value: round(m3 * 1.6, 3), digits: 3 },
        { term: 'weightKg', unit: 'kg', value: Math.round(m3 * 1600), digits: 0 },
      ];
    },
    ko: { title: '자갈·모래 부피와 무게 계산기', desc: '깔 면적과 두께로 필요한 부피와 무게를 구합니다.',
      long: '면적에 두께를 곱하면 부피이고, 자갈은 ㎥당 약 1.6톤입니다. 자재는 무게로 파는 경우가 많아 부피만으로는 주문이 안 됩니다.',
      note: '자갈 1.6, 마른 모래 1.5, 젖은 모래 1.9, 흙 1.3 정도로 밀도가 다릅니다. 깔고 다지면 두께가 10~15% 줍니다.' },
    en: { title: 'Gravel & Sand Volume and Weight', desc: 'Volume and tonnage from the area and layer depth.',
      long: 'Area times depth is the volume, and gravel runs about 1.6 tonnes per cubic metre. Suppliers usually sell by weight, so volume alone will not place the order.',
      note: 'Densities differ: gravel 1.6, dry sand 1.5, wet sand 1.9, topsoil about 1.3. Compaction takes another 10–15% off the depth.' },
  },
  {
    slug: 'pool-fill-time',
    icon: '🏊',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'm', def: 8, min: 0 },
      { key: 'd', term: 'widthCm', unit: 'm', def: 4, min: 0 },
      { key: 'h', term: 'depthCm', unit: 'm', def: 1.2, min: 0 },
      { key: 'flow', term: 'flowLpm', def: 20, min: 0.1 },
    ],
    formula: '{fillHours} = {lengthCm} × {widthCm} × {depthCm} × 1000 ÷ {flowLpm} ÷ 60',
    compute: v => {
      const liters = v.w * v.d * v.h * 1000;
      return [
        { term: 'liters', unit: 'liter', value: Math.round(liters), digits: 0, primary: true },
        { term: 'fillHours', unit: 'hour', value: round(ratio(liters, v.flow * 60), 2), digits: 2 },
        { term: 'weightT', unit: 'ton', value: round(liters / 1000, 2), digits: 2 },
      ];
    },
    ko: { title: '수영장·물탱크 채우는 시간 계산기', desc: '크기와 수압으로 물 양과 채우는 시간을 구합니다.',
      long: '부피 1㎥는 물 1,000L이고 무게로는 1톤입니다. 분당 유량으로 나누고 60으로 나누면 시간이 나옵니다. 물 무게는 바닥 하중을 볼 때도 필요합니다.',
      note: '가정용 수도는 분당 15~25L 정도 나옵니다. 여러 곳에서 동시에 쓰면 그만큼 줄어듭니다.' },
    en: { title: 'Pool & Tank Fill Time', desc: 'Water volume and fill time from size and flow rate.',
      long: 'One cubic metre is 1,000 litres and weighs a tonne. Divide by the flow per minute, then by sixty, for hours. The weight matters for floor loading too.',
      note: 'A domestic tap delivers roughly 15–25 litres a minute, less if other outlets are running.' },
  },
  {
    slug: 'deck-boards',
    icon: '🪚',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'm', def: 4, min: 0 },
      { key: 'd', term: 'widthCm', unit: 'm', def: 3, min: 0 },
      { key: 'bw', term: 'boardWidth', unit: 'cm', def: 14, min: 1 },
      { key: 'gap', term: 'postGap', unit: 'cm', def: 0.5, min: 0 },
    ],
    formula: '{boardCount} = {widthCm} × 100 ÷ ({boardWidth} + {postGap})',
    compute: v => {
      const per = v.bw + v.gap;
      const n = Math.ceil(ratio(v.d * 100, per));
      return [
        { term: 'boardCount', unit: 'piece', value: n, digits: 0, primary: true },
        { term: 'result', unit: 'm', value: round(n * v.w, 1), digits: 1 },
        { term: 'area', unit: 'm2', value: round(v.w * v.d, 2), digits: 2 },
      ];
    },
    ko: { title: '데크 판재 개수 계산기', desc: '데크 크기와 판재 폭으로 필요한 판 수와 총 길이를 구합니다.',
      long: '판재 폭에 배수 간격을 더한 값이 한 줄이 차지하는 폭입니다. 데크의 짧은 쪽을 그 값으로 나누면 줄 수가 나오고, 줄 수에 데크 길이를 곱하면 사야 할 총 길이입니다.',
      note: '나무 데크는 비에 젖으면 폭이 늘어나므로 3~6mm 간격이 필요합니다. 간격 없이 깔면 판이 서로 밀어 들뜹니다.' },
    en: { title: 'Decking Board Count', desc: 'Boards and total length from deck size and board width.',
      long: 'Board width plus drainage gap is the pitch of one run. Divide the short span of the deck by that for the number of runs, then multiply by the length for the total metres to buy.',
      note: 'Timber swells when wet, so leave a 3–6 mm gap. Laid tight, the boards push against each other and lift.' },
  },
  {
    slug: 'curtain-width',
    icon: '🪟',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'windowWidth', unit: 'cm', def: 180, min: 0 },
      { key: 'ratio', term: 'pleatRatio', unit: 'times', def: 2, min: 1, max: 4 },
    ],
    formula: '{fabricWidth} = {windowWidth} × {pleatRatio}',
    compute: v => [
      { term: 'fabricWidth', unit: 'cm', value: Math.round(v.w * v.ratio), digits: 0, primary: true },
      { term: 'result', unit: 'cm', value: Math.round(v.w * v.ratio / 2), digits: 0 },
      { term: 'diff', unit: 'cm', value: Math.round(v.w * (v.ratio - 1)), digits: 0 },
    ],
    ko: { title: '커튼 원단 폭 계산기', desc: '창 폭과 주름 배율로 필요한 원단 폭을 구합니다.',
      long: '커튼은 창 폭보다 넓어야 주름이 잡힙니다. 창 폭에 배율을 곱하면 필요한 원단 폭이고, 두 폭으로 나눠 달면 한 쪽당 절반입니다. 배율 1.5는 은은하게, 2는 표준, 2.5 이상은 풍성하게 잡힙니다.',
      note: '커튼 봉은 창보다 좌우로 15~20cm씩 길게 다는 것이 보통입니다. 그러면 열었을 때 창을 다 가리지 않습니다.' },
    en: { title: 'Curtain Fabric Width', desc: 'Fabric width from window width and fullness ratio.',
      long: 'Curtains must be wider than the window to hang in folds. Multiply window width by the fullness ratio; split in two for a pair. Ratio 1.5 gives a light gather, 2 is standard and 2.5 or more is generous.',
      note: 'Poles usually extend 15–20 cm past the window each side, so the curtains clear the glass when open.' },
  },
  {
    slug: 'pot-soil',
    icon: '🪴',
    category: '생활 계산',
    fields: [
      { key: 'd', term: 'potDia', unit: 'cm', def: 25, min: 0 },
      { key: 'h', term: 'potDepth', unit: 'cm', def: 22, min: 0 },
    ],
    formula: '{soilL} = π × ({potDia} ÷ 2) ² × {potDepth} × 0.85 ÷ 1000',
    compute: v => {
      // 위가 넓은 화분과 물 주는 여유를 감안해 85%만 채운다
      const cm3 = PI * Math.pow(v.d / 2, 2) * v.h * 0.85;
      return [
        { term: 'soilL', unit: 'liter', value: round(cm3 / 1000, 2), digits: 2, primary: true },
        { term: 'volume', unit: 'cm3', value: Math.round(cm3), digits: 0 },
        { term: 'weightKg', unit: 'kg', value: round(cm3 / 1000 * 0.6, 2), digits: 2 },
      ];
    },
    ko: { title: '화분 흙 양 계산기', desc: '화분 지름과 깊이로 필요한 배양토 양을 구합니다.',
      long: '원기둥 부피를 구한 뒤 85%만 씁니다. 물을 줄 공간을 테두리 아래 2~3cm 남겨야 하고 배수층도 들어가기 때문입니다. 배양토는 L당 약 0.6kg입니다.',
      note: '배양토는 부피(L)로 파는데 물을 주면 20% 정도 가라앉습니다. 한두 달 뒤 흙을 더 채워야 합니다.' },
    en: { title: 'Potting Soil Volume', desc: 'Compost needed from pot diameter and depth.',
      long: 'Take the cylinder volume and use 85% of it: you need 2–3 cm of watering space below the rim, plus room for drainage material. Potting compost weighs about 0.6 kg a litre.',
      note: 'Compost is sold by litre and settles about 20% once watered, so expect to top it up after a month or two.' },
  },
  {
    slug: 'brick-count',
    icon: '🧱',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'm', def: 6, min: 0 },
      { key: 'h', term: 'widthCm', unit: 'm', def: 2.4, min: 0 },
      { key: 'bw', term: 'brickW', unit: 'cm', def: 19, min: 1 },
      { key: 'bh', term: 'brickH', unit: 'cm', def: 5.7, min: 1 },
    ],
    formula: '{brickCount} = {lengthCm} × {widthCm} × 10000 ÷ (({brickW} + 1) × ({brickH} + 1)) × 1.05',
    compute: v => {
      // 줄눈 10mm를 벽돌 치수에 더한다
      const per = (v.bw + 1) * (v.bh + 1);
      const n = ratio(v.w * v.h * 10000, per);
      return [
        { term: 'brickCount', unit: 'piece', value: Math.ceil(n * 1.05), digits: 0, primary: true },
        { term: 'count', unit: 'piece', value: Math.ceil(n), digits: 0 },
        { term: 'area', unit: 'm2', value: round(v.w * v.h, 2), digits: 2 },
      ];
    },
    ko: { title: '벽돌 개수 계산기', desc: '벽 면적과 벽돌 규격으로 필요한 벽돌 수를 구합니다.',
      long: '벽돌 치수에 줄눈 10mm를 더한 값이 벽돌 하나가 차지하는 면적입니다. 벽 면적을 그 값으로 나누고 깨짐·재단 손실 5%를 더합니다.',
      note: '표준 벽돌은 190×57×90mm입니다. 두 겹으로 쌓으면 개수가 두 배가 되므로 벽 두께를 먼저 정하세요.' },
    en: { title: 'Brick Count', desc: 'Bricks needed from wall area and brick size.',
      long: 'Brick dimensions plus a 10 mm mortar joint give the area one brick occupies. Divide the wall area by that and add 5% for breakage and cuts.',
      note: 'A standard brick is 190 × 57 × 90 mm. A double-skin wall doubles the count, so settle the wall thickness first.' },
  },
  {
    slug: 'firewood-cord',
    icon: '🔥',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'm', def: 2.4, min: 0 },
      { key: 'h', term: 'widthCm', unit: 'm', def: 1.2, min: 0 },
      { key: 'd', term: 'depthCm', unit: 'm', def: 0.5, min: 0 },
    ],
    formula: '{cordVolume} = {lengthCm} × {widthCm} × {depthCm}',
    compute: v => {
      const m3 = v.w * v.h * v.d;
      return [
        { term: 'cordVolume', unit: 'm3', value: round(m3, 3), digits: 3, primary: true },
        { term: 'cords', unit: 'none', value: round(m3 / 3.6245, 3), digits: 3 },
        { term: 'weightKg', unit: 'kg', value: Math.round(m3 * 0.7 * 550), digits: 0 },
      ];
    },
    ko: { title: '장작 부피 계산기', desc: '쌓아 둔 장작의 부피와 코드 단위를 구합니다.',
      long: '가로 × 높이 × 깊이로 쌓인 부피가 나옵니다. 장작 거래 단위인 1코드는 약 3.62㎥입니다. 쌓인 부피에는 나무 사이 빈틈이 포함되므로 실제 나무는 약 70%입니다.',
      note: '갓 자른 나무는 무게의 절반이 물입니다. 태우려면 6개월에서 1년을 말려 수분을 20% 아래로 내려야 합니다.' },
    en: { title: 'Firewood Stack Volume', desc: 'Stacked volume and cords from stack dimensions.',
      long: 'Width × height × depth gives the stacked volume. One cord, the traditional trading unit, is about 3.62 m³. Stacked volume includes air gaps, so solid wood is around 70% of it.',
      note: 'Freshly cut wood is half water by weight. It needs six months to a year of seasoning to drop below 20% moisture before it burns well.' },
  },
  {
    slug: 'parking-count',
    icon: '🅿️',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'lotArea', unit: 'm2', def: 900, min: 0 },
      { key: 'per', term: 'perSpace', unit: 'm2', def: 30, min: 1 },
    ],
    formula: '{spaceCount} = {lotArea} ÷ {perSpace}',
    compute: v => [
      { term: 'spaceCount', unit: 'piece', value: Math.floor(ratio(v.area, v.per)), digits: 0, primary: true },
      { term: 'area', unit: 'm2', value: round(v.area, 1), digits: 1 },
      { term: 'pyeong', unit: 'none', value: round(v.area / 3.3058, 1), digits: 1 },
    ],
    ko: { title: '주차 대수 계산기', desc: '부지 면적과 1대당 면적으로 세울 수 있는 대수를 구합니다.',
      long: '주차 칸 자체는 약 12.5㎡지만 통로와 회전 공간을 더하면 1대당 25~35㎡가 필요합니다. 부지를 그 값으로 나누면 대략적인 대수가 나옵니다.',
      note: '부지 모양이 결과를 크게 바꿉니다. 길고 좁은 땅은 통로가 많이 들어 같은 면적에서도 대수가 적습니다.' },
    en: { title: 'Parking Space Count', desc: 'How many cars fit, from lot area and area per car.',
      long: 'A bay itself is about 12.5 m², but with aisles and turning room each car needs 25–35 m². Dividing the lot by that gives a working estimate.',
      note: 'Shape matters as much as area. A long narrow site loses more to aisles and holds fewer cars for the same square metres.' },
  },
  {
    slug: 'solar-panel-count',
    icon: '☀️',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'roofArea', unit: 'm2', def: 60, min: 0 },
      { key: 'pw', term: 'panelW', def: 1.13, min: 0.1 },
      { key: 'ph', term: 'panelH', def: 1.76, min: 0.1 },
      { key: 'watt', term: 'panelKw', def: 450, min: 1 },
    ],
    formula: '{panelCount} = {roofArea} × 0.8 ÷ ({panelW} × {panelH})',
    compute: v => {
      // 통로·간격으로 지붕의 80%만 쓸 수 있다고 본다
      const n = Math.floor(ratio(v.area * 0.8, v.pw * v.ph));
      return [
        { term: 'panelCount', unit: 'piece', value: n, digits: 0, primary: true },
        { term: 'panelKw', unit: 'kw', value: round(n * v.watt / 1000, 2), digits: 2 },
        { term: 'area', unit: 'm2', value: round(n * v.pw * v.ph, 2), digits: 2 },
      ];
    },
    ko: { title: '태양광 패널 개수 계산기', desc: '지붕 면적과 패널 규격으로 설치 가능한 개수와 용량을 구합니다.',
      long: '지붕 전체를 다 덮을 수는 없습니다. 점검 통로와 그림자 간격, 설비 자리를 빼면 보통 80% 정도가 실제 설치 면적입니다. 패널 한 장 면적으로 나누고 출력을 곱하면 설치 용량이 나옵니다.',
      note: '발전량은 용량뿐 아니라 방위와 경사, 일조 시간에 크게 좌우됩니다. 이 계산은 설치 규모까지만 알려 줍니다.' },
    en: { title: 'Solar Panel Count', desc: 'Panels and installed capacity from roof area and panel size.',
      long: 'You cannot cover the whole roof. Access paths, shading gaps and equipment leave about 80% usable. Divide by the area of one panel and multiply by its output for the installed capacity.',
      note: 'Actual generation depends heavily on orientation, tilt and sunshine hours, not just capacity. This sizes the array, nothing more.' },
  },
  {
    slug: 'rain-harvest',
    icon: '🌧️',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'roofArea', unit: 'm2', def: 80, min: 0 },
      { key: 'mm', term: 'rainMm', unit: 'mm', def: 30, min: 0 },
    ],
    formula: '{harvestL} = {roofArea} × {rainMm} × 0.85',
    compute: v => {
      const l = v.area * v.mm * 0.85;
      return [
        { term: 'harvestL', unit: 'liter', value: Math.round(l), digits: 0, primary: true },
        { term: 'liters', unit: 'liter', value: Math.round(v.area * v.mm), digits: 0 },
        { term: 'weightT', unit: 'ton', value: round(l / 1000, 3), digits: 3 },
      ];
    },
    ko: { title: '빗물 수집량 계산기', desc: '지붕 면적과 강수량으로 모을 수 있는 물의 양을 구합니다.',
      long: '강수량 1mm는 1㎡에 물 1L가 내린 것과 같습니다. 지붕 면적에 강수량을 곱하면 내린 양이고, 튀거나 젖어 사라지는 것을 빼면 약 85%를 받습니다.',
      note: '지붕 면적은 경사면이 아니라 위에서 본 수평 투영 면적으로 계산합니다. 비는 수직으로 내리기 때문입니다.' },
    en: { title: 'Rainwater Harvest', desc: 'How much water a roof collects from a given rainfall.',
      long: 'One millimetre of rain is one litre per square metre. Multiply roof area by rainfall for what fell, then take about 85% after splash and wetting losses.',
      note: 'Use the horizontal plan area of the roof, not the sloped surface — rain falls vertically.' },
  },
  {
    slug: 'screen-ppi',
    icon: '🖥️',
    category: '생활 계산',
    fields: [
      { key: 'px', term: 'pxWidth', unit: 'px', def: 2560, min: 1 },
      { key: 'py', term: 'pxHeight', unit: 'px', def: 1440, min: 1 },
      { key: 'inch', term: 'inches', def: 27, min: 1 },
    ],
    formula: '{ppi} = √({pxWidth} ² + {pxHeight} ²) ÷ {inches}',
    compute: v => {
      const diag = Math.hypot(v.px, v.py);
      const ppi = ratio(diag, v.inch);
      return [
        { term: 'ppi', unit: 'ppiU', value: round(ppi, 1), digits: 1, primary: true },
        { term: 'diagonal', unit: 'px', value: Math.round(diag), digits: 0 },
        { term: 'result', unit: 'cm', value: round(25.4 / ppi, 4), digits: 4 },
      ];
    },
    verdict: (_v, out) => {
      const p = out[0].value;
      return p >= 200
        ? { ko: `${p}ppi는 픽셀이 보이지 않는 고밀도입니다.`, en: `${p} ppi is high enough that pixels disappear.`, l10n: { es: `${p} ppi es tan alto que los píxeles desaparecen.`, 'pt-br': `${p} ppi é alto o bastante para os pixels sumirem.`, ja: `${p}ppiは画素が見えない高密度です。`, de: `${p} ppi reichen aus, dass die Pixel verschwinden.`, fr: `${p} ppi, c’est assez pour que les pixels disparaissent.`, hi: `${p} ppi इतना ऊँचा है कि पिक्सेल दिखते ही नहीं।` }, tone: 'good' }
        : p >= 130
          ? { ko: `${p}ppi는 데스크톱에서 선명한 편입니다.`, en: `${p} ppi looks crisp at desktop distance.`, l10n: { es: `${p} ppi se ve nítido a distancia de escritorio.`, 'pt-br': `${p} ppi fica nítido à distância de mesa.`, ja: `${p}ppiはデスクトップの距離なら十分きれいに見えます。`, de: `${p} ppi wirken auf Schreibtischabstand knackig.`, fr: `${p} ppi rend net à distance de bureau.`, hi: `${p} ppi डेस्क की दूरी पर साफ़ दिखता है।` }, tone: 'good' }
          : { ko: `${p}ppi는 가까이서 보면 픽셀이 보입니다. 글자 테두리가 거칠게 느껴집니다.`, en: `${p} ppi shows pixels up close; text edges look rough.`, l10n: { es: `${p} ppi deja ver los píxeles de cerca; los bordes de las letras se notan ásperos.`, 'pt-br': `${p} ppi deixa os pixels aparecerem de perto; as bordas das letras ficam ásperas.`, ja: `${p}ppiは近くで見ると画素が見えます。文字の輪郭が粗く感じられます。`, de: `${p} ppi zeigen aus der Nähe Pixel; Textkanten wirken rau.`, fr: `${p} ppi laisse voir les pixels de près ; les bords des lettres paraissent rugueux.`, hi: `${p} ppi पर पास से देखने पर पिक्सेल दिखते हैं; अक्षरों के किनारे खुरदरे लगते हैं।` }, tone: 'warn' };
    },
    ko: { title: '화면 픽셀 밀도(ppi) 계산기', desc: '해상도와 화면 크기로 인치당 픽셀 수를 구합니다.',
      long: '해상도만으로는 선명함을 알 수 없습니다. 4K도 화면이 크면 픽셀이 커집니다. 대각선 픽셀 수를 대각선 인치로 나눈 ppi가 실제 선명함이고, 픽셀 하나의 크기도 함께 보여 줍니다.',
      note: '체감 선명함은 보는 거리에도 달려 있습니다. 폰은 얼굴에 가까워 300ppi가 필요하지만 모니터는 110ppi로도 충분한 경우가 많습니다.' },
    en: { title: 'Screen Pixel Density (ppi)', desc: 'Pixels per inch from resolution and screen size.',
      long: 'Resolution alone does not tell you sharpness — 4K on a large panel still has large pixels. Diagonal pixels over diagonal inches gives ppi, the figure that matters, alongside the size of one pixel.',
      note: 'Perceived sharpness also depends on viewing distance. A phone held close wants 300 ppi; a monitor at arm’s length often looks fine at 110.' },
  },
  {
    slug: 'box-fit',
    icon: '📮',
    category: '생활 계산',
    fields: [
      { key: 'bw', term: 'lengthCm', unit: 'cm', def: 40, min: 0.1 },
      { key: 'bd', term: 'widthCm', unit: 'cm', def: 30, min: 0.1 },
      { key: 'bh', term: 'depthCm', unit: 'cm', def: 25, min: 0.1 },
      { key: 'iw', term: 'itemW', unit: 'cm', def: 12, min: 0.1 },
      { key: 'id', term: 'itemH', unit: 'cm', def: 8, min: 0.1 },
      { key: 'ih', term: 'itemD', unit: 'cm', def: 6, min: 0.1 },
    ],
    formula: '{boxCount} = ⌊{lengthCm} ÷ {itemW}⌋ × ⌊{widthCm} ÷ {itemH}⌋ × ⌊{depthCm} ÷ {itemD}⌋',
    compute: v => {
      const fits = (box: number, item: number) => Math.floor(ratio(box, item));
      const n = fits(v.bw, v.iw) * fits(v.bd, v.id) * fits(v.bh, v.ih);
      const ideal = ratio(v.bw * v.bd * v.bh, v.iw * v.id * v.ih);
      return [
        { term: 'boxCount', unit: 'piece', value: n, digits: 0, primary: true },
        { term: 'count', unit: 'piece', value: Math.floor(ideal), digits: 0 },
        { term: 'fillPercent', unit: 'percent', value: round(ratio(n, ideal) * 100, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `한 방향으로 쌓으면 ${out[0].value}개가 들어갑니다. 부피만 보면 ${out[1].value}개지만 잘라 쓸 수 없어 ${out[2].value}%만 채워집니다.`,
      en: `${out[0].value} fit in one orientation. Volume alone suggests ${out[1].value}, but you cannot cut items, so only ${out[2].value}% of the space is used.`,
      l10n: { es: `Caben ${out[0].value} en una misma orientación. Solo por volumen saldrían ${out[1].value}, pero los artículos no se pueden partir, así que solo se aprovecha el ${out[2].value} % del espacio.`, 'pt-br': `Cabem ${out[0].value} em uma mesma orientação. Só pelo volume dariam ${out[1].value}, mas os itens não podem ser partidos, então só ${out[2].value} % do espaço é aproveitado.`, ja: `向きをそろえて積むと${out[0].value}個入ります。体積だけなら${out[1].value}個ですが、品物は切って詰められないので${out[2].value}%しか埋まりません。`, de: `${out[0].value} passen in einer Ausrichtung. Nach Volumen wären es ${out[1].value}, aber Artikel lassen sich nicht zerschneiden, also werden nur ${out[2].value} % des Raums genutzt.`, fr: `Il en tient ${out[0].value} dans une même orientation. Le volume seul en donnerait ${out[1].value}, mais on ne coupe pas les articles : seuls ${out[2].value} % de l’espace servent.`, hi: `एक ही दिशा में जमाने पर ${out[0].value} समाते हैं। सिर्फ़ आयतन देखें तो ${out[1].value} बनते हैं, पर चीज़ें काटी नहीं जा सकतीं, इसलिए जगह का सिर्फ़ ${out[2].value}% ही काम आता है।` },
      tone: 'warn',
    }),
    ko: { title: '상자에 몇 개 들어가나 계산기', desc: '상자와 물건 치수로 들어가는 개수를 구합니다.',
      long: '각 방향으로 몇 개가 들어가는지 내림해서 곱합니다. 부피를 부피로 나눈 값보다 항상 적은데, 남는 자리를 쪼개 쓸 수 없기 때문입니다. 그 차이가 공간 활용률로 나옵니다.',
      note: '물건을 눕히거나 돌려 놓으면 개수가 달라집니다. 세 치수를 서로 바꿔 넣어 보고 가장 많이 들어가는 조합을 찾으세요.' },
    en: { title: 'How Many Items Fit in a Box', desc: 'Item count from box and item dimensions.',
      long: 'Round down along each axis and multiply. It always comes out below volume-over-volume, because leftover space cannot be subdivided — and that gap is the fill efficiency shown.',
      note: 'Turning items on their side changes the answer. Swap the three item dimensions around to find the best orientation.' },
  },
  {
    slug: 'roof-pitch',
    icon: '🏠',
    category: '생활 계산',
    fields: [
      { key: 'rise', term: 'riseLen', unit: 'cm', def: 300, min: 0 },
      { key: 'run', term: 'runLen', unit: 'cm', def: 600, min: 0 },
    ],
    formula: '{angleDeg} = arctan({riseLen} ÷ {runLen}),  {slopePct} = {riseLen} ÷ {runLen} × 100',
    compute: v => {
      const r = ratio(v.rise, v.run);
      return [
        { term: 'angleDeg', unit: 'deg', value: round((Math.atan(r) * 180) / Math.PI, 2), digits: 2, primary: true },
        { term: 'slopePct', unit: 'percent', value: round(r * 100, 2), digits: 2 },
        { term: 'slant', unit: 'cm', value: round(Math.hypot(v.rise, v.run), 2), digits: 2 },
      ];
    },
    ko: { title: '지붕 물매 각도', desc: '올라간 높이와 뻗은 거리로 지붕의 기울기와 서까래 길이를 구합니다.',
      long: '높이를 거리로 나눈 값의 아크탄젠트가 각도입니다. 같은 값에 100을 곱하면 퍼센트가 되고, 두 변의 빗변이 서까래 길이입니다.',
      note: '서까래 길이는 처마로 내미는 길이를 뺀 값입니다. 실제로 자를 때는 내밀 길이를 따로 더하세요.' },
    en: { title: 'Roof Pitch Angle', desc: 'Turn rise and run into a roof angle, a percent grade and a rafter length.',
      long: 'The arctangent of rise divided by run gives the angle. The same ratio times 100 is the percent grade, and the hypotenuse of the two is the rafter length.',
      note: 'That rafter length stops at the wall — add whatever overhang you want at the eaves before cutting.' },
  },
];
