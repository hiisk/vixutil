/** 도형 - 생활 계산 (14종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;
/** 1평 = 3.305785㎡ */
const PYEONG = 3.305785;

export const PRACTICAL_TOOLS: FormulaTool[] = [
  {
    slug: 'room-area',
    icon: '🏠',
    category: '생활 계산',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'm', def: 4.2, min: 0, step: 0.1 },
      { key: 'w', term: 'widthCm', unit: 'm', def: 3.4, min: 0, step: 0.1 },
    ],
    formula: '{area} = {lengthCm} × {widthCm},  {pyeong} = {area} ÷ 3.305785',
    compute: v => {
      const m2 = v.l * v.w;
      return [
        { term: 'area', unit: 'm2', value: round(m2, 2), digits: 2, primary: true },
        { term: 'pyeong', value: round(ratio(m2, PYEONG), 2), digits: 2 },
        { term: 'perimeter', unit: 'm', value: round(2 * (v.l + v.w), 2), digits: 2 },
      ];
    },
    ko: { title: '방 면적 계산기', desc: '가로·세로로 방의 면적을 ㎡와 평으로 구합니다.',
      long: '가로와 세로를 곱하면 ㎡이고, 3.305785로 나누면 평입니다. 둘레는 걸레받이나 몰딩 길이를 잴 때 씁니다.',
      note: '분양 면적(공급면적)에는 복도와 계단 같은 공용부가 포함됩니다. 여기서 나오는 값은 실제 바닥 면적입니다.' },
    en: { title: 'Room Area Calculator', desc: 'Floor area of a room in square metres and Korean pyeong.',
      long: 'Multiply length by width for square metres, then divide by 3.305785 for pyeong. The perimeter is what you need for skirting or moulding.',
      note: 'Advertised apartment size in Korea includes shared corridors and stairs — this is the actual floor area.' },
  },
  {
    slug: 'room-volume',
    icon: '🧱',
    category: '생활 계산',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'm', def: 4.2, min: 0, step: 0.1 },
      { key: 'w', term: 'widthCm', unit: 'm', def: 3.4, min: 0, step: 0.1 },
      { key: 'h', term: 'heightGeo', unit: 'm', def: 2.4, min: 0, step: 0.1 },
    ],
    formula: '{volume} = {lengthCm} × {widthCm} × {heightGeo}',
    compute: v => {
      const m3 = v.l * v.w * v.h;
      return [
        { term: 'volume', unit: 'm3', value: round(m3, 2), digits: 2, primary: true },
        { term: 'area', unit: 'm2', value: round(v.l * v.w, 2), digits: 2 },
        { term: 'liters', unit: 'liter', value: round(m3 * 1000, 0), digits: 0 },
      ];
    },
    ko: { title: '방 부피 계산기', desc: '가로·세로·높이로 실내 공간의 부피를 구합니다.',
      long: '에어컨과 공기청정기 용량, 환기 횟수를 정할 때 바닥 면적이 아니라 부피가 기준이 됩니다. 천장이 높으면 같은 평수라도 더 큰 용량이 필요합니다.',
      note: '가정용 천장 높이는 보통 2.3~2.5m입니다. 아래 값은 그 공간의 공기 부피를 리터로 바꾼 것입니다.' },
    en: { title: 'Room Volume Calculator', desc: 'Interior volume from length, width and ceiling height.',
      long: 'Air conditioner sizing, air purifier ratings and air-change rates all key off volume, not floor area. A high ceiling needs more capacity at the same floor size.',
      note: 'Residential ceilings usually run 2.3–2.5 m. The last figure converts that air volume into litres.' },
  },
  {
    slug: 'wall-paint',
    icon: '🎨',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 40, min: 0, step: 0.5 },
      { key: 'coats', term: 'coats', def: 2, min: 1, max: 5, step: 1 },
      { key: 'coverage', term: 'result', unit: 'm2', def: 10, min: 1, step: 0.5 },
    ],
    formula: '{paintL} = {area} × {coats} ÷ {result}',
    compute: v => [
      { term: 'paintL', unit: 'liter', value: round(ratio(v.area * v.coats, v.coverage), 2), digits: 2, primary: true },
      { term: 'area', unit: 'm2', value: round(v.area * v.coats, 1), digits: 1 },
    ],
    ko: { title: '페인트 소요량 계산기', desc: '벽 면적과 칠할 횟수로 필요한 페인트 양을 구합니다.',
      long: '도포 면적(1L로 칠할 수 있는 ㎡)은 제품마다 다릅니다. 수성 실내용은 보통 1L에 8~12㎡입니다.',
      note: '흰 벽에 진한 색을 칠하면 세 번 이상 칠해야 색이 균일해집니다. 여유분을 10% 정도 더 사두세요.' },
    en: { title: 'Paint Quantity Calculator', desc: 'How much paint you need from wall area and number of coats.',
      long: 'Coverage per litre varies by product; interior water-based paints typically cover 8–12 m² per litre.',
      note: 'Dark colours over white walls often need three coats for an even finish — buy about 10% extra.' },
  },
  {
    slug: 'tile-count',
    icon: '🟦',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 20, min: 0, step: 0.5 },
      { key: 'size', term: 'tileSize', unit: 'cm', def: 60, min: 1 },
      { key: 'extra', term: 'extraPct', unit: 'percent', def: 10, min: 0, max: 50 },
    ],
    formula: '{tileCount} = {area} ÷ ({tileSize} ÷ 100)² × (1 + {extraPct} ÷ 100)',
    compute: v => {
      const perTile = (v.size / 100) ** 2;
      const need = ratio(v.area, perTile);
      return [
        { term: 'tileCount', unit: 'ea', value: Math.ceil(need * (1 + v.extra / 100)), digits: 0, primary: true },
        { term: 'count', unit: 'ea', value: Math.ceil(need), digits: 0 },
        { term: 'area', unit: 'm2', value: round(perTile, 4), digits: 4 },
      ];
    },
    ko: { title: '타일 개수 계산기', desc: '바닥 면적과 타일 크기로 필요한 타일 수를 구합니다.',
      long: '타일 한 장의 면적으로 전체 면적을 나눈 뒤 여유율을 더합니다. 재단 손실과 파손을 감안해 10~15%를 더 잡는 것이 보통입니다.',
      note: '아래 값이 여유 없는 최소 수량입니다. 사선으로 붙이면 재단 손실이 커져 15% 이상 필요합니다.' },
    en: { title: 'Tile Count Calculator', desc: 'Number of tiles needed from floor area and tile size.',
      long: 'Divide the area by the area of one tile, then add a waste allowance. 10–15% extra is normal to cover cuts and breakage.',
      note: 'The second figure is the bare minimum with no allowance. Diagonal layouts waste more — budget 15% or above.' },
  },
  {
    slug: 'wallpaper-rolls',
    icon: '📜',
    category: '생활 계산',
    fields: [
      { key: 'area', term: 'area', unit: 'm2', def: 45, min: 0, step: 0.5 },
      { key: 'width', term: 'rollWidth', def: 106, min: 10 },
      { key: 'length', term: 'rollLength', def: 15.6, min: 0.5, step: 0.1 },
    ],
    formula: '{rolls} = {area} ÷ ({rollWidth} ÷ 100 × {rollLength})',
    compute: v => {
      const perRoll = (v.width / 100) * v.length;
      return [
        { term: 'rolls', unit: 'roll', value: Math.ceil(ratio(v.area, perRoll) * 1.1), digits: 0, primary: true },
        { term: 'area', unit: 'm2', value: round(perRoll, 2), digits: 2 },
        { term: 'count', unit: 'roll', value: Math.ceil(ratio(v.area, perRoll)), digits: 0 },
      ];
    },
    ko: { title: '벽지 롤 수 계산기', desc: '벽 면적과 벽지 규격으로 필요한 롤 수를 구합니다.',
      long: '국내 합지는 폭 93cm, 실크는 106cm가 표준이고 한 롤이 15.6m 정도입니다. 여유율 10%를 이미 반영한 값이 위 숫자입니다.',
      note: '무늬가 반복되는 벽지는 무늬를 맞추느라 손실이 커집니다. 무늬가 크면 20% 이상 여유를 두세요.' },
    en: { title: 'Wallpaper Roll Calculator', desc: 'Rolls needed from wall area and roll dimensions.',
      long: 'Korean paper-backed rolls are 93 cm wide and silk 106 cm, at roughly 15.6 m per roll. The headline figure already includes a 10% allowance.',
      note: 'Patterned paper wastes more because repeats must line up — allow 20% or more for large patterns.' },
  },
  {
    slug: 'concrete-volume',
    icon: '🏗️',
    category: '생활 계산',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'm', def: 5, min: 0, step: 0.1 },
      { key: 'w', term: 'widthCm', unit: 'm', def: 3, min: 0, step: 0.1 },
      { key: 't', term: 'thickness', unit: 'cm', def: 10, min: 0.5, step: 0.5 },
    ],
    formula: '{volume} = {lengthCm} × {widthCm} × {thickness} ÷ 100',
    compute: v => {
      const m3 = v.l * v.w * (v.t / 100);
      return [
        { term: 'volume', unit: 'm3', value: round(m3, 3), digits: 3, primary: true },
        { term: 'cementBags', unit: 'ea', value: Math.ceil(m3 * 7), digits: 0 },
        { term: 'weightT', unit: 'kg2', value: Math.round(m3 * 2400), digits: 0 },
      ];
    },
    ko: { title: '콘크리트 물량 계산기', desc: '면적과 두께로 콘크리트 부피와 무게를 구합니다.',
      long: '가로·세로에 두께를 곱하면 ㎥입니다. 시멘트 포대 수는 1㎥당 40kg 7포대를 기준으로 어림한 값입니다.',
      note: '콘크리트 밀도는 약 2,400kg/㎥입니다. 배합비와 골재에 따라 실제 포대 수는 달라집니다.' },
    en: { title: 'Concrete Volume Calculator', desc: 'Concrete volume and weight from area and slab thickness.',
      long: 'Length times width times thickness gives cubic metres. Bag count is estimated at seven 40 kg bags per cubic metre.',
      note: 'Concrete runs about 2,400 kg/m³. The real bag count varies with the mix ratio and aggregate.' },
  },
  {
    slug: 'water-tank',
    icon: '🛢️',
    category: '생활 계산',
    fields: [
      { key: 'd', term: 'diameter', unit: 'cm', def: 60, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 100, min: 0 },
    ],
    formula: '{liters} = π × ({diameter} ÷ 2)² × {heightGeo} ÷ 1000',
    compute: v => {
      const cm3 = PI * (v.d / 2) ** 2 * v.h;
      return [
        { term: 'liters', unit: 'liter', value: round(cm3 / 1000, 2), digits: 2, primary: true },
        { term: 'waterKg', unit: 'kg2', value: round(cm3 / 1000, 1), digits: 1 },
        { term: 'volume', unit: 'm3', value: round(cm3 / 1000000, 4), digits: 4 },
      ];
    },
    ko: { title: '원통 물탱크 용량 계산기', desc: '지름과 높이로 원통형 탱크의 용량을 리터로 구합니다.',
      long: '바닥 원 면적에 높이를 곱한 ㎤를 1000으로 나누면 리터입니다. 물 1L는 1kg이라 무게도 같은 숫자입니다.',
      note: '탱크를 가득 채우지는 않습니다. 여유 공간을 빼고 90% 정도로 계산하세요.' },
    en: { title: 'Cylindrical Tank Capacity', desc: 'Litres held by a cylindrical tank from diameter and height.',
      long: 'Base area times height in cm³, divided by 1,000, gives litres. Since a litre of water weighs a kilogram, the weight is the same number.',
      note: 'Tanks are never filled to the brim — plan on about 90% of this figure.' },
  },
  {
    slug: 'aquarium-weight',
    icon: '🐠',
    category: '생활 계산',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'cm', def: 60, min: 0 },
      { key: 'w', term: 'widthCm', unit: 'cm', def: 30, min: 0 },
      { key: 'h', term: 'depthCm', unit: 'cm', def: 36, min: 0 },
    ],
    formula: '{liters} = {lengthCm} × {widthCm} × {depthCm} ÷ 1000',
    compute: v => {
      const liters = (v.l * v.w * v.h) / 1000;
      return [
        { term: 'liters', unit: 'liter', value: round(liters, 2), digits: 2, primary: true },
        { term: 'waterKg', unit: 'kg2', value: round(liters, 1), digits: 1 },
        { term: 'result', unit: 'kg2', value: round(liters * 1.15 + (v.l * v.w) / 300, 1), digits: 1 },
      ];
    },
    ko: { title: '어항 물 용량·무게 계산기', desc: '어항 크기로 물의 양과 전체 무게를 구합니다.',
      long: '가로·세로·물 높이를 곱해 1000으로 나누면 리터이고, 물 1L가 1kg이라 무게가 같습니다. 아래 값은 유리와 바닥재를 감안한 대략적인 총 무게입니다.',
      note: '60cm 어항은 물만 65kg입니다. 일반 가구 위에 올리면 무너질 수 있으니 받침을 확인하세요.' },
    en: { title: 'Aquarium Volume & Weight', desc: 'Water volume and total weight from tank dimensions.',
      long: 'Multiply length, width and water depth, divide by 1,000 for litres — and since a litre weighs a kilogram, that is also the water weight. The last figure adds a rough allowance for glass and substrate.',
      note: 'A 60 cm tank holds about 65 kg of water alone. Ordinary furniture may not take that — check the stand.' },
  },
  {
    slug: 'pizza-compare',
    icon: '🍕',
    category: '생활 계산',
    fields: [
      { key: 'a', term: 'pizzaA', unit: 'cm', def: 45, min: 1 },
      { key: 'b', term: 'pizzaB', unit: 'cm', def: 30, min: 1 },
      { key: 'n', term: 'countB', def: 2, min: 1, max: 20, step: 1 },
    ],
    formula: '{area} = π × ({pizzaA} ÷ 2)²  vs  {countB} × π × ({pizzaB} ÷ 2)²',
    compute: v => {
      const areaA = PI * (v.a / 2) ** 2;
      const areaB = PI * (v.b / 2) ** 2 * v.n;
      return [
        { term: 'result', unit: 'times', value: round(ratio(areaA, areaB), 3), digits: 3, primary: true },
        { term: 'area', unit: 'cm2', value: round(areaA, 1), digits: 1 },
        { term: 'diff', unit: 'cm2', value: round(areaB, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => {
      const r = out[0].value;
      const bigWins = r > 1;
      const pct = round(Math.abs(r - 1) * 100, 1);
      return {
        ko: bigWins ? `${v.a}cm 한 판이 ${v.b}cm ${v.n}판보다 ${pct}% 큽니다.` : `${v.b}cm ${v.n}판이 ${v.a}cm 한 판보다 ${round((1 / r - 1) * 100, 1)}% 큽니다.`,
        en: bigWins ? `One ${v.a} cm pizza is ${pct}% more pizza than ${v.n} × ${v.b} cm.` : `${v.n} × ${v.b} cm gives ${round((1 / r - 1) * 100, 1)}% more than one ${v.a} cm.` ? `一个${v.a}厘米的披萨比${v.n}个${v.b}厘米的多${pct}%。` : `${v.n}个${v.b}厘米的披萨比一个${v.a}厘米的多${round((1 / r - 1) * 100, 1)}%。`,
        tone: 'good',
      };
    },
    ko: { title: '피자 크기 비교 계산기', desc: '큰 것 한 판과 작은 것 여러 판 중 어느 쪽이 많은지 비교합니다.',
      long: '피자 양은 지름이 아니라 면적, 즉 지름의 제곱에 비례합니다. 45cm 한 판은 30cm 두 판보다 넓습니다 — 지름이 1.5배면 면적은 2.25배입니다.',
      note: '도우 두께가 같다고 가정한 비교입니다. 씬 도우와 두꺼운 도우는 부피가 달라집니다.' },
    en: { title: 'Pizza Size Comparison', desc: 'Compare one large pizza against several smaller ones.',
      long: 'Pizza scales with area, not diameter — that is, with the square of the diameter. One 45 cm pizza beats two 30 cm ones: 1.5× the diameter is 2.25× the area.',
      note: 'This assumes equal crust thickness. Thin and deep-dish bases differ in volume.' },
  },
  {
    slug: 'tv-size',
    icon: '📺',
    category: '생활 계산',
    fields: [
      { key: 'inch', term: 'inches', unit: 'inch', def: 55, min: 1 },
      { key: 'w', term: 'aspectW', def: 16, min: 1 },
      { key: 'h', term: 'aspectH', def: 9, min: 1 },
    ],
    formula: '{lengthCm} = {inches} × 2.54 × {aspectW} ÷ √({aspectW}² + {aspectH}²)',
    compute: v => {
      const diag = v.inch * 2.54;
      const norm = Math.hypot(v.w, v.h);
      const width = ratio(diag * v.w, norm);
      const height = ratio(diag * v.h, norm);
      return [
        { term: 'lengthCm', unit: 'cm', value: round(width, 1), digits: 1, primary: true },
        { term: 'widthCm', unit: 'cm', value: round(height, 1), digits: 1 },
        { term: 'area', unit: 'cm2', value: round(width * height, 0), digits: 0 },
      ];
    },
    ko: { title: 'TV 인치 → 가로·세로 계산기', desc: '인치와 화면비로 실제 화면 크기를 cm로 구합니다.',
      long: '인치는 대각선 길이입니다. 화면비 16:9라면 가로는 대각선의 0.871배, 세로는 0.49배입니다 — 55인치는 가로 121.8cm, 세로 68.5cm입니다.',
      note: '베젤과 스탠드는 포함되지 않습니다. 가구에 넣을 때는 제품 외곽 치수를 따로 확인하세요.' },
    en: { title: 'TV Inches to Width & Height', desc: 'Actual screen dimensions in cm from a diagonal size and aspect ratio.',
      long: 'Inches measure the diagonal. At 16:9 the width is 0.871× the diagonal and the height 0.49× — a 55-inch set is 121.8 cm by 68.5 cm.',
      note: 'Bezels and stands are not included — check the outer dimensions before fitting it into furniture.' },
  },
  {
    slug: 'paper-size',
    icon: '📄',
    category: '생활 계산',
    fields: [{ key: 'n', term: 'paperN', def: 4, min: 0, max: 10, step: 1 }],
    formula: '{lengthCm} = 1189 ÷ 2^(⌈{paperN}÷2⌉),  {widthCm} = 841 ÷ 2^(⌊{paperN}÷2⌋)',
    compute: v => {
      const n = Math.max(0, Math.min(10, Math.round(v.n)));
      // A0는 841×1189mm. n이 하나 커질 때마다 긴 변을 반으로 접는다
      let w = 841;
      let h = 1189;
      for (let i = 0; i < n; i++) {
        const nh = w;
        w = Math.floor(h / 2);
        h = nh;
      }
      return [
        { term: 'lengthCm', unit: 'mm', value: h, digits: 0, primary: true },
        { term: 'widthCm', unit: 'mm', value: w, digits: 0 },
        { term: 'area', unit: 'cm2', value: round((w * h) / 100, 1), digits: 1 },
      ];
    },
    ko: { title: 'A 규격 용지 크기 계산기', desc: 'A0부터 A10까지 종이의 가로·세로를 mm로 구합니다.',
      long: 'A0는 841×1189mm로 면적이 1㎡입니다. 번호가 하나 커질 때마다 긴 변을 반으로 접어 A4는 210×297mm가 됩니다.',
      note: '가로와 세로의 비가 1:√2라서 반으로 접어도 비율이 그대로 유지됩니다.' },
    en: { title: 'A-Series Paper Size', desc: 'Millimetre dimensions of A0 through A10 paper.',
      long: 'A0 is 841 × 1189 mm, an area of exactly one square metre. Each step up the number halves the long side, so A4 lands at 210 × 297 mm.',
      note: 'The 1:√2 side ratio is what lets the proportions survive every fold in half.' },
  },
  {
    slug: 'stair-steps',
    icon: '🪜',
    category: '생활 계산',
    fields: [
      { key: 'total', term: 'heightGeo', unit: 'cm', def: 280, min: 1 },
      { key: 'riser', term: 'stepHeight', unit: 'cm', def: 18, min: 5, max: 30, step: 0.5 },
      { key: 'tread', term: 'runLen', unit: 'cm', def: 26, min: 15, max: 40 },
    ],
    formula: '{stepCount} = ⌈{heightGeo} ÷ {stepHeight}⌉',
    compute: v => {
      const steps = Math.ceil(ratio(v.total, v.riser));
      const actualRiser = ratio(v.total, steps);
      return [
        { term: 'stepCount', unit: 'ea', value: steps, digits: 0, primary: true },
        { term: 'stepHeight', unit: 'cm', value: round(actualRiser, 2), digits: 2 },
        { term: 'slopePct', unit: 'percent', value: round(ratio(actualRiser, v.tread) * 100, 1), digits: 1 },
      ];
    },
    verdict: v => {
      const steps = Math.ceil(ratio(v.total, v.riser));
      const r = ratio(v.total, steps);
      const sum = 2 * r + v.tread;
      const ok = sum >= 60 && sum <= 65;
      return {
        ko: ok ? `2×단높이+단너비 = ${round(sum, 1)}cm로 걷기 편한 범위(60~65cm)입니다.` : `2×단높이+단너비 = ${round(sum, 1)}cm입니다. 60~65cm가 걷기 편한 범위입니다.`,
        en: ok ? `2 × riser + tread = ${round(sum, 1)} cm, inside the comfortable 60–65 cm range.` : `2 × riser + tread = ${round(sum, 1)} cm; the comfortable range is 60–65 cm.` ? `2×级高+踏面 = ${round(sum, 1)}厘米，处于舒适区间(60~65厘米)。` : `2×级高+踏面 = ${round(sum, 1)}厘米；舒适区间为60~65厘米。`,
        tone: ok ? 'good' : 'warn',
      };
    },
    ko: { title: '계단 단 수 계산기', desc: '총 높이와 한 단 높이로 계단 수와 실제 단높이를 구합니다.',
      long: '단 수는 반드시 정수여야 하므로 올림한 뒤 총 높이를 다시 나눠 실제 단높이를 구합니다. 모든 단의 높이가 같아야 발이 걸리지 않습니다.',
      note: '"2×단높이 + 단너비 = 60~65cm"가 오래 쓰이는 편안한 계단의 기준입니다.' },
    en: { title: 'Stair Step Calculator', desc: 'Step count and true riser height from total rise.',
      long: 'The number of steps must be a whole number, so it is rounded up and the total rise divided again for the actual riser. Every riser must match, or people trip.',
      note: 'The long-standing rule for comfortable stairs is 2 × riser + tread = 60–65 cm.' },
  },
  {
    slug: 'roof-area',
    icon: '🏡',
    category: '생활 계산',
    fields: [
      { key: 'floor', term: 'area', unit: 'm2', def: 100, min: 0, step: 0.5 },
      { key: 'slope', term: 'slopePct', unit: 'percent', def: 30, min: 0, max: 200 },
    ],
    formula: '{roofArea} = {area} × √(1 + ({slopePct} ÷ 100)²)',
    compute: v => {
      const factor = Math.sqrt(1 + (v.slope / 100) ** 2);
      return [
        { term: 'roofArea', unit: 'm2', value: round(v.floor * factor, 2), digits: 2, primary: true },
        { term: 'result', unit: 'times', value: round(factor, 4), digits: 4 },
        { term: 'angleDeg', unit: 'deg', value: round((Math.atan(v.slope / 100) * 180) / PI, 2), digits: 2 },
      ];
    },
    ko: { title: '경사 지붕 면적 계산기', desc: '바닥 면적과 경사도로 실제 지붕 면적을 구합니다.',
      long: '경사 지붕은 위에서 본 면적보다 넓습니다. 경사도로 만든 직각삼각형의 빗변 비율을 곱하면 실제 면적이 나옵니다.',
      note: '경사도 30%면 지붕 면적이 바닥의 1.044배입니다. 처마 돌출분은 따로 더해야 합니다.' },
    en: { title: 'Pitched Roof Area', desc: 'Actual roof surface from footprint area and pitch.',
      long: 'A pitched roof covers more surface than its plan view. Multiply by the hypotenuse ratio implied by the slope to get the real area.',
      note: 'At a 30% pitch the roof is 1.044× the footprint. Eave overhangs must be added separately.' },
  },
  {
    slug: 'lumber-volume',
    icon: '🪵',
    category: '생활 계산',
    fields: [
      { key: 'w', term: 'widthCm', unit: 'mm', def: 90, min: 1 },
      { key: 'h', term: 'thickness', unit: 'mm', def: 90, min: 1 },
      { key: 'len', term: 'lengthCm', unit: 'm', def: 3.6, min: 0, step: 0.1 },
      { key: 'count', term: 'count', unit: 'ea', def: 10, min: 1, step: 1 },
    ],
    formula: '{volume} = {widthCm} ÷ 1000 × {thickness} ÷ 1000 × {lengthCm} × {count}',
    compute: v => {
      const one = (v.w / 1000) * (v.h / 1000) * v.len;
      return [
        { term: 'volume', unit: 'm3', value: round(one * v.count, 4), digits: 4, primary: true },
        { term: 'result', unit: 'm3', value: round(one, 5), digits: 5 },
        { term: 'weightT', unit: 'kg2', value: round(one * v.count * 500, 1), digits: 1 },
      ];
    },
    ko: { title: '목재 재적 계산기', desc: '각재 단면과 길이, 개수로 목재 부피(㎥)를 구합니다.',
      long: '목재는 ㎥ 단위로 거래됩니다. 단면 가로·세로(mm)를 각각 1000으로 나눠 m로 바꾼 뒤 길이와 개수를 곱합니다.',
      note: '무게는 밀도 500kg/㎥로 어림한 값입니다. 소나무는 400~500, 오크는 700 이상이라 수종에 따라 크게 다릅니다.' },
    en: { title: 'Lumber Volume Calculator', desc: 'Timber volume in cubic metres from section, length and piece count.',
      long: 'Timber is traded by the cubic metre. Convert the section in millimetres to metres, then multiply by length and the number of pieces.',
      note: 'Weight assumes 500 kg/m³. Pine runs 400–500 and oak over 700, so species matters a great deal.' },
  },
];
