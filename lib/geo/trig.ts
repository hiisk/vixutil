/** 도형 - 삼각비·각 (10종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;
const deg = (rad: number) => (rad * 180) / PI;
const rad = (d: number) => (d * PI) / 180;

export const TRIG_TOOLS: FormulaTool[] = [
  {
    slug: 'pythagoras',
    icon: '📐',
    category: '삼각비·각',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 3, min: 0 },
      { key: 'b', term: 'sideB', unit: 'cm', def: 4, min: 0 },
    ],
    formula: '{hypotenuse} = √({sideA}² + {sideB}²)',
    compute: v => {
      const c = Math.sqrt(v.a ** 2 + v.b ** 2);
      return [
        { term: 'hypotenuse', unit: 'cm', value: round(c, 4), digits: 4, primary: true },
        { term: 'area', unit: 'cm2', value: round((v.a * v.b) / 2, 2), digits: 2 },
        { term: 'angleDeg', unit: 'deg', value: round(deg(Math.atan2(v.a, v.b)), 2), digits: 2 },
      ];
    },
    ko: { title: '피타고라스 정리 계산기', desc: '직각을 낀 두 변으로 빗변 길이를 구합니다.',
      long: '두 변을 각각 제곱해 더한 뒤 제곱근을 씌우면 빗변입니다. 3과 4를 넣으면 정확히 5가 나옵니다.',
      note: '함께 나오는 각도는 변 a를 마주보는 각입니다. 직각을 낀 변끼리만 넣어야 합니다.' },
    en: { title: 'Pythagorean Theorem', desc: 'Find the hypotenuse from the two legs of a right triangle.',
      long: 'Square both legs, add them, take the square root. Enter 3 and 4 and you get exactly 5.',
      note: 'The angle shown is the one opposite side a. Only the two legs adjoining the right angle belong in the inputs.' },
    zh: { title: '勾股定理计算器', desc: '用直角三角形的两条直角边求斜边。',
      long: '把两边分别平方后相加，再开平方根就是斜边。填3和4正好得到5。',
      note: '一并给出的角是边a的对角。输入必须是夹直角的两条边。' },
  },
  {
    slug: 'pythagoras-leg',
    icon: '📏',
    category: '삼각비·각',
    fields: [
      { key: 'c', term: 'hypotenuse', unit: 'cm', def: 13, min: 0 },
      { key: 'a', term: 'sideA', unit: 'cm', def: 5, min: 0 },
    ],
    formula: '{sideB} = √({hypotenuse}² − {sideA}²)',
    compute: v => {
      const inner = v.c ** 2 - v.a ** 2;
      return [
        { term: 'sideB', unit: 'cm', value: round(inner > 0 ? Math.sqrt(inner) : 0, 4), digits: 4, primary: true },
        { term: 'angleDeg', unit: 'deg', value: round(v.c > 0 ? deg(Math.asin(Math.min(1, ratio(v.a, v.c)))) : 0, 2), digits: 2 },
      ];
    },
    verdict: v => v.a >= v.c ? {
      ko: '빗변은 다른 어떤 변보다 길어야 합니다. 값을 바꿔 넣으세요.',
      en: 'The hypotenuse must be longer than either leg — swap the values.',
      zh: '斜边必须比任一直角边长 — 请调换数值。',
      tone: 'bad',
    } : null,
    ko: { title: '직각삼각형 나머지 변', desc: '빗변과 한 변으로 남은 변의 길이를 구합니다.',
      long: '빗변의 제곱에서 아는 변의 제곱을 빼고 제곱근을 씌웁니다. 사다리를 벽에 세울 때 벽까지의 거리를 구하는 계산이 이것입니다.',
      note: '빗변이 가장 긴 변입니다. 빗변보다 긴 변을 넣으면 결과가 0으로 나옵니다.' },
    en: { title: 'Missing Leg of a Right Triangle', desc: 'Find the remaining side from the hypotenuse and one leg.',
      long: 'Subtract the known leg squared from the hypotenuse squared and take the root. This is how you work out how far a leaning ladder’s base sits from the wall.',
      note: 'The hypotenuse is always the longest side — entering a longer leg returns zero.' },
    zh: { title: '直角三角形求另一边', desc: '用斜边和一条直角边求剩下的那条边。',
      long: '用斜边的平方减去已知边的平方，再开平方根。计算靠墙梯子底部离墙多远，用的就是这个。',
      note: '斜边永远是最长边 — 若填入比斜边更长的边，结果会是0。' },
  },
  {
    slug: 'right-triangle-angle',
    icon: '🔺',
    category: '삼각비·각',
    fields: [
      { key: 'opp', term: 'riseLen', unit: 'cm', def: 3, min: 0 },
      { key: 'adj', term: 'runLen', unit: 'cm', def: 4, min: 0 },
    ],
    formula: '{angleDeg} = atan({riseLen} ÷ {runLen}) × 180 ÷ π',
    compute: v => {
      const a = deg(Math.atan2(v.opp, v.adj));
      return [
        { term: 'angleDeg', unit: 'deg', value: round(a, 3), digits: 3, primary: true },
        { term: 'angleRad', unit: 'rad', value: round(rad(a), 4), digits: 4 },
        { term: 'hypotenuse', unit: 'cm', value: round(Math.sqrt(v.opp ** 2 + v.adj ** 2), 3), digits: 3 },
      ];
    },
    ko: { title: '두 변으로 각도 구하기', desc: '높이와 수평 거리로 기울어진 각도를 구합니다.',
      long: '높이를 수평 거리로 나눈 값이 탄젠트이고, 그 역함수가 각도입니다. 3:4면 36.87°입니다.',
      note: '경사로·계단·지붕의 각도를 잴 때 씁니다. 각도를 경사도(%)로 보려면 경사도 계산기를 쓰세요.' },
    en: { title: 'Angle from Two Sides', desc: 'Get the angle of a slope from its rise and run.',
      long: 'Rise divided by run is the tangent; the inverse tangent gives the angle. A 3:4 slope is 36.87°.',
      note: 'Use it for ramps, stairs and roof pitches. To express the same slope as a percentage, use the grade calculator.' },
    zh: { title: '由两边求角度', desc: '用垂直高度和水平距离求倾斜角度。',
      long: '高度除以水平距离是正切值，取反正切即为角度。3:4的坡度是36.87°。',
      note: '适用于坡道、楼梯和屋顶坡度。要换成百分比坡度，请用坡度计算器。' },
  },
  {
    slug: 'trig-values',
    icon: '🌊',
    category: '삼각비·각',
    fields: [{ key: 'angle', term: 'angleDeg', unit: 'deg', def: 30, min: -360, max: 360, step: 0.5 }],
    formula: '{sinVal} = sin({angleDeg}),  {cosVal} = cos({angleDeg}),  {tanVal} = tan({angleDeg})',
    compute: v => {
      const r = rad(v.angle);
      const t = Math.abs(Math.cos(r)) < 1e-12 ? 0 : Math.tan(r);
      return [
        { term: 'sinVal', value: round(Math.sin(r), 6), digits: 6, primary: true },
        { term: 'cosVal', value: round(Math.cos(r), 6), digits: 6 },
        { term: 'tanVal', value: round(t, 6), digits: 6 },
      ];
    },
    verdict: v => Math.abs(((v.angle % 180) + 180) % 180 - 90) < 1e-9 ? {
      ko: '90°와 270°에서 tan은 정의되지 않습니다 — 표에는 0으로 표시했습니다.',
      en: 'Tangent is undefined at 90° and 270° — it is shown as 0 here.',
      zh: '在90°和270°处正切无定义 — 此处显示为0。',
      tone: 'warn',
    } : null,
    ko: { title: '삼각비 값 계산기', desc: '각도를 넣으면 sin·cos·tan 값을 한 번에 봅니다.',
      long: '30°의 sin은 0.5, cos은 0.866, tan은 0.577입니다. 각도를 라디안으로 바꿔 계산하며 소수 여섯 자리까지 보여줍니다.',
      note: 'tan은 90°와 270°에서 무한대로 발산해 정의되지 않습니다.' },
    en: { title: 'Trig Function Values', desc: 'Enter an angle and see sine, cosine and tangent at once.',
      long: 'At 30°, sine is 0.5, cosine 0.866 and tangent 0.577. The angle is converted to radians internally and shown to six decimals.',
      note: 'Tangent diverges to infinity at 90° and 270°, where it is undefined.' },
    zh: { title: '三角函数值计算器', desc: '输入角度，一次查看sin、cos、tan的值。',
      long: '30°的sin是0.5，cos是0.866，tan是0.577。内部先换算成弧度，结果保留六位小数。',
      note: 'tan在90°和270°处发散为无穷，无定义。' },
  },
  {
    slug: 'slope-grade',
    icon: '⛰️',
    category: '삼각비·각',
    fields: [
      { key: 'rise', term: 'riseLen', unit: 'm', def: 1, min: 0, step: 0.1 },
      { key: 'run', term: 'runLen', unit: 'm', def: 12, min: 0, step: 0.1 },
    ],
    formula: '{slopePct} = {riseLen} ÷ {runLen} × 100',
    compute: v => {
      const pct = ratio(v.rise, v.run) * 100;
      return [
        { term: 'slopePct', unit: 'percent', value: round(pct, 2), digits: 2, primary: true },
        { term: 'angleDeg', unit: 'deg', value: round(deg(Math.atan2(v.rise, v.run)), 2), digits: 2 },
        { term: 'distance', unit: 'm', value: round(Math.sqrt(v.rise ** 2 + v.run ** 2), 3), digits: 3 },
      ];
    },
    ko: { title: '경사도 계산기', desc: '수직 높이와 수평 거리로 경사도(%)와 각도를 구합니다.',
      long: '경사도는 높이를 수평 거리로 나눈 백분율입니다. 100%가 45°이고, 8.33%(1:12)가 휠체어 경사로의 국내 권장 기준입니다.',
      note: '경사도와 각도는 비례하지 않습니다. 경사도 100%는 90°가 아니라 45°입니다.' },
    en: { title: 'Slope Grade Calculator', desc: 'Convert rise over run into a percentage grade and an angle.',
      long: 'Grade is rise divided by run as a percentage. 100% equals 45°, and 8.33% (1:12) is the usual accessible-ramp standard.',
      note: 'Grade and angle are not proportional — a 100% grade is 45°, not 90°.' },
    zh: { title: '坡度计算器', desc: '用垂直高度和水平距离求坡度(%)和角度。',
      long: '坡度是高度除以水平距离的百分比。100%等于45°，8.33%(1:12)是常见的无障碍坡道标准。',
      note: '坡度与角度并不成正比 — 坡度100%是45°，不是90°。' },
  },
  {
    slug: 'distance-2d',
    icon: '📍',
    category: '삼각비·각',
    fields: [
      { key: 'x1', term: 'x1', def: 1, step: 0.5 },
      { key: 'y1', term: 'y1', def: 2, step: 0.5 },
      { key: 'x2', term: 'x2', def: 7, step: 0.5 },
      { key: 'y2', term: 'y2', def: 10, step: 0.5 },
    ],
    formula: '{distance} = √(({x2}−{x1})² + ({y2}−{y1})²)',
    compute: v => [
      { term: 'distance', value: round(Math.hypot(v.x2 - v.x1, v.y2 - v.y1), 4), digits: 4, primary: true },
      { term: 'angleDeg', unit: 'deg', value: round(deg(Math.atan2(v.y2 - v.y1, v.x2 - v.x1)), 2), digits: 2 },
    ],
    ko: { title: '두 점 사이 거리 계산기', desc: '좌표 두 개로 직선 거리와 방향 각도를 구합니다.',
      long: 'x 차이와 y 차이를 각각 제곱해 더한 뒤 제곱근을 씌웁니다 — 피타고라스 정리를 좌표에 그대로 적용한 것입니다.',
      note: '(1,2)와 (7,10)의 거리는 10입니다. 각도는 x축 기준 반시계 방향입니다.' },
    en: { title: 'Distance Between Two Points', desc: 'Straight-line distance and bearing from two coordinates.',
      long: 'Square the x-difference and the y-difference, add, take the root — the Pythagorean theorem applied to coordinates.',
      note: 'From (1,2) to (7,10) the distance is exactly 10. The angle is measured counter-clockwise from the x-axis.' },
    zh: { title: '两点间距离计算器', desc: '用两个坐标求直线距离和方向角。',
      long: '把x之差和y之差分别平方后相加再开平方根 — 就是把勾股定理用在坐标上。',
      note: '(1,2)到(7,10)的距离正好是10。角度以x轴为基准逆时针计量。' },
  },
  {
    slug: 'midpoint',
    icon: '🎯',
    category: '삼각비·각',
    fields: [
      { key: 'x1', term: 'x1', def: 2, step: 0.5 },
      { key: 'y1', term: 'y1', def: 4, step: 0.5 },
      { key: 'x2', term: 'x2', def: 8, step: 0.5 },
      { key: 'y2', term: 'y2', def: 10, step: 0.5 },
    ],
    formula: '{midX} = ({x1} + {x2}) ÷ 2,  {midY} = ({y1} + {y2}) ÷ 2',
    compute: v => [
      { term: 'midX', value: round((v.x1 + v.x2) / 2, 4), digits: 4, primary: true },
      { term: 'midY', value: round((v.y1 + v.y2) / 2, 4), digits: 4 },
      { term: 'distance', value: round(Math.hypot(v.x2 - v.x1, v.y2 - v.y1), 4), digits: 4 },
    ],
    ko: { title: '두 점의 중점 계산기', desc: '좌표 두 개의 정확한 가운데 점을 구합니다.',
      long: 'x끼리 평균, y끼리 평균을 내면 중점입니다. 선분을 반으로 나누는 점이라 도면 작업에서 자주 씁니다.',
      note: '세 점 이상의 무게중심은 모든 좌표의 평균으로 구합니다. 중점은 두 점일 때의 특수한 경우입니다.' },
    en: { title: 'Midpoint Calculator', desc: 'The exact centre point between two coordinates.',
      long: 'Average the x values and average the y values. It is the point that halves the segment, which comes up constantly in drafting.',
      note: 'For three or more points, the centroid is the mean of all coordinates — the midpoint is just the two-point case.' },
    zh: { title: '中点计算器', desc: '求两个坐标之间的精确中点。',
      long: 'x取平均、y取平均即为中点。它是把线段等分的点，在制图中经常用到。',
      note: '三个以上点的重心是所有坐标的平均值 — 中点只是两点时的特例。' },
  },
  {
    slug: 'polygon-angle',
    icon: '🧮',
    category: '삼각비·각',
    fields: [{ key: 'n', term: 'sideCount', def: 8, min: 3, max: 1000, step: 1 }],
    formula: '{innerAngle} = ({sideCount} − 2) × 180 ÷ {sideCount}',
    compute: v => {
      const n = Math.max(3, Math.round(v.n));
      return [
        { term: 'innerAngle', unit: 'deg', value: round(((n - 2) * 180) / n, 3), digits: 3, primary: true },
        { term: 'outerAngle', unit: 'deg', value: round(360 / n, 3), digits: 3 },
        { term: 'angleSum', unit: 'deg', value: (n - 2) * 180, digits: 0 },
      ];
    },
    ko: { title: '정다각형 내각 계산기', desc: '변의 수로 한 내각·한 외각·내각의 합을 구합니다.',
      long: '내각의 합은 (변의 수 − 2) × 180°이고, 정다각형이면 이를 변의 수로 나눈 값이 한 내각입니다. 외각의 합은 변의 수와 무관하게 항상 360°입니다.',
      note: '정팔각형의 한 내각은 135°입니다. 변이 많아질수록 내각은 180°에 가까워집니다.' },
    en: { title: 'Polygon Angle Calculator', desc: 'Interior angle, exterior angle and angle sum from the side count.',
      long: 'The interior angles sum to (n − 2) × 180°, and in a regular polygon each one is that divided by n. Exterior angles always total 360°, whatever n is.',
      note: 'A regular octagon has 135° interior angles. As sides increase, each interior angle approaches 180°.' },
    zh: { title: '正多边形内角计算器', desc: '用边数求单个内角、单个外角和内角之和。',
      long: '内角和是(边数−2)×180°，正多边形中每个内角就是它除以边数。外角之和无论边数多少都恒为360°。',
      note: '正八边形的内角是135°。边数越多，每个内角越接近180°。' },
  },
  {
    slug: 'degree-radian',
    icon: '🔄',
    category: '삼각비·각',
    fields: [{ key: 'd', term: 'angleDeg', unit: 'deg', def: 180, min: -3600, max: 3600, step: 1 }],
    formula: '{angleRad} = {angleDeg} × π ÷ 180',
    compute: v => [
      { term: 'angleRad', unit: 'rad', value: round(rad(v.d), 6), digits: 6, primary: true },
      { term: 'result', value: round(ratio(v.d, 180), 4), digits: 4 },
    ],
    ko: { title: '도 ↔ 라디안 변환', desc: '각도를 라디안으로, 그리고 π의 몇 배인지 함께 봅니다.',
      long: '180°가 π라디안이므로 각도에 π/180을 곱합니다. 아래 값이 π의 배수라서 π/2, 2π 같은 표기와 바로 맞춰볼 수 있습니다.',
      note: '프로그래밍 언어의 삼각함수는 거의 모두 라디안을 받습니다. 도를 그대로 넣으면 엉뚱한 값이 나옵니다.' },
    en: { title: 'Degrees to Radians', desc: 'Convert an angle to radians and see it as a multiple of π.',
      long: 'Since 180° is π radians, multiply degrees by π/180. The second figure is the multiple of π, so you can match π/2 or 2π at a glance.',
      note: 'Trig functions in nearly every programming language take radians — passing degrees silently gives wrong answers.' },
    zh: { title: '度与弧度换算', desc: '把角度换成弧度，并显示它是π的多少倍。',
      long: '因为180°等于π弧度，把度数乘以π/180即可。第二个数值是π的倍数，便于直接对照π/2、2π等写法。',
      note: '几乎所有编程语言的三角函数都接受弧度 — 直接传入度数会得到错误结果。' },
  },
  {
    slug: 'cosine-rule',
    icon: '🔻',
    category: '삼각비·각',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 7, min: 0 },
      { key: 'b', term: 'sideB', unit: 'cm', def: 8, min: 0 },
      { key: 'c', term: 'sideC', unit: 'cm', def: 9, min: 0 },
    ],
    formula: '{angleDeg} = acos(({sideB}² + {sideC}² − {sideA}²) ÷ (2 × {sideB} × {sideC}))',
    compute: v => {
      const cosA = ratio(v.b ** 2 + v.c ** 2 - v.a ** 2, 2 * v.b * v.c);
      const A = deg(Math.acos(Math.max(-1, Math.min(1, cosA))));
      const cosB = ratio(v.a ** 2 + v.c ** 2 - v.b ** 2, 2 * v.a * v.c);
      const B = deg(Math.acos(Math.max(-1, Math.min(1, cosB))));
      return [
        { term: 'angleDeg', unit: 'deg', value: round(A, 3), digits: 3, primary: true },
        { term: 'innerAngle', unit: 'deg', value: round(B, 3), digits: 3 },
        { term: 'outerAngle', unit: 'deg', value: round(180 - A - B, 3), digits: 3 },
      ];
    },
    ko: { title: '코사인 법칙 계산기', desc: '세 변 길이로 삼각형의 세 각을 모두 구합니다.',
      long: '직각삼각형이 아니어도 세 변만 알면 각을 구할 수 있습니다. 한 각의 코사인은 나머지 두 변의 제곱합에서 마주보는 변의 제곱을 뺀 값을 2배 곱으로 나눈 것입니다.',
      note: '가장 긴 변을 마주보는 각이 가장 큽니다. 그 각이 90°를 넘으면 둔각삼각형입니다.' },
    en: { title: 'Law of Cosines Calculator', desc: 'Find all three angles of a triangle from its three sides.',
      long: 'You do not need a right angle — three sides are enough. The cosine of an angle is the sum of the other two sides squared, minus the opposite side squared, over twice their product.',
      note: 'The angle facing the longest side is the largest; if it exceeds 90° the triangle is obtuse.' },
    zh: { title: '余弦定理计算器', desc: '用三条边长求出三角形的三个角。',
      long: '不需要直角，只要知道三边即可。某角的余弦等于另外两边的平方和减去对边的平方，再除以两边乘积的两倍。',
      note: '最长边所对的角最大；若该角超过90°，则为钝角三角形。' },
  },
];
