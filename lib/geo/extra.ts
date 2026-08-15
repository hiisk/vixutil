/**
 * 도형 셋째 묶음 (14종) — 좌표기하와 현장 계산.
 *
 * 앞의 110종이 "한 도형의 넓이·부피"였다면, 여기는 **두 개가 만나는 자리**를 잰다 —
 * 점과 직선, 직선과 직선, 원과 원, 위경도 두 점. 나머지는 자를 대기 전에 꼭 한 번
 * 계산하게 되는 것들이다: 원뿔을 펼쳤을 때의 부채꼴 각도, 눕힌 탱크에 남은 물,
 * 감긴 롤을 다 풀면 나오는 길이, 액자 톱 각도, 경사로 길이.
 *
 * 계산은 전부 0을 넣어도 유한한 값을 내야 한다 — 지름 0으로 나누는 자리가 셋 있어서
 * ratio()로 막았다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;
const D2R = PI / 180;
const R2D = 180 / PI;
/** 지구 평균 반지름(km) — 하버사인이 쓰는 값 */
const EARTH_KM = 6371;

export const EXTRA_TOOLS: FormulaTool[] = [
  /* ───────── 좌표기하 ───────── */
  {
    slug: 'line-point-distance',
    icon: '📏',
    category: '삼각비·각',
    fields: [
      { key: 'x1', term: 'x1', def: 6, step: 0.5 },
      { key: 'y1', term: 'y1', def: 8, step: 0.5 },
      { key: 'm', term: 'lineSlope', def: 2, step: 0.1 },
      { key: 'b', term: 'lineIntercept', def: 1, step: 0.5 },
    ],
    formula: '{distance} = |{lineSlope} × {x1} − {y1} + {lineIntercept}| ÷ √({lineSlope}² + 1)',
    compute: v => {
      const den = v.m * v.m + 1;
      const dist = Math.abs(v.m * v.x1 - v.y1 + v.b) / Math.sqrt(den);
      // 수선의 발 — 직선 위에서 그 점과 가장 가까운 자리
      const fx = (v.x1 + v.m * (v.y1 - v.b)) / den;
      return [
        { term: 'distance', unit: 'none', value: round(dist, 4), digits: 4, primary: true },
        { term: 'cartX', unit: 'none', value: round(fx, 4), digits: 4 },
        { term: 'cartY', unit: 'none', value: round(v.m * fx + v.b, 4), digits: 4 },
      ];
    },
    ko: { title: '점과 직선 사이 거리', desc: '점 하나와 y = mx + b 직선의 최단 거리를 구합니다.',
      long: '최단 거리는 직선에 수직으로 내린 선분의 길이입니다. 기울기 m과 절편 b로 쓴 식에 점의 좌표를 넣고, 분모로 √(m²+1)을 나눠 기울어진 만큼을 보정합니다.',
      note: '함께 나오는 좌표가 수선의 발입니다 — 직선 위에서 그 점과 가장 가까운 지점입니다.' },
    en: { title: 'Point to Line Distance', desc: 'Shortest distance from a point to the line y = mx + b.',
      long: 'The shortest path meets the line at a right angle. Put the point into the slope-intercept form and divide by √(m²+1), which corrects for how steeply the line leans.',
      note: 'The extra coordinates are the foot of the perpendicular — the closest point on the line itself.' },
  },
  {
    slug: 'line-intersection',
    icon: '✖️',
    category: '삼각비·각',
    fields: [
      { key: 'mA', term: 'lineSlope', def: 1, step: 0.1 },
      { key: 'bA', term: 'lineIntercept', def: 2, step: 0.5 },
      { key: 'mB', term: 'slopeB', def: -0.5, step: 0.1 },
      { key: 'bB', term: 'interceptB', def: 8, step: 0.5 },
    ],
    formula: '{cartX} = ({interceptB} − {lineIntercept}) ÷ ({lineSlope} − {slopeB})',
    compute: v => {
      const x = ratio(v.bB - v.bA, v.mA - v.mB);
      const angle = Math.abs(Math.atan(v.mA) - Math.atan(v.mB)) * R2D;
      return [
        { term: 'cartX', unit: 'none', value: round(x, 4), digits: 4, primary: true },
        { term: 'cartY', unit: 'none', value: round(v.mA * x + v.bA, 4), digits: 4 },
        { term: 'angleDeg', unit: 'deg', value: round(angle > 90 ? 180 - angle : angle, 2), digits: 2 },
      ];
    },
    ko: { title: '두 직선의 교점 계산기', desc: '기울기와 절편으로 쓴 두 직선이 만나는 좌표를 구합니다.',
      long: '두 식이 같아지는 x를 찾으면 됩니다. 절편의 차를 기울기의 차로 나눈 값이 교점의 x이고, 그 x를 한쪽 식에 넣으면 y가 나옵니다.',
      note: '기울기가 같으면 평행이라 만나지 않습니다. 그때는 나눌 수가 없어 0으로 표시합니다.' },
    en: { title: 'Line Intersection Calculator', desc: 'Where two lines written as y = mx + b cross.',
      long: 'Set the two equations equal and solve. The difference of the intercepts over the difference of the slopes gives x; feeding that x back into either line gives y.',
      note: 'Equal slopes mean parallel lines that never cross, and the result shows as zero.' },
  },
  {
    slug: 'quad-area-coords',
    icon: '🔷',
    category: '삼각비·각',
    fields: [
      { key: 'x1', term: 'x1', def: 2 }, { key: 'y1', term: 'y1', def: 1 },
      { key: 'x2', term: 'x2', def: 12 }, { key: 'y2', term: 'y2', def: 2 },
      { key: 'x3', term: 'x3', def: 11 }, { key: 'y3', term: 'y3', def: 9 },
      { key: 'x4', term: 'x4', def: 3 }, { key: 'y4', term: 'y4', def: 8 },
    ],
    formula: '{area} = |{x1}{y2} − {x2}{y1} + {x2}{y3} − {x3}{y2} + {x3}{y4} − {x4}{y3} + {x4}{y1} − {x1}{y4}| ÷ 2',
    compute: v => {
      const cross =
        v.x1 * v.y2 - v.x2 * v.y1 +
        v.x2 * v.y3 - v.x3 * v.y2 +
        v.x3 * v.y4 - v.x4 * v.y3 +
        v.x4 * v.y1 - v.x1 * v.y4;
      const side = [
        Math.hypot(v.x2 - v.x1, v.y2 - v.y1),
        Math.hypot(v.x3 - v.x2, v.y3 - v.y2),
        Math.hypot(v.x4 - v.x3, v.y4 - v.y3),
        Math.hypot(v.x1 - v.x4, v.y1 - v.y4),
      ];
      return [
        { term: 'area', unit: 'none', value: round(Math.abs(cross) / 2, 4), digits: 4, primary: true },
        { term: 'perimeter', unit: 'none', value: round(side[0] + side[1] + side[2] + side[3], 4), digits: 4 },
        { term: 'diagonal1', unit: 'none', value: round(Math.hypot(v.x3 - v.x1, v.y3 - v.y1), 4), digits: 4 },
        { term: 'diagonal2', unit: 'none', value: round(Math.hypot(v.x4 - v.x2, v.y4 - v.y2), 4), digits: 4 },
      ];
    },
    ko: { title: '좌표로 사각형 넓이 구하기', desc: '네 꼭짓점 좌표만으로 사각형의 넓이와 둘레를 구합니다.',
      long: '신발끈 공식입니다. 꼭짓점을 한 바퀴 도는 순서로 적고 x와 y를 엇갈려 곱해 더한 뒤, 그 차의 절반을 취합니다. 직사각형이 아니어도, 한쪽이 안으로 꺾여 있어도 그대로 맞습니다.',
      note: '꼭짓점은 시계 방향이든 반시계 방향이든 한 바퀴 도는 순서여야 합니다. 대각선끼리 이어 적으면 넓이가 작게 나옵니다.' },
    en: { title: 'Quadrilateral Area from Coordinates', desc: 'Area and perimeter of a four-sided shape from its corner coordinates.',
      long: 'This is the shoelace formula. List the corners in the order you walk around them, cross-multiply the x and y values, and halve the difference. It holds for shapes that are not rectangles and even for ones with a dent.',
      note: 'The corners must go around the shape, clockwise or anticlockwise. Listing them across a diagonal gives too small an area.' },
  },
  {
    slug: 'golden-ratio',
    icon: '🌀',
    category: '평면 도형',
    fields: [
      { key: 'len', term: 'totalLen', unit: 'cm', def: 100, min: 0 },
    ],
    formula: '{longPart} = {totalLen} ÷ 1.618034',
    compute: v => {
      const phi = (1 + Math.sqrt(5)) / 2;
      const long = v.len / phi;
      return [
        { term: 'longPart', unit: 'cm', value: round(long, 3), digits: 3, primary: true },
        { term: 'shortPart', unit: 'cm', value: round(v.len - long, 3), digits: 3 },
        { term: 'diff', unit: 'cm', value: round(2 * long - v.len, 3), digits: 3 },
      ];
    },
    ko: { title: '황금비 분할 계산기', desc: '길이를 황금비 1:1.618로 나눈 두 토막을 구합니다.',
      long: '전체를 1.618034로 나누면 긴 쪽이 나오고, 남은 것이 짧은 쪽입니다. 이렇게 자르면 전체와 긴 쪽의 비가 긴 쪽과 짧은 쪽의 비와 같아집니다 — 그래서 몇 번을 더 잘라도 같은 비가 이어집니다.',
      note: '표지 여백, 선반 위치, 화면 좌우 분할처럼 어디서 끊을지 정해야 할 때 기준으로 씁니다.' },
    en: { title: 'Golden Ratio Calculator', desc: 'Split a length into the golden ratio of 1 to 1.618.',
      long: 'Divide the whole by 1.618034 to get the longer piece; what is left is the shorter one. Cut this way and the whole is to the long part as the long part is to the short — so the same ratio repeats however often you cut again.',
      note: 'Handy for margins, shelf heights or splitting a layout when you need a defensible place to break.' },
  },

  /* ───────── 원·호 ───────── */
  {
    slug: 'ring-sector-area',
    icon: '🌙',
    category: '원·호',
    fields: [
      { key: 'R', term: 'radius', unit: 'cm', def: 20, min: 0 },
      { key: 'r', term: 'radius2', unit: 'cm', def: 12, min: 0 },
      { key: 'angle', term: 'angleDeg', unit: 'deg', def: 90, min: 0, max: 360 },
    ],
    formula: '{area} = π × ({radius}² − {radius2}²) × {angleDeg} ÷ 360',
    compute: v => {
      const share = v.angle / 360;
      const area = PI * (v.R * v.R - v.r * v.r) * share;
      const outer = 2 * PI * v.R * share;
      const inner = 2 * PI * v.r * share;
      return [
        { term: 'area', unit: 'cm2', value: round(Math.abs(area), 2), digits: 2, primary: true },
        { term: 'arcLen', unit: 'cm', value: round(outer, 2), digits: 2 },
        { term: 'perimeter', unit: 'cm', value: round(outer + inner + 2 * Math.abs(v.R - v.r), 2), digits: 2 },
      ];
    },
    ko: { title: '고리 부채꼴 넓이 계산기', desc: '도넛을 한 조각 자른 모양의 넓이와 둘레를 구합니다.',
      long: '바깥 부채꼴에서 안쪽 부채꼴을 뺀 모양입니다. 두 반지름의 제곱 차에 중심각의 몫을 곱하면 넓이가 나오고, 둘레는 바깥 호와 안쪽 호에 옆의 곧은 두 변을 더한 값입니다.',
      note: '원형 화단의 테두리 길, 회전 계단의 디딤판, 부채꼴로 자른 배관 보온재의 면적이 이 모양입니다.' },
    en: { title: 'Annular Sector Area Calculator', desc: 'Area and perimeter of a slice cut from a ring.',
      long: 'Take the outer sector and subtract the inner one. Multiply the difference of the squared radii by the angle’s share of the circle for the area; the perimeter adds both arcs plus the two straight edges.',
      note: 'This is the shape of a circular border path, a spiral stair tread, or pipe insulation cut as a wedge.' },
  },
  {
    slug: 'two-circles-overlap',
    icon: '⭕',
    category: '원·호',
    fields: [
      { key: 'r1', term: 'radius', unit: 'cm', def: 10, min: 0 },
      { key: 'r2', term: 'radius2', unit: 'cm', def: 8, min: 0 },
      { key: 'd', term: 'centerDist', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{area} = {radius}² × (α − sinα cosα) + {radius2}² × (β − sinβ cosβ)',
    compute: v => {
      const { r1, r2, d } = v;
      const small = Math.min(r1, r2);
      let area: number;
      if (d >= r1 + r2) area = 0;                       // 떨어져 있다
      else if (d <= Math.abs(r1 - r2)) area = PI * small * small;  // 하나가 다른 하나 안에 들어간다
      else {
        const a = Math.acos(ratio(d * d + r1 * r1 - r2 * r2, 2 * d * r1));
        const b = Math.acos(ratio(d * d + r2 * r2 - r1 * r1, 2 * d * r2));
        area = r1 * r1 * (a - Math.sin(a) * Math.cos(a)) + r2 * r2 * (b - Math.sin(b) * Math.cos(b));
      }
      return [
        { term: 'area', unit: 'cm2', value: round(area, 2), digits: 2, primary: true },
        { term: 'overlapPct', unit: 'percent', value: round(ratio(area, PI * small * small) * 100, 1), digits: 1 },
      ];
    },
    ko: { title: '두 원이 겹치는 넓이', desc: '반지름 둘과 중심 사이 거리로 겹친 부분의 넓이를 구합니다.',
      long: '겹친 부분은 두 활꼴을 붙여 놓은 렌즈 모양입니다. 각 원에서 코사인 법칙으로 반각을 구한 뒤 활꼴 넓이를 더합니다. 중심 거리가 두 반지름의 합보다 크면 아예 겹치지 않고, 차보다 작으면 작은 원이 통째로 들어갑니다.',
      note: '함께 나오는 비율은 작은 원 넓이 대비입니다 — 100%면 작은 원이 완전히 덮인 것입니다.' },
    en: { title: 'Circle Overlap Area', desc: 'Overlap of two circles from their radii and centre distance.',
      long: 'The overlap is a lens made of two circular segments. The law of cosines gives a half-angle in each circle, and the two segment areas add up. Beyond the sum of the radii the circles miss each other; below the difference the smaller one sits entirely inside.',
      note: 'The share is measured against the smaller circle — 100% means it is completely covered.' },
  },
  {
    slug: 'spiral-roll-length',
    icon: '🧻',
    category: '원·호',
    fields: [
      { key: 'D', term: 'diameter', unit: 'cm', def: 12, min: 0 },
      { key: 'd', term: 'smallDia', unit: 'cm', def: 4, min: 0 },
      { key: 't', term: 'thickness', unit: 'cm', def: 0.02, min: 0, step: 0.001 },
    ],
    // 지름·두께는 cm, 길이는 m
    formula: '{wound} = π × ({diameter}² − {smallDia}²) ÷ (4 × {thickness}) ÷ 100',
    compute: v => {
      const cm = ratio(PI * (v.D * v.D - v.d * v.d), 4 * v.t);
      return [
        { term: 'wound', unit: 'm', value: round(cm / 100, 2), digits: 2, primary: true },
        { term: 'turns', value: round(ratio(v.D - v.d, 2 * v.t), 0), digits: 0 },
        { term: 'area', unit: 'cm2', value: round((PI * (v.D * v.D - v.d * v.d)) / 4, 2), digits: 2 },
      ];
    },
    ko: { title: '감긴 롤 길이 계산기', desc: '바깥 지름·심지 지름·두께로 다 풀었을 때의 길이를 구합니다.',
      long: '감긴 단면의 면적을 두께로 나누면 길이가 됩니다. 나선을 한 겹씩 세는 대신 면적으로 세는 셈이라, 감김이 촘촘하기만 하면 오차가 1%도 안 됩니다.',
      note: '두께가 정확할수록 결과가 정확합니다. 마스킹 테이프는 0.13mm, 라벨지는 0.1mm 안팎입니다.' },
    en: { title: 'Rolled Length Calculator', desc: 'How long a roll is when unwound, from outer and core diameter plus thickness.',
      long: 'Divide the area of the wound cross-section by the material thickness. Counting by area rather than turn by turn keeps the error under one percent as long as the winding is tight.',
      note: 'Accuracy hangs on the thickness figure. Masking tape runs about 0.13 mm, label stock about 0.1 mm.' },
  },

  /* ───────── 입체 ───────── */
  {
    slug: 'cone-unroll-angle',
    icon: '📐',
    category: '입체 부피',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 10, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 24, min: 0 },
    ],
    formula: '{angleDeg} = 360 × {radius} ÷ √({radius}² + {heightGeo}²)',
    compute: v => {
      const slant = Math.hypot(v.r, v.h);
      return [
        { term: 'angleDeg', unit: 'deg', value: round(ratio(360 * v.r, slant), 2), digits: 2, primary: true },
        { term: 'slant', unit: 'cm', value: round(slant, 3), digits: 3 },
        { term: 'lateral', unit: 'cm2', value: round(PI * v.r * slant, 2), digits: 2 },
      ];
    },
    ko: { title: '원뿔 전개도 각도 계산기', desc: '원뿔을 펼쳤을 때 잘라야 할 부채꼴의 중심각을 구합니다.',
      long: '펼친 부채꼴의 반지름은 모선이고, 호의 길이는 밑면 둘레와 같아야 합니다. 그 둘의 비를 360°에 곱하면 오려낼 각도가 나옵니다.',
      note: '고깔모자, 깔때기, 원뿔 지붕을 종이나 판금으로 만들 때 그대로 씁니다. 겹쳐 붙일 여유분은 따로 더하세요.' },
    en: { title: 'Cone Layout Angle Calculator', desc: 'The sector angle to cut when flattening a cone.',
      long: 'Unrolled, the cone becomes a sector whose radius is the slant height and whose arc must equal the base circumference. Multiplying that ratio by 360° gives the angle to cut out.',
      note: 'Use it for party hats, funnels and conical roofs in paper or sheet metal. Add your own allowance for the glued or seamed overlap.' },
  },
  {
    slug: 'frustum-surface',
    icon: '🪣',
    category: '입체 부피',
    fields: [
      { key: 'R', term: 'radius', unit: 'cm', def: 12, min: 0 },
      { key: 'r', term: 'frustumTop', unit: 'cm', def: 8, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 15, min: 0 },
    ],
    formula: '{surface} = π × ({radius} + {frustumTop}) × {slant} + π{radius}² + π{frustumTop}²',
    compute: v => {
      const slant = Math.hypot(v.R - v.r, v.h);
      const lateral = PI * (v.R + v.r) * slant;
      return [
        { term: 'surface', unit: 'cm2', value: round(lateral + PI * (v.R * v.R + v.r * v.r), 2), digits: 2, primary: true },
        { term: 'lateral', unit: 'cm2', value: round(lateral, 2), digits: 2 },
        { term: 'slant', unit: 'cm', value: round(slant, 3), digits: 3 },
      ];
    },
    ko: { title: '원뿔대 겉넓이 계산기', desc: '위아래 반지름이 다른 통의 표면적을 구합니다.',
      long: '옆면은 두 반지름의 합에 모선을 곱하고 π를 곱한 값입니다. 모선은 높이가 아니라, 반지름 차와 높이로 만든 직각삼각형의 빗변이라는 점이 자주 틀리는 자리입니다.',
      note: '화분, 양동이, 종이컵처럼 위가 벌어진 그릇의 페인트·필름 소요량을 잴 때 씁니다.' },
    en: { title: 'Frustum Surface Area Calculator', desc: 'Surface area of a cone with the tip cut off.',
      long: 'The side is π times the sum of the two radii times the slant height. The catch is the slant: it is not the vertical height but the hypotenuse built from the height and the difference of the radii.',
      note: 'Use it for plant pots, buckets and cups when working out paint, film or wrap quantities.' },
  },
  {
    slug: 'barrel-volume',
    icon: '🛢️',
    category: '입체 부피',
    fields: [
      { key: 'D', term: 'diameter', unit: 'cm', def: 60, min: 0 },
      { key: 'd', term: 'smallDia', unit: 'cm', def: 50, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 90, min: 0 },
    ],
    formula: '{volume} = π × {heightGeo} × (2 × {diameter}² + {smallDia}²) ÷ 12',
    compute: v => {
      const cm3 = (PI * v.h * (2 * v.D * v.D + v.d * v.d)) / 12;
      return [
        { term: 'liters', unit: 'liter', value: round(cm3 / 1000, 2), digits: 2, primary: true },
        { term: 'waterKg', unit: 'kg2', value: round(cm3 / 1000, 1), digits: 1 },
        { term: 'volume', unit: 'cm3', value: round(cm3, 0), digits: 0 },
      ];
    },
    ko: { title: '통·배럴 부피 계산기', desc: '배가 부른 통의 용량을 위아래 지름과 높이로 구합니다.',
      long: '케플러가 술통을 재려고 만든 근사식입니다. 가운데가 불룩한 만큼 원통보다 크므로, 가운데 지름을 두 배로 세고 양 끝 지름을 한 번 세어 평균을 냅니다.',
      note: '오크통, 물통, 배가 부른 화분처럼 옆면이 곡선인 통에 씁니다. 곧은 원통은 물탱크 계산기가 더 정확합니다.' },
    en: { title: 'Barrel Volume Calculator', desc: 'Capacity of a bulging barrel from its two diameters and height.',
      long: 'Kepler devised this approximation for gauging wine casks. Because the middle bulges, the barrel holds more than a cylinder: the bulge diameter counts twice and the head diameter once.',
      note: 'Use it for casks, water butts and curved planters. For a straight-sided drum the cylinder calculator is more exact.' },
  },

  /* ───────── 생활 ───────── */
  {
    slug: 'horizontal-tank-volume',
    icon: '🚰',
    category: '생활 계산',
    fields: [
      { key: 'D', term: 'diameter', unit: 'cm', def: 100, min: 0 },
      { key: 'L', term: 'bodyLen', unit: 'cm', def: 200, min: 0 },
      { key: 'h', term: 'capHeight', unit: 'cm', def: 30, min: 0 },
    ],
    formula: '{liters} = ({radius}² × acos(({radius} − {capHeight}) ÷ {radius}) − ({radius} − {capHeight}) × √(2{radius}{capHeight} − {capHeight}²)) × {bodyLen} ÷ 1000',
    compute: v => {
      const r = v.D / 2;
      const h = Math.min(Math.max(v.h, 0), 2 * r);
      const gap = r - h;
      const seg = r > 0
        ? r * r * Math.acos(Math.min(1, Math.max(-1, ratio(gap, r)))) - gap * Math.sqrt(Math.max(0, 2 * r * h - h * h))
        : 0;
      const cm3 = seg * v.L;
      const full = PI * r * r * v.L;
      return [
        { term: 'liters', unit: 'liter', value: round(cm3 / 1000, 2), digits: 2, primary: true },
        { term: 'fillPercent', unit: 'percent', value: round(ratio(cm3, full) * 100, 1), digits: 1 },
        { term: 'waterKg', unit: 'kg2', value: round(cm3 / 1000, 1), digits: 1 },
      ];
    },
    ko: { title: '눕힌 원통 탱크 잔량 계산기', desc: '옆으로 누운 탱크에 남은 물의 양을 액체 높이로 구합니다.',
      long: '눕힌 탱크는 높이와 잔량이 비례하지 않습니다. 단면이 활꼴이라 가운데가 넓고 위아래가 좁아서, 절반 높이일 때만 정확히 절반입니다. 활꼴 넓이를 구해 몸통 길이를 곱합니다.',
      note: '눈금자로 잰 높이를 넣으세요. 절반보다 낮으면 눈으로 짐작한 것보다 훨씬 적게 남아 있습니다.' },
    en: { title: 'Horizontal Tank Volume Calculator', desc: 'Liquid left in a tank lying on its side, from the depth you measure.',
      long: 'In a tank on its side, depth and volume are not proportional. The cross-section is a circular segment — wide in the middle, narrow top and bottom — so only the halfway mark is exactly half full. Work out the segment area and multiply by the barrel length.',
      note: 'Enter the depth read off a dipstick. Below halfway there is far less left than the level suggests.' },
  },
  {
    slug: 'miter-angle',
    icon: '🖼️',
    category: '생활 계산',
    fields: [
      { key: 'n', term: 'sideCount', def: 4, min: 3, max: 24, step: 1 },
      { key: 'side', term: 'sideLen', unit: 'cm', def: 50, min: 0 },
    ],
    formula: '{angleDeg} = 180 ÷ {sideCount}',
    compute: v => [
      { term: 'angleDeg', unit: 'deg', value: round(ratio(180, v.n), 2), digits: 2, primary: true },
      { term: 'innerAngle', unit: 'deg', value: round(ratio(180 * (v.n - 2), v.n), 2), digits: 2 },
      { term: 'perimeter', unit: 'cm', value: round(v.n * v.side, 1), digits: 1 },
    ],
    ko: { title: '액자 마이터 각도 계산기', desc: '변이 몇 개인 틀을 짤 때 톱을 몇 도로 기울일지 구합니다.',
      long: '두 조각이 만나며 꺾이는 바깥쪽 각, 곧 외각이 360÷n입니다. 조각마다 그 절반씩 잘라 내므로 톱 각도는 180÷n이고, 안쪽에 남는 한 내각은 180×(n−2)÷n이 됩니다. 네모 액자가 45°인 것은 외각 90°의 절반이기 때문입니다.',
      note: '마이터 톱의 눈금은 90°에서 얼마나 돌렸는지를 가리키는 경우가 많습니다. 육각(30°)이면 눈금은 60°일 수 있으니 시험 재단을 먼저 하세요.' },
    en: { title: 'Miter Angle Calculator', desc: 'The saw angle for joining a frame with any number of sides.',
      long: 'The outside turn where two pieces meet — the exterior angle — is 360÷n. Each piece takes half of it, so the saw angle is 180÷n, while the interior angle left inside is 180×(n−2)÷n. A square frame is cut at 45° because that is half of a 90° turn.',
      note: 'Many miter saws read the angle away from 90° instead. A hexagon needs 30°, which may show as 60° on the scale, so cut a test piece first.' },
  },
  {
    slug: 'ramp-length',
    icon: '♿',
    category: '생활 계산',
    fields: [
      { key: 'rise', term: 'riseLen', unit: 'cm', def: 15, min: 0 },
      { key: 'n', term: 'slopeRatio', def: 12, min: 0, step: 0.5 },
    ],
    formula: '{hypotenuse} = √({riseLen}² + ({riseLen} × {slopeRatio})²)',
    compute: v => {
      const run = v.rise * v.n;
      return [
        { term: 'hypotenuse', unit: 'cm', value: round(Math.hypot(v.rise, run), 1), digits: 1, primary: true },
        { term: 'runLen', unit: 'cm', value: round(run, 1), digits: 1 },
        { term: 'slopePct', unit: 'percent', value: round(ratio(100, v.n), 2), digits: 2 },
        { term: 'angleDeg', unit: 'deg', value: round(Math.atan2(v.rise, run) * R2D, 2), digits: 2 },
      ];
    },
    verdict: (v) => {
      if (v.n <= 0) return null;
      if (v.n >= 12) {
        return {
          tone: 'good',
          ko: '1:12 이하 기울기로, 휠체어가 혼자 오를 수 있는 완만함입니다.',
          en: 'At 1:12 or gentler, this is a slope a wheelchair user can manage unaided.',
          l10n: {
            es: 'Con 1:12 o menos, es una pendiente que una silla de ruedas puede subir sola.',
            'pt-br': 'Com 1:12 ou menos, é uma rampa que uma cadeira de rodas sobe sozinha.',
            ja: '1:12以下の緩やかさで、車椅子が自力で上れる勾配です。',
            de: 'Mit 1:12 oder flacher schafft ein Rollstuhl die Steigung ohne Hilfe.',
            fr: 'À 1:12 ou moins, une personne en fauteuil peut monter seule.',
            hi: '1:12 या उससे कम ढाल पर व्हीलचेयर बिना मदद के चढ़ सकती है।',
            'zh-hans': '坡度在 1:12 以内，轮椅可以自行上下。',
            'zh-hant': '坡度在 1:12 以內，輪椅可以自行上下。',
          },
        };
      }
      if (v.n >= 8) {
        return {
          tone: 'warn',
          ko: '1:12보다 가파릅니다. 짧은 구간이거나 밀어 줄 사람이 있을 때만 씁니다.',
          en: 'Steeper than 1:12 — use it only for short runs or when someone can push.',
          l10n: {
            es: 'Más inclinada que 1:12: solo para tramos cortos o con alguien que empuje.',
            'pt-br': 'Mais íngreme que 1:12: só em trechos curtos ou com alguém empurrando.',
            ja: '1:12より急です。短い区間か、押す人がいるときだけにしてください。',
            de: 'Steiler als 1:12 — nur für kurze Abschnitte oder mit Schiebehilfe.',
            fr: 'Plus raide que 1:12 : à réserver aux courtes longueurs ou avec de l’aide.',
            hi: '1:12 से अधिक ढाल है — केवल छोटे हिस्से या धक्का देने वाले के साथ।',
            'zh-hans': '比 1:12 更陡，只适合短距离或有人推行时使用。',
            'zh-hant': '比 1:12 更陡，只適合短距離或有人推行時使用。',
          },
        };
      }
      return {
        tone: 'bad',
        ko: '너무 가파릅니다. 휠체어로는 위험하고 짐수레도 되밀립니다.',
        en: 'Too steep — unsafe for a wheelchair and a loaded trolley will roll back.',
        l10n: {
          es: 'Demasiado inclinada: peligrosa en silla de ruedas y el carro se va hacia atrás.',
          'pt-br': 'Íngreme demais: perigosa para cadeira de rodas e o carrinho volta.',
          ja: '急すぎます。車椅子には危険で、台車も押し戻されます。',
          de: 'Zu steil — für Rollstühle gefährlich, und ein beladener Wagen rollt zurück.',
          fr: 'Trop raide : dangereux en fauteuil et un chariot chargé recule.',
          hi: 'बहुत अधिक ढाल — व्हीलचेयर के लिए खतरनाक और भरी ट्रॉली पीछे लुढ़केगी।',
          'zh-hans': '太陡了，轮椅不安全，装载的推车也会后溜。',
          'zh-hant': '太陡了，輪椅不安全，裝載的推車也會後溜。',
        },
      };
    },
    ko: { title: '경사로 길이 계산기', desc: '올라갈 높이와 경사 비율로 경사로의 길이를 구합니다.',
      long: '1:12는 1cm 오르는 데 12cm를 간다는 뜻입니다. 수평 거리는 높이에 그 값을 곱한 것이고, 실제 판의 길이는 높이와 수평 거리로 만든 직각삼각형의 빗변입니다.',
      note: '휠체어 경사로의 표준은 1:12입니다. 높이 15cm면 수평으로 180cm가 필요하니 자리가 되는지 먼저 재세요.' },
    en: { title: 'Ramp Length Calculator', desc: 'Ramp length from the height to climb and the slope ratio.',
      long: 'A 1:12 slope travels 12 cm forward for every 1 cm of rise. The run is the height times that figure, and the board itself is the hypotenuse of the triangle made by rise and run.',
      note: 'The usual wheelchair standard is 1:12. A 15 cm step needs 180 cm of run, so check the space before you buy.' },
  },
  {
    slug: 'earth-distance',
    icon: '🌍',
    category: '삼각비·각',
    fields: [
      { key: 'lat1', term: 'lat1', unit: 'deg', def: 37.5665, min: -90, max: 90, step: 0.0001 },
      { key: 'lon1', term: 'lon1', unit: 'deg', def: 126.978, min: -180, max: 180, step: 0.0001 },
      { key: 'lat2', term: 'lat2', unit: 'deg', def: 35.1796, min: -90, max: 90, step: 0.0001 },
      { key: 'lon2', term: 'lon2', unit: 'deg', def: 129.0756, min: -180, max: 180, step: 0.0001 },
    ],
    formula: '{distanceKm} = 2 × 6371 × asin(√(sin²(Δ{lat1}÷2) + cos{lat1} × cos{lat2} × sin²(Δ{lon1}÷2)))',
    compute: v => {
      const p1 = v.lat1 * D2R, p2 = v.lat2 * D2R;
      const dp = (v.lat2 - v.lat1) * D2R, dl = (v.lon2 - v.lon1) * D2R;
      const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
      const km = 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(a)));
      const y = Math.sin(dl) * Math.cos(p2);
      const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
      return [
        { term: 'distanceKm', unit: 'km', value: round(km, 2), digits: 2, primary: true },
        { term: 'bearingDeg', unit: 'deg', value: round((Math.atan2(y, x) * R2D + 360) % 360, 1), digits: 1 },
      ];
    },
    ko: { title: '위경도 두 점 사이 거리', desc: '위도·경도 두 쌍으로 지구 위 직선 거리를 구합니다.',
      long: '지구가 둥글어서 평면 좌표처럼 빼서는 안 됩니다. 하버사인 공식은 두 점을 잇는 큰원 호의 길이를 재는데, 위도 차와 경도 차를 반각의 사인으로 묶어 극 근처에서도 값이 무너지지 않게 합니다.',
      note: '지도 앱이 알려 주는 도로 거리가 아니라 직선 거리입니다. 함께 나오는 방위각은 출발점에서 바라볼 방향입니다.' },
    en: { title: 'Distance Between Coordinates', desc: 'Straight-line distance on Earth between two latitude and longitude pairs.',
      long: 'The Earth is round, so you cannot simply subtract the coordinates. The haversine formula measures the great-circle arc joining the two points, folding the latitude and longitude gaps into half-angle sines so the result holds up near the poles.',
      note: 'This is the direct distance, not the road distance a map app gives. The bearing shown is the direction to face at the start.' },
  },
];
