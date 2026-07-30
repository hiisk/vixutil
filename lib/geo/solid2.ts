/**
 * 도형 - 입체 부피 둘째 묶음 (10종)
 *
 * 첫 묶음이 부피였으니 여기는 겉면적과 변형 입체 — 포장지·페인트가 얼마나 드는지,
 * 원뿔대와 캡슐처럼 공식이 따로 있는 모양들이다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;

export const SOLID2_TOOLS: FormulaTool[] = [
  {
    slug: 'cube-surface',
    icon: '🧊',
    category: '입체 부피',
    fields: [{ key: 'a', term: 'sideSquare', unit: 'cm', def: 10, min: 0 }],
    formula: '{surface} = 6 × {sideSquare} ²',
    compute: v => [
      { term: 'surface', unit: 'cm2', value: round(6 * v.a * v.a, 2), digits: 2, primary: true },
      { term: 'volume', unit: 'cm3', value: round(v.a ** 3, 2), digits: 2 },
      { term: 'diagonal', unit: 'cm', value: round(v.a * Math.sqrt(3), 3), digits: 3 },
    ],
    ko: { title: '정육면체 겉면적 계산기', desc: '한 변으로 겉면적, 부피, 공간 대각선을 구합니다.',
      long: '면이 여섯 개이고 각 면이 정사각형이므로 겉면적은 한 변의 제곱에 6을 곱합니다. 공간 대각선은 한 모서리에서 가장 먼 모서리까지의 거리로 한 변의 √3배입니다.',
      note: '포장지를 살 때는 겉면적보다 더 필요합니다. 접히고 겹치는 부분이 있어 보통 15~20% 여유를 둡니다.' },
    en: { title: 'Cube Surface Area', desc: 'Surface area, volume and space diagonal from one edge.',
      long: 'Six square faces means the surface area is six times the edge squared. The space diagonal — corner to opposite corner through the middle — is the edge times √3.',
      note: 'Wrapping paper needs more than the surface area. Folds and overlaps usually take another 15–20%.' },
    zh: { title: '正方体表面积计算器', desc: '由棱长求出表面积、体积和空间对角线。',
      long: '六个面都是正方形，所以表面积等于棱长平方的6倍。空间对角线是从一角穿过内部到对角的距离，为棱长的√3倍。',
      note: '买包装纸需要多于表面积的量，折叠与重叠部分通常还要多留15%至20%。' },
  },
  {
    slug: 'box-surface',
    icon: '📦',
    category: '입체 부피',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'cm', def: 40, min: 0 },
      { key: 'd', term: 'widthCm', unit: 'cm', def: 30, min: 0 },
      { key: 'h', term: 'depthCm', unit: 'cm', def: 25, min: 0 },
    ],
    formula: '{surface} = 2 × ({lengthCm} × {widthCm} + {widthCm} × {depthCm} + {depthCm} × {lengthCm})',
    compute: v => [
      { term: 'surface', unit: 'cm2', value: round(2 * (v.w * v.d + v.d * v.h + v.h * v.w), 1), digits: 1, primary: true },
      { term: 'volume', unit: 'cm3', value: round(v.w * v.d * v.h, 1), digits: 1 },
      { term: 'diagonal', unit: 'cm', value: round(Math.sqrt(v.w ** 2 + v.d ** 2 + v.h ** 2), 2), digits: 2 },
      { term: 'liters', unit: 'liter', value: round(v.w * v.d * v.h / 1000, 2), digits: 2 },
    ],
    ko: { title: '직육면체 겉면적·대각선 계산기', desc: '세 변으로 겉면적, 부피, 공간 대각선을 구합니다.',
      long: '마주 보는 면이 두 쌍씩 세 종류이므로 세 곱을 더해 두 배 합니다. 공간 대각선은 세 변의 제곱을 모두 더한 뒤 제곱근을 취합니다 — 삼차원 피타고라스입니다.',
      note: '택배 규격은 보통 세 변의 합으로 정해집니다. 부피가 같아도 한 변이 길면 규격을 넘길 수 있습니다.' },
    en: { title: 'Box Surface Area & Diagonal', desc: 'Surface, volume and space diagonal from three edges.',
      long: 'There are three pairs of matching faces, so add the three products and double. The space diagonal is the square root of all three squares added — Pythagoras in three dimensions.',
      note: 'Courier size limits usually go by the sum of the three edges. Two boxes of equal volume can differ on whether they qualify.' },
    zh: { title: '长方体表面积与对角线', desc: '由三条棱求出表面积、体积和空间对角线。',
      long: '相对的面共三对，所以把三个乘积相加再乘二。空间对角线是三边平方和的平方根，即三维勾股定理。',
      note: '快递规格通常按三边之和限制。体积相同的两个箱子，可能一个合规一个超标。' },
  },
  {
    slug: 'cylinder-surface',
    icon: '🥫',
    category: '입체 부피',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 4, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{surface} = 2 × π × {radius} × ({radius} + {heightGeo})',
    compute: v => [
      { term: 'surface', unit: 'cm2', value: round(2 * PI * v.r * (v.r + v.h), 2), digits: 2, primary: true },
      { term: 'lateral', unit: 'cm2', value: round(2 * PI * v.r * v.h, 2), digits: 2 },
      { term: 'baseArea', unit: 'cm2', value: round(PI * v.r * v.r, 2), digits: 2 },
      { term: 'volume', unit: 'cm3', value: round(PI * v.r * v.r * v.h, 2), digits: 2 },
    ],
    ko: { title: '원기둥 겉면적 계산기', desc: '반지름과 높이로 전체 겉면적과 옆면적을 구합니다.',
      long: '옆면을 펼치면 가로가 원주, 세로가 높이인 직사각형이 되므로 2πrh입니다. 위아래 원 두 개를 더하면 전체 겉면적입니다. 라벨 크기를 구할 때는 옆면적만 쓰면 됩니다.',
      note: '음료 캔의 재료를 아끼려면 지름과 높이의 비가 1:1일 때가 최적입니다. 실제 캔이 길쭉한 것은 손에 잡히는 느낌과 진열 때문입니다.' },
    en: { title: 'Cylinder Surface Area', desc: 'Total and lateral surface from radius and height.',
      long: 'Unroll the side and it becomes a rectangle of circumference by height, so 2πrh. Add the two circular ends for the total. For a wraparound label, the lateral area is all you need.',
      note: 'A can uses least material when diameter equals height. Real cans are taller because of grip and shelf presentation.' },
    zh: { title: '圆柱表面积计算器', desc: '由半径和高求出总表面积与侧面积。',
      long: '把侧面展开就是宽为周长、高为柱高的长方形，即2πrh。加上上下两个圆面即为总表面积。计算环绕标签只需侧面积。',
      note: '罐体最省材料的比例是直径等于高。实际饮料罐偏细高，是出于握持感与货架陈列的考虑。' },
  },
  {
    slug: 'sphere-surface',
    icon: '🔮',
    category: '입체 부피',
    fields: [{ key: 'r', term: 'radius', unit: 'cm', def: 10, min: 0 }],
    formula: '{surface} = 4 × π × {radius} ²',
    compute: v => [
      { term: 'surface', unit: 'cm2', value: round(4 * PI * v.r * v.r, 2), digits: 2, primary: true },
      { term: 'volume', unit: 'cm3', value: round(4 / 3 * PI * v.r ** 3, 2), digits: 2 },
      { term: 'circumference', unit: 'cm', value: round(2 * PI * v.r, 2), digits: 2 },
    ],
    ko: { title: '구 겉면적 계산기', desc: '반지름으로 구의 겉면적과 부피를 구합니다.',
      long: '구의 겉면적은 4πr²로, 같은 반지름 원의 면적(πr²)의 정확히 네 배입니다. 아르키메데스가 밝힌 사실로, 구를 감싼 원기둥의 옆면적과도 같습니다.',
      note: '같은 부피를 담을 때 겉면적이 가장 작은 모양이 구입니다. 물방울과 비눗방울이 둥근 이유입니다.' },
    en: { title: 'Sphere Surface Area', desc: 'Surface area and volume from the radius.',
      long: 'A sphere’s surface is 4πr², exactly four times the area of a circle with the same radius. Archimedes showed it also equals the lateral area of the cylinder that wraps it.',
      note: 'For a given volume no shape has less surface than a sphere. That is why droplets and bubbles are round.' },
    zh: { title: '球表面积计算器', desc: '由半径求出球的表面积与体积。',
      long: '球的表面积为4πr²，正好是同半径圆面积(πr²)的四倍。阿基米德证明它也等于外切圆柱的侧面积。',
      note: '在容纳同样体积时，球的表面积最小。这就是水滴与肥皂泡呈球形的原因。' },
  },
  {
    slug: 'cone-surface',
    icon: '🍦',
    category: '입체 부피',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 5, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{slant} = √({radius} ² + {heightGeo} ²), {surface} = π × {radius} × ({radius} + {slant})',
    compute: v => {
      const l = Math.hypot(v.r, v.h);
      return [
        { term: 'surface', unit: 'cm2', value: round(PI * v.r * (v.r + l), 2), digits: 2, primary: true },
        { term: 'slant', unit: 'cm', value: round(l, 3), digits: 3 },
        { term: 'lateral', unit: 'cm2', value: round(PI * v.r * l, 2), digits: 2 },
        { term: 'volume', unit: 'cm3', value: round(PI * v.r * v.r * v.h / 3, 2), digits: 2 },
      ];
    },
    ko: { title: '원뿔 겉면적·모선 계산기', desc: '반지름과 높이로 모선 길이와 겉면적을 구합니다.',
      long: '모선은 꼭대기에서 바닥 테두리까지 비스듬히 잰 길이로, 반지름과 높이의 빗변입니다. 옆면적은 πrl이고 여기에 바닥 원을 더하면 전체가 됩니다. 종이로 고깔을 만들 때 필요한 값입니다.',
      note: '높이와 모선을 헷갈리면 옆면적이 크게 틀립니다. 모선은 항상 높이보다 깁니다.' },
    en: { title: 'Cone Surface Area & Slant', desc: 'Slant height and surface area from radius and height.',
      long: 'The slant height runs from apex to base edge and is the hypotenuse of radius and height. The lateral area is πrl; add the base circle for the total. This is what you need to cut a paper cone.',
      note: 'Confusing height with slant height throws the lateral area badly off. The slant is always longer.' },
    zh: { title: '圆锥表面积与母线', desc: '由半径和高求出母线长度与表面积。',
      long: '母线是从顶点斜量到底边的长度，即半径与高的斜边。侧面积为πrl，加上底面圆即为总表面积。用纸做圆锥帽时正需要这个值。',
      note: '把高与母线混淆会让侧面积严重偏差。母线总是比高更长。' },
  },
  {
    slug: 'frustum-volume',
    icon: '🥤',
    category: '입체 부피',
    fields: [
      { key: 'r1', term: 'radius', unit: 'cm', def: 4, min: 0 },
      { key: 'r2', term: 'frustumTop', unit: 'cm', def: 6, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 14, min: 0 },
    ],
    formula: '{volume} = π × {heightGeo} ÷ 3 × ({radius} ² + {radius} × {frustumTop} + {frustumTop} ²)',
    compute: v => {
      const vol = PI * v.h / 3 * (v.r1 ** 2 + v.r1 * v.r2 + v.r2 ** 2);
      const l = Math.hypot(v.r2 - v.r1, v.h);
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'liters', unit: 'liter', value: round(vol / 1000, 3), digits: 3 },
        { term: 'slant', unit: 'cm', value: round(l, 3), digits: 3 },
        { term: 'lateral', unit: 'cm2', value: round(PI * (v.r1 + v.r2) * l, 2), digits: 2 },
      ];
    },
    ko: { title: '원뿔대 부피 계산기 (컵 모양)', desc: '아래·위 반지름이 다른 컵 모양의 부피를 구합니다.',
      long: '테이크아웃 컵, 화분, 양동이가 모두 원뿔대입니다. 위아래 반지름의 제곱과 두 반지름의 곱을 더한 뒤 높이와 π를 곱하고 3으로 나눕니다. 두 반지름이 같으면 원기둥 공식이 됩니다.',
      note: '컵의 표시 용량은 테두리까지 채운 값이 아닙니다. 보통 테두리 아래 1~2cm까지가 실용 용량입니다.' },
    en: { title: 'Frustum Volume (Cup Shape)', desc: 'Volume of a shape whose two ends differ in radius.',
      long: 'Takeaway cups, plant pots and buckets are all frustums. Add the squares of both radii and their product, then multiply by height and π and divide by three. Equal radii collapse it to the cylinder formula.',
      note: 'A cup’s stated capacity is not filled to the rim. Usable volume normally stops 1–2 cm below it.' },
    zh: { title: '圆台体积计算器（杯形）', desc: '计算上下半径不同的杯形体积。',
      long: '外带杯、花盆、水桶都是圆台。把上下半径的平方与两半径之积相加，再乘高和π并除以3。两半径相等时即退化为圆柱公式。',
      note: '杯子的标称容量并非灌到杯口。实用容量通常止于杯口下方1至2厘米。' },
  },
  {
    slug: 'capsule-volume',
    icon: '💊',
    category: '입체 부피',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 3, min: 0 },
      { key: 'l', term: 'bodyLen', unit: 'cm', def: 10, min: 0 },
    ],
    formula: '{volume} = π × {radius} ² × {bodyLen} + 4 ÷ 3 × π × {radius} ³',
    compute: v => {
      const vol = PI * v.r * v.r * v.l + 4 / 3 * PI * v.r ** 3;
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'liters', unit: 'liter', value: round(vol / 1000, 3), digits: 3 },
        { term: 'surface', unit: 'cm2', value: round(2 * PI * v.r * (v.l + 2 * v.r), 2), digits: 2 },
      ];
    },
    ko: { title: '캡슐 부피 계산기', desc: '양 끝이 둥근 원통(캡슐·탱크) 부피를 구합니다.',
      long: '가운데 원기둥에 양 끝의 반구 두 개를 더합니다. 반구 두 개가 구 하나이므로 원기둥 부피에 구 부피를 더하면 끝입니다. 가로형 물탱크와 LPG 용기가 이 모양입니다.',
      note: '몸통 길이는 둥근 끝을 뺀 직선 부분만 넣어야 합니다. 전체 길이를 넣으면 부피가 과대 계산됩니다.' },
    en: { title: 'Capsule Volume', desc: 'Volume of a cylinder with hemispherical ends.',
      long: 'Take the middle cylinder and add the two hemispherical caps. Since two hemispheres make one sphere, it is simply cylinder plus sphere. Horizontal water tanks and LPG vessels have this shape.',
      note: 'Enter only the straight body length, excluding the rounded ends. Using the overall length overstates the volume.' },
    zh: { title: '胶囊形体积计算器', desc: '计算两端为半球的圆柱（胶囊、储罐）体积。',
      long: '中间圆柱加上两端各一个半球。两个半球等于一个整球，所以就是圆柱体积加球体积。卧式水罐与液化气罐即为此形状。',
      note: '筒身长度只填直段部分，不含两端圆头。若填总长会高估体积。' },
  },
  {
    slug: 'ellipsoid-volume',
    icon: '🥚',
    category: '입체 부피',
    fields: [
      { key: 'a', term: 'axisA', unit: 'cm', def: 5, min: 0 },
      { key: 'b', term: 'axisB', unit: 'cm', def: 4, min: 0 },
      { key: 'c', term: 'axisC', unit: 'cm', def: 3, min: 0 },
    ],
    formula: '{volume} = 4 ÷ 3 × π × {axisA} × {axisB} × {axisC}',
    compute: v => {
      const vol = 4 / 3 * PI * v.a * v.b * v.c;
      return [
        { term: 'volume', unit: 'cm3', value: round(vol, 2), digits: 2, primary: true },
        { term: 'liters', unit: 'liter', value: round(vol / 1000, 4), digits: 4 },
        { term: 'radius', unit: 'cm', value: round(Math.cbrt(v.a * v.b * v.c), 3), digits: 3 },
      ];
    },
    ko: { title: '타원체 부피 계산기', desc: '세 반지름이 다른 타원체(달걀 모양) 부피를 구합니다.',
      long: '구 공식의 r³ 자리에 세 반지름의 곱을 넣습니다. 세 값이 모두 같으면 구 공식과 정확히 같아집니다. 달걀, 수박, 럭비공의 부피를 어림할 때 씁니다.',
      note: '반지름을 넣어야 합니다. 지름을 넣으면 부피가 여덟 배로 나옵니다.' },
    en: { title: 'Ellipsoid Volume', desc: 'Volume of an egg-shaped solid with three different radii.',
      long: 'Replace r³ in the sphere formula with the product of the three semi-axes. All three equal collapses it back to the sphere formula. Handy for estimating eggs, melons and rugby balls.',
      note: 'These are radii, not diameters. Entering diameters gives eight times the volume.' },
    zh: { title: '椭球体积计算器', desc: '计算三个半轴各不相同的椭球（蛋形）体积。',
      long: '把球公式中的r³换成三个半轴之积。三者相等时即完全退回球体公式。可用于估算鸡蛋、西瓜、橄榄球的体积。',
      note: '要填半轴而不是直径。填直径会得到八倍的体积。' },
  },
  {
    slug: 'spherical-cap',
    icon: '🌗',
    category: '입체 부피',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 30, min: 0.01 },
      { key: 'h', term: 'capHeight', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{capVolume} = π × {capHeight} ² ÷ 3 × (3 × {radius} − {capHeight})',
    compute: v => {
      const h = Math.min(v.h, 2 * v.r);
      const cap = PI * h * h / 3 * (3 * v.r - h);
      const full = 4 / 3 * PI * v.r ** 3;
      return [
        { term: 'capVolume', unit: 'cm3', value: round(cap, 1), digits: 1, primary: true },
        { term: 'liters', unit: 'liter', value: round(cap / 1000, 3), digits: 3 },
        { term: 'fillPercent', unit: 'percent', value: round(ratio(cap, full) * 100, 2), digits: 2 },
        { term: 'volume', unit: 'cm3', value: round(full, 1), digits: 1 },
      ];
    },
    verdict: (v, out) => ({
      ko: `반지름 ${v.r}인 구형 탱크에 ${v.h}만큼 찼다면 전체의 ${out[2].value}%입니다. 절반 높이가 정확히 50%지만 그 아래는 훨씬 적게 찹니다.`,
      en: `Filled to ${v.h} in a sphere of radius ${v.r} is ${out[2].value}% of the total. Half the height is exactly 50%, but below that it fills far less than it looks.`,
      zh: `半径${v.r}的球罐充到${v.h}时为总量的${out[2].value}%。半高处正好是50%，但低于半高时装的比看起来少得多。`,
      tone: 'good',
    }),
    ko: { title: '구형 탱크 부분 부피 계산기', desc: '구 모양 통에 어느 높이까지 찼을 때의 부피를 구합니다.',
      long: '구를 평면으로 자른 아래쪽 덩어리의 부피입니다. 높이의 제곱에 (3R − 높이)를 곱하고 π를 붙여 3으로 나눕니다. 구형 물탱크의 수위로 물 양을 알아낼 때 씁니다.',
      note: '수위가 절반이면 부피도 정확히 절반이지만, 절반 아래에서는 부피가 수위보다 훨씬 빠르게 줄어듭니다. 아래쪽이 좁기 때문입니다.' },
    en: { title: 'Spherical Cap (Partly Filled Sphere)', desc: 'Volume in a spherical vessel filled to a given depth.',
      long: 'This is the chunk left when you slice a sphere with a plane. Multiply the depth squared by (3R − depth), then by π over three. It converts a level reading in a spherical tank into a volume.',
      note: 'At half depth the volume is exactly half, but below that it drops away much faster than the level suggests, because the bottom is narrow.' },
    zh: { title: '球形罐部分体积计算器', desc: '计算球形容器充到某一高度时的体积。',
      long: '这是用平面切球后下方部分的体积。把深度的平方乘以(3R − 深度)，再乘π并除以3。可把球形水罐的液位换算成水量。',
      note: '液位到半高时体积正好是一半，但低于半高时体积下降得比液位快得多，因为下部更窄。' },
  },
  {
    slug: 'pyramid-surface',
    icon: '🏔️',
    category: '입체 부피',
    fields: [
      { key: 'a', term: 'sideSquare', unit: 'cm', def: 10, min: 0 },
      { key: 'h', term: 'heightGeo', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{slant} = √(({sideSquare} ÷ 2) ² + {heightGeo} ²), {surface} = {sideSquare} ² + 2 × {sideSquare} × {slant}',
    compute: v => {
      const l = Math.hypot(v.a / 2, v.h);
      return [
        { term: 'surface', unit: 'cm2', value: round(v.a * v.a + 2 * v.a * l, 2), digits: 2, primary: true },
        { term: 'slant', unit: 'cm', value: round(l, 3), digits: 3 },
        { term: 'lateral', unit: 'cm2', value: round(2 * v.a * l, 2), digits: 2 },
        { term: 'volume', unit: 'cm3', value: round(v.a * v.a * v.h / 3, 2), digits: 2 },
      ];
    },
    ko: { title: '사각뿔 겉면적 계산기', desc: '정사각형 바닥 사각뿔의 겉면적과 부피를 구합니다.',
      long: '옆면은 밑변이 한 변, 높이가 모선인 삼각형 네 개입니다. 모선은 높이와 한 변의 절반으로 만드는 직각삼각형의 빗변입니다. 옆면 네 개와 바닥을 더하면 겉면적입니다.',
      note: '모선과 모서리 길이는 다릅니다. 모서리는 꼭짓점에서 바닥 꼭짓점까지이고, 모선은 바닥 변의 중점까지입니다.' },
    en: { title: 'Square Pyramid Surface Area', desc: 'Surface and volume of a pyramid on a square base.',
      long: 'The sides are four triangles with the base edge as their base and the slant height as their height. That slant is the hypotenuse of the height and half the base edge. Four faces plus the base gives the total.',
      note: 'Slant height is not the same as edge length. The edge runs to a base corner; the slant runs to the midpoint of a base edge.' },
    zh: { title: '正四棱锥表面积计算器', desc: '计算方形底四棱锥的表面积与体积。',
      long: '侧面是四个三角形，底为底边、高为斜高。斜高是由锥高与半个底边构成的直角三角形的斜边。四个侧面加底面即为总表面积。',
      note: '斜高与棱长不同：棱通向底面顶点，斜高通向底边中点。' },
  },
];
