/** 도형 - 입체 부피 (10종) */
import type { FormulaTool } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;
/** ㎤ → L */
const toL = (cm3: number) => cm3 / 1000;

export const SOLID_TOOLS: FormulaTool[] = [
  {
    slug: 'cube-volume',
    icon: '🧊',
    category: '입체 부피',
    fields: [{ key: 'a', term: 'sideLen', unit: 'cm', def: 10, min: 0 }],
    formula: '{volume} = {sideLen}³',
    compute: v => [
      { term: 'volume', unit: 'cm3', value: round(v.a ** 3, 2), digits: 2, primary: true },
      { term: 'surface', unit: 'cm2', value: round(6 * v.a ** 2, 2), digits: 2 },
      { term: 'liters', unit: 'liter', value: round(toL(v.a ** 3), 3), digits: 3 },
    ],
    ko: { title: '정육면체 부피 계산기', desc: '한 변으로 정육면체의 부피와 표면적을 구합니다.',
      long: '한 변을 세 번 곱하면 부피, 한 면의 면적을 여섯 배 하면 표면적입니다. 한 변이 두 배가 되면 부피는 여덟 배가 됩니다.',
      note: '한 변 10cm는 1L입니다. 1L 우유팩이 대략 이 크기입니다.' },
    en: { title: 'Cube Volume Calculator', desc: 'Volume and surface area of a cube from one edge.',
      long: 'Cube the edge for volume; six times one face for surface area. Doubling the edge multiplies volume by eight.',
      note: 'A 10 cm cube holds exactly one litre — roughly the size of a one-litre milk carton.' },
    zh: { title: '正方体体积计算器', desc: '用棱长求正方体的体积和表面积。',
      long: '棱长的三次方是体积，一个面的面积乘6是表面积。棱长加倍，体积变成八倍。',
      note: '棱长10厘米正好是1升 — 大约就是1升牛奶盒的大小。' },
  },
  {
    slug: 'box-volume',
    icon: '📦',
    category: '입체 부피',
    fields: [
      { key: 'l', term: 'lengthCm', unit: 'cm', def: 30, min: 0 },
      { key: 'w', term: 'widthCm', unit: 'cm', def: 20, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 15, min: 0 },
    ],
    formula: '{volume} = {lengthCm} × {widthCm} × {heightGeo}',
    compute: v => {
      const vol = v.l * v.w * v.h;
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'liters', unit: 'liter', value: round(toL(vol), 3), digits: 3 },
        { term: 'diagonal', unit: 'cm', value: round(Math.sqrt(v.l ** 2 + v.w ** 2 + v.h ** 2), 2), digits: 2 },
      ];
    },
    ko: { title: '직육면체 부피 계산기', desc: '가로·세로·높이로 상자의 부피와 대각선을 구합니다.',
      long: '세 변을 곱하면 부피이고, 1000으로 나누면 리터입니다. 대각선은 상자 안에 들어갈 수 있는 가장 긴 막대의 길이입니다.',
      note: '택배 부피무게는 가로×세로×높이(cm)를 5000이나 6000으로 나눠 kg으로 씁니다. 운송사마다 나누는 수가 다릅니다.' },
    en: { title: 'Box Volume Calculator', desc: 'Volume and internal diagonal of a rectangular box.',
      long: 'Multiply the three edges for volume, then divide by 1,000 for litres. The diagonal is the longest straight object that will fit inside.',
      note: 'Couriers compute volumetric weight as length × width × height in cm divided by 5,000 or 6,000 — the divisor varies by carrier.' },
    zh: { title: '长方体体积计算器', desc: '用长、宽、高求箱体的体积和内对角线。',
      long: '三边相乘得到体积，再除以1000换成升。对角线是能放进箱内的最长直杆长度。',
      note: '快递的体积重量按长×宽×高(厘米)除以5000或6000计算 — 除数因承运商而异。' },
  },
  {
    slug: 'cylinder-volume',
    icon: '🥫',
    category: '입체 부피',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 5, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{volume} = π × {radius}² × {heightGeo}',
    compute: v => {
      const vol = PI * v.r ** 2 * v.h;
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'liters', unit: 'liter', value: round(toL(vol), 3), digits: 3 },
        { term: 'surface', unit: 'cm2', value: round(2 * PI * v.r * (v.r + v.h), 2), digits: 2 },
      ];
    },
    ko: { title: '원기둥 부피 계산기', desc: '반지름과 높이로 원기둥의 부피와 표면적을 구합니다.',
      long: '바닥 원의 면적에 높이를 곱하면 부피입니다. 캔·물통·파이프처럼 단면이 일정한 것은 모두 이 방식으로 구합니다.',
      note: '반지름이 두 배면 부피는 네 배입니다. 지름이 두 배인 컵은 같은 높이에서 네 배 들어갑니다.' },
    en: { title: 'Cylinder Volume Calculator', desc: 'Volume and surface area of a cylinder from radius and height.',
      long: 'Multiply the base circle’s area by the height. Anything with a constant circular cross-section — cans, tanks, pipes — works this way.',
      note: 'Double the radius and volume quadruples: a cup twice as wide holds four times as much at the same height.' },
    zh: { title: '圆柱体积计算器', desc: '用半径和高求圆柱的体积和表面积。',
      long: '底面圆的面积乘以高即为体积。罐子、水桶、管道等横截面恒定的物体都按此计算。',
      note: '半径加倍，体积变四倍：同样高度下，直径加倍的杯子能装四倍。' },
  },
  {
    slug: 'cone-volume',
    icon: '🍦',
    category: '입체 부피',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 5, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{volume} = π × {radius}² × {heightGeo} ÷ 3',
    compute: v => {
      const vol = (PI * v.r ** 2 * v.h) / 3;
      const slant = Math.sqrt(v.r ** 2 + v.h ** 2);
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'slant', unit: 'cm', value: round(slant, 2), digits: 2 },
        { term: 'surface', unit: 'cm2', value: round(PI * v.r * (v.r + slant), 2), digits: 2 },
      ];
    },
    ko: { title: '원뿔 부피 계산기', desc: '반지름과 높이로 원뿔의 부피와 모선 길이를 구합니다.',
      long: '같은 밑면과 높이의 원기둥의 3분의 1이 원뿔 부피입니다. 모선은 꼭짓점에서 밑면 둘레까지의 직선 거리입니다.',
      note: '아이스크림 콘 세 개를 채워야 같은 크기 원기둥 하나가 찹니다.' },
    en: { title: 'Cone Volume Calculator', desc: 'Volume and slant height of a cone from radius and height.',
      long: 'A cone holds one third of the cylinder with the same base and height. The slant height is the straight distance from apex to base rim.',
      note: 'It takes three ice-cream cones to fill one cylinder of the same size.' },
    zh: { title: '圆锥体积计算器', desc: '用半径和高求圆锥的体积和母线长度。',
      long: '圆锥的体积是同底同高圆柱的三分之一。母线是从顶点到底面圆周的直线距离。',
      note: '要三个冰淇淋蛋筒才能装满一个同尺寸的圆柱。' },
  },
  {
    slug: 'sphere-volume',
    icon: '🏀',
    category: '입체 부피',
    fields: [{ key: 'r', term: 'radius', unit: 'cm', def: 10, min: 0 }],
    formula: '{volume} = 4 ÷ 3 × π × {radius}³',
    compute: v => {
      const vol = (4 / 3) * PI * v.r ** 3;
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'surface', unit: 'cm2', value: round(4 * PI * v.r ** 2, 2), digits: 2 },
        { term: 'liters', unit: 'liter', value: round(toL(vol), 3), digits: 3 },
      ];
    },
    ko: { title: '구의 부피 계산기', desc: '반지름으로 구의 부피와 표면적을 구합니다.',
      long: '부피는 반지름의 세제곱에 4π/3을 곱하고, 표면적은 제곱에 4π를 곱합니다. 같은 부피를 담는 도형 중 표면적이 가장 작은 것이 구입니다.',
      note: '반지름이 두 배면 부피는 여덟 배, 표면적은 네 배입니다. 물방울이 둥근 이유가 여기 있습니다.' },
    en: { title: 'Sphere Volume Calculator', desc: 'Volume and surface area of a sphere from its radius.',
      long: 'Volume is 4π/3 times the radius cubed; surface area is 4π times the radius squared. Of all shapes holding a given volume, the sphere has the least surface.',
      note: 'Double the radius and volume rises eightfold while surface only quadruples — which is why droplets are round.' },
    zh: { title: '球体积计算器', desc: '用半径求球的体积和表面积。',
      long: '体积是4π/3乘半径的三次方，表面积是4π乘半径的平方。在容纳相同体积的形状中，球的表面积最小。',
      note: '半径加倍，体积变八倍而表面积只变四倍 — 这就是水滴呈圆形的原因。' },
  },
  {
    slug: 'hemisphere-volume',
    icon: '🥣',
    category: '입체 부피',
    fields: [{ key: 'r', term: 'radius', unit: 'cm', def: 8, min: 0 }],
    formula: '{volume} = 2 ÷ 3 × π × {radius}³',
    compute: v => {
      const vol = (2 / 3) * PI * v.r ** 3;
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'liters', unit: 'liter', value: round(toL(vol), 3), digits: 3 },
        { term: 'surface', unit: 'cm2', value: round(3 * PI * v.r ** 2, 2), digits: 2 },
      ];
    },
    ko: { title: '반구 부피 계산기', desc: '반지름으로 반구(그릇 모양)의 부피를 구합니다.',
      long: '구 부피의 절반이므로 2π/3에 반지름 세제곱을 곱합니다. 표면적은 곡면과 밑면 원을 합쳐 3πr²입니다.',
      note: '둥근 밥그릇이나 돔 지붕의 용적을 어림할 때 씁니다.' },
    en: { title: 'Hemisphere Volume', desc: 'Volume of a bowl-shaped hemisphere from its radius.',
      long: 'It is half a sphere, so 2π/3 times the radius cubed. Surface area is 3πr² once you include the flat circular base.',
      note: 'Handy for estimating the capacity of a round bowl or the volume under a dome.' },
    zh: { title: '半球体积计算器', desc: '用半径求碗状半球的体积。',
      long: '它是球的一半，即2π/3乘半径的三次方。加上底面圆后，表面积为3πr²。',
      note: '估算圆碗容量或穹顶下的空间时很实用。' },
  },
  {
    slug: 'pyramid-volume',
    icon: '🔻',
    category: '입체 부피',
    fields: [
      { key: 'a', term: 'lengthCm', unit: 'cm', def: 10, min: 0 },
      { key: 'b', term: 'widthCm', unit: 'cm', def: 10, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 15, min: 0 },
    ],
    formula: '{volume} = {lengthCm} × {widthCm} × {heightGeo} ÷ 3',
    compute: v => [
      { term: 'volume', unit: 'cm3', value: round((v.a * v.b * v.h) / 3, 2), digits: 2, primary: true },
      { term: 'area', unit: 'cm2', value: round(v.a * v.b, 2), digits: 2 },
    ],
    ko: { title: '사각뿔 부피 계산기', desc: '밑면 가로·세로와 높이로 사각뿔의 부피를 구합니다.',
      long: '밑면 면적에 높이를 곱하고 3으로 나눕니다. 뿔은 항상 같은 밑면·높이 기둥의 3분의 1입니다.',
      note: '높이는 꼭짓점에서 밑면까지의 수직 거리입니다. 비스듬한 모서리 길이가 아닙니다.' },
    en: { title: 'Pyramid Volume Calculator', desc: 'Volume of a rectangular pyramid from base dimensions and height.',
      long: 'Multiply the base area by the height and divide by three. Any pyramid or cone is one third of the prism with the same base and height.',
      note: 'Height is the perpendicular drop from apex to base, not the length of a slanted edge.' },
    zh: { title: '四棱锥体积计算器', desc: '用底面长宽和高求四棱锥的体积。',
      long: '底面积乘以高再除以3。任何锥体都是同底同高柱体的三分之一。',
      note: '高是从顶点到底面的垂直距离，不是斜棱的长度。' },
  },
  {
    slug: 'prism-volume',
    icon: '📐',
    category: '입체 부피',
    fields: [
      { key: 'base', term: 'baseLen', unit: 'cm', def: 8, min: 0 },
      { key: 'triH', term: 'heightGeo', unit: 'cm', def: 6, min: 0 },
      { key: 'len', term: 'lengthCm', unit: 'cm', def: 20, min: 0 },
    ],
    formula: '{volume} = {baseLen} × {heightGeo} ÷ 2 × {lengthCm}',
    compute: v => {
      const area = (v.base * v.triH) / 2;
      return [
        { term: 'volume', unit: 'cm3', value: round(area * v.len, 2), digits: 2, primary: true },
        { term: 'area', unit: 'cm2', value: round(area, 2), digits: 2 },
        { term: 'liters', unit: 'liter', value: round(toL(area * v.len), 3), digits: 3 },
      ];
    },
    ko: { title: '삼각기둥 부피 계산기', desc: '삼각형 단면의 밑변·높이와 기둥 길이로 부피를 구합니다.',
      long: '단면 삼각형의 면적에 길이를 곱합니다. 단면이 일정한 물체는 모두 "단면적 × 길이"로 부피가 나옵니다.',
      note: '지붕 아래 공간이나 삼각 프리즘 포장 상자의 부피를 구할 때 씁니다.' },
    en: { title: 'Triangular Prism Volume', desc: 'Volume from a triangular cross-section and the prism length.',
      long: 'Multiply the cross-sectional area by the length. Anything with a constant cross-section is simply area times length.',
      note: 'Useful for the space under a pitched roof or a triangular prism package.' },
    zh: { title: '三棱柱体积计算器', desc: '用三角形横截面的底与高以及柱长求体积。',
      long: '横截面三角形的面积乘以长度即可。横截面恒定的物体，体积都是「截面积乘长度」。',
      note: '计算坡屋顶下的空间或三棱柱包装盒的容积时很有用。' },
  },
  {
    slug: 'tube-volume',
    icon: '🚰',
    category: '입체 부피',
    fields: [
      { key: 'outer', term: 'radius', unit: 'cm', def: 5, min: 0 },
      { key: 'inner', term: 'radius2', unit: 'cm', def: 4, min: 0 },
      { key: 'h', term: 'lengthCm', unit: 'cm', def: 100, min: 0 },
    ],
    formula: '{volume} = π × ({radius}² − {radius2}²) × {lengthCm}',
    compute: v => {
      const shell = PI * Math.max(0, v.outer ** 2 - v.inner ** 2) * v.h;
      const inside = PI * v.inner ** 2 * v.h;
      return [
        { term: 'volume', unit: 'cm3', value: round(shell, 2), digits: 2, primary: true },
        { term: 'liters', unit: 'liter', value: round(toL(inside), 3), digits: 3 },
      ];
    },
    ko: { title: '관(파이프) 재료 부피', desc: '바깥·안쪽 반지름과 길이로 관 자체의 부피와 내부 용량을 구합니다.',
      long: '바깥 원 면적에서 안쪽 원 면적을 빼면 관 벽의 단면적입니다. 여기에 길이를 곱하면 재료 부피이고, 안쪽만 계산하면 흐를 수 있는 용량입니다.',
      note: '아래 값이 관 안에 담기는 용량(L)입니다. 재료비는 위 값, 유량은 아래 값으로 계산합니다.' },
    en: { title: 'Pipe Material Volume', desc: 'Wall volume and inner capacity of a pipe from its radii and length.',
      long: 'Subtract the inner circle from the outer to get the wall cross-section, then multiply by length for material volume. The inner circle alone gives flow capacity.',
      note: 'The second figure is the litres the pipe holds — use the first for material cost and the second for flow.' },
    zh: { title: '管材体积计算器', desc: '用内外半径和长度求管壁体积与内部容量。',
      long: '外圆面积减内圆面积得到管壁横截面，乘以长度就是材料体积。只算内圆则是可通过的容量。',
      note: '第二个数值是管内可容纳的升数 — 材料成本看第一个，流量看第二个。' },
  },
  {
    slug: 'torus-volume',
    icon: '🍩',
    category: '입체 부피',
    fields: [
      { key: 'R', term: 'radius', unit: 'cm', def: 10, min: 0 },
      { key: 'r', term: 'radius2', unit: 'cm', def: 3, min: 0 },
    ],
    formula: '{volume} = 2π² × {radius} × {radius2}²',
    compute: v => [
      { term: 'volume', unit: 'cm3', value: round(2 * PI ** 2 * v.R * v.r ** 2, 2), digits: 2, primary: true },
      { term: 'surface', unit: 'cm2', value: round(4 * PI ** 2 * v.R * v.r, 2), digits: 2 },
    ],
    ko: { title: '도넛(원환체) 부피 계산기', desc: '중심 반지름과 단면 반지름으로 도넛 모양의 부피를 구합니다.',
      long: '단면 원의 면적에 중심원 둘레를 곱한 값과 같습니다 — 원기둥을 둥글게 이어붙인 셈입니다.',
      note: '중심 반지름은 도넛 가운데 구멍의 중심에서 반죽 단면 중심까지의 거리입니다.' },
    en: { title: 'Torus (Donut) Volume', desc: 'Volume of a torus from its centre radius and tube radius.',
      long: 'It equals the cross-section area times the circumference of the centre circle — a cylinder bent into a loop.',
      note: 'The centre radius runs from the middle of the hole to the centre of the tube, not to its outer edge.' },
    zh: { title: '圆环体(甜甜圈)体积', desc: '用中心半径和管半径求圆环体的体积。',
      long: '它等于横截面积乘以中心圆的周长 — 相当于把圆柱弯成一个圈。',
      note: '中心半径是从孔的中心到管截面中心的距离，不是到外缘。' },
  },
];
