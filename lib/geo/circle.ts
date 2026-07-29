/** 도형 - 원·호 (6종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;
const rad = (d: number) => (d * PI) / 180;

export const CIRCLE_TOOLS: FormulaTool[] = [
  {
    slug: 'arc-length',
    icon: '🌈',
    category: '원·호',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 20, min: 0 },
      { key: 'angle', term: 'angleDeg', unit: 'deg', def: 90, min: 0, max: 360 },
    ],
    formula: '{arcLen} = 2π × {radius} × {angleDeg} ÷ 360',
    compute: v => [
      { term: 'arcLen', unit: 'cm', value: round((2 * PI * v.r * v.angle) / 360, 3), digits: 3, primary: true },
      { term: 'angleRad', unit: 'rad', value: round(rad(v.angle), 4), digits: 4 },
      { term: 'circumference', unit: 'cm', value: round(2 * PI * v.r, 2), digits: 2 },
    ],
    ko: { title: '호의 길이 계산기', desc: '반지름과 중심각으로 원호의 길이를 구합니다.',
      long: '호는 둘레의 일부이므로 전체 둘레에 중심각/360을 곱합니다. 라디안을 쓰면 반지름 곱하기 각도로 더 간단해집니다.',
      note: '곡선 재단이나 원형 화단의 둘레 일부를 계산할 때 씁니다.' },
    en: { title: 'Arc Length Calculator', desc: 'Length of a circular arc from radius and central angle.',
      long: 'An arc is a fraction of the circumference, so multiply the full circumference by angle over 360. In radians it simplifies to radius times angle.',
      note: 'Useful for curved cuts or measuring part of a circular border.' },
    zh: { title: '弧长计算器', desc: '用半径和圆心角求圆弧的长度。',
      long: '弧是周长的一部分，把整个周长乘以「圆心角除以360」即可。用弧度时更简单，就是半径乘角度。',
      note: '适用于曲线裁切或计算圆形花坛的一段边长。' },
  },
  {
    slug: 'chord-length',
    icon: '🎻',
    category: '원·호',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 20, min: 0 },
      { key: 'angle', term: 'angleDeg', unit: 'deg', def: 90, min: 0, max: 360 },
    ],
    formula: '{chordLen} = 2 × {radius} × sin({angleDeg} ÷ 2)',
    compute: v => {
      const chord = 2 * v.r * Math.sin(rad(v.angle) / 2);
      return [
        { term: 'chordLen', unit: 'cm', value: round(chord, 3), digits: 3, primary: true },
        { term: 'arcLen', unit: 'cm', value: round((2 * PI * v.r * v.angle) / 360, 3), digits: 3 },
        { term: 'heightGeo', unit: 'cm', value: round(v.r * (1 - Math.cos(rad(v.angle) / 2)), 3), digits: 3 },
      ];
    },
    ko: { title: '현의 길이 계산기', desc: '반지름과 중심각으로 원을 가로지르는 직선의 길이를 구합니다.',
      long: '현은 호의 두 끝을 잇는 직선입니다. 중심각이 180°면 지름과 같아지고, 함께 나오는 높이는 호와 현 사이의 최대 간격입니다.',
      note: '현은 항상 호보다 짧습니다. 두 값의 차이가 곡률이 얼마나 심한지를 알려줍니다.' },
    en: { title: 'Chord Length Calculator', desc: 'Length of the straight line across a circle for a given angle.',
      long: 'A chord joins the two ends of an arc. At 180° it equals the diameter, and the height shown is the maximum gap between arc and chord.',
      note: 'A chord is always shorter than its arc — the gap between them tells you how sharp the curve is.' },
    zh: { title: '弦长计算器', desc: '用半径和圆心角求横跨圆的直线长度。',
      long: '弦连接弧的两个端点。圆心角为180°时弦等于直径，一并给出的高度是弧与弦之间的最大间距。',
      note: '弦总比弧短 — 两者之差反映曲率有多大。' },
  },
  {
    slug: 'circle-from-area',
    icon: '🔍',
    category: '원·호',
    fields: [{ key: 'area', term: 'area', unit: 'cm2', def: 314.16, min: 0, step: 0.01 }],
    formula: '{radius} = √({area} ÷ π)',
    compute: v => {
      const r = Math.sqrt(ratio(v.area, PI));
      return [
        { term: 'radius', unit: 'cm', value: round(r, 4), digits: 4, primary: true },
        { term: 'diameter', unit: 'cm', value: round(2 * r, 4), digits: 4 },
        { term: 'circumference', unit: 'cm', value: round(2 * PI * r, 3), digits: 3 },
      ];
    },
    ko: { title: '면적으로 반지름 구하기', desc: '원의 면적을 알 때 반지름과 지름을 역산합니다.',
      long: '면적을 π로 나눈 뒤 제곱근을 씌우면 반지름입니다. 필요한 면적이 정해졌을 때 원의 크기를 정하는 계산입니다.',
      note: '면적 314.16㎠는 반지름 10cm입니다. 면적을 두 배로 늘리려면 반지름은 √2배(약 1.41배)만 키우면 됩니다.' },
    en: { title: 'Radius from Area', desc: 'Work back from a circle’s area to its radius and diameter.',
      long: 'Divide the area by π and take the square root. This is how you size a circle when the required area is fixed.',
      note: 'An area of 314.16 cm² means a 10 cm radius. To double the area you only enlarge the radius by √2 (about 1.41×).' },
    zh: { title: '由面积求半径', desc: '已知圆的面积，反推半径和直径。',
      long: '把面积除以π再开平方根就是半径。当所需面积已定时，用它来确定圆的尺寸。',
      note: '面积314.16平方厘米对应半径10厘米。要让面积翻倍，半径只需扩大√2倍(约1.41倍)。' },
  },
  {
    slug: 'circle-segment',
    icon: '🌙',
    category: '원·호',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 10, min: 0 },
      { key: 'angle', term: 'angleDeg', unit: 'deg', def: 120, min: 0, max: 360 },
    ],
    formula: '{area} = {radius}² ÷ 2 × (θ − sin θ),  θ = {angleDeg} × π ÷ 180',
    compute: v => {
      const th = rad(v.angle);
      const seg = (v.r ** 2 / 2) * (th - Math.sin(th));
      return [
        { term: 'area', unit: 'cm2', value: round(seg, 3), digits: 3, primary: true },
        { term: 'chordLen', unit: 'cm', value: round(2 * v.r * Math.sin(th / 2), 3), digits: 3 },
        { term: 'heightGeo', unit: 'cm', value: round(v.r * (1 - Math.cos(th / 2)), 3), digits: 3 },
      ];
    },
    ko: { title: '활꼴 면적 계산기', desc: '현과 호로 둘러싸인 초승달 모양의 면적을 구합니다.',
      long: '부채꼴 면적에서 가운데 삼각형을 뺀 것이 활꼴입니다. 원통 탱크에 액체가 일부만 찼을 때 그 단면적이 바로 이 모양입니다.',
      note: '중심각이 180°면 반원이 됩니다. 눕힌 원통 탱크의 잔량을 계산할 때 실제로 쓰입니다.' },
    en: { title: 'Circular Segment Area', desc: 'Area of the crescent bounded by a chord and its arc.',
      long: 'Take the sector area and subtract the triangle inside it. This shape is exactly the cross-section of a partly filled cylindrical tank.',
      note: 'At 180° it becomes a semicircle. Tank gauging for horizontal cylinders uses this formula directly.' },
    zh: { title: '弓形面积计算器', desc: '求由弦和弧围成的月牙形面积。',
      long: '用扇形面积减去中间的三角形即为弓形。卧式圆柱罐部分装液时的横截面正是这个形状。',
      note: '圆心角为180°时就是半圆。卧式圆柱罐的存量计算就直接用这个公式。' },
  },
  {
    slug: 'wheel-rotation',
    icon: '🛞',
    category: '원·호',
    fields: [
      { key: 'd', term: 'diameter', unit: 'cm', def: 66, min: 0.1 },
      { key: 'turns', term: 'turns', def: 1000, min: 0 },
    ],
    formula: '{distance} = π × {diameter} × {turns}',
    compute: v => {
      const cm = PI * v.d * v.turns;
      return [
        { term: 'distance', unit: 'm', value: round(cm / 100, 2), digits: 2, primary: true },
        { term: 'circumference', unit: 'cm', value: round(PI * v.d, 2), digits: 2 },
        { term: 'result', unit: 'km', value: round(cm / 100000, 4), digits: 4 },
      ];
    },
    ko: { title: '바퀴 회전수 → 거리', desc: '바퀴 지름과 회전수로 이동 거리를 구합니다.',
      long: '한 바퀴 굴러가는 거리가 바퀴의 둘레입니다. 지름에 π를 곱한 값에 회전수를 곱하면 총 거리가 나옵니다.',
      note: '26인치 자전거 바퀴(약 66cm)로 1000바퀴면 약 2.07km입니다. 타이어 공기압에 따라 실제 지름이 조금 달라집니다.' },
    en: { title: 'Wheel Turns to Distance', desc: 'Distance travelled from wheel diameter and revolutions.',
      long: 'One revolution covers the wheel’s circumference. Multiply π by the diameter, then by the number of turns.',
      note: 'A 26-inch bike wheel (about 66 cm) covers roughly 2.07 km in 1,000 turns. Tyre pressure shifts the effective diameter slightly.' },
    zh: { title: '车轮转数换算距离', desc: '用车轮直径和转数求行驶距离。',
      long: '转一圈走过的距离就是车轮周长。把π乘以直径，再乘以转数即可。',
      note: '26英寸自行车轮(约66厘米)转1000圈约走2.07公里。胎压会让实际直径略有变化。' },
  },
  {
    slug: 'ring-area',
    icon: '💿',
    category: '원·호',
    fields: [
      { key: 'outer', term: 'radius', unit: 'cm', def: 10, min: 0 },
      { key: 'inner', term: 'radius2', unit: 'cm', def: 6, min: 0 },
    ],
    formula: '{area} = π × ({radius}² − {radius2}²)',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round(PI * Math.max(0, v.outer ** 2 - v.inner ** 2), 3), digits: 3, primary: true },
      { term: 'sideLen', unit: 'cm', value: round(Math.max(0, v.outer - v.inner), 3), digits: 3 },
      { term: 'circumference', unit: 'cm', value: round(2 * PI * (v.outer + v.inner) / 2, 3), digits: 3 },
    ],
    ko: { title: '원환(도넛 모양) 면적', desc: '바깥 원에서 안쪽 원을 뺀 고리 모양의 면적을 구합니다.',
      long: '두 원의 면적 차이가 고리의 면적입니다. 함께 나오는 값은 고리의 폭과 중간 지름의 둘레입니다.',
      note: '와셔, 파이프 단면, 원형 화단 테두리처럼 가운데가 빈 원형의 면적을 구할 때 씁니다.' },
    en: { title: 'Annulus (Ring) Area', desc: 'Area of a ring — the outer circle minus the inner one.',
      long: 'Subtract the inner circle’s area from the outer circle’s. The extra figures are the ring’s width and the circumference at its mid-radius.',
      note: 'Use it for washers, pipe cross-sections and the border of a circular bed.' },
    zh: { title: '圆环面积计算器', desc: '求外圆减去内圆后的环形面积。',
      long: '两个圆的面积之差就是环的面积。附带的数值是环宽和中径处的周长。',
      note: '适用于垫圈、管道截面以及圆形花坛边缘等中空圆形的面积。' },
  },
];
