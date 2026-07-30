/** 도형 - 평면 도형 (10종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;

export const PLANE_TOOLS: FormulaTool[] = [
  {
    slug: 'circle-area',
    icon: '⭕',
    category: '평면 도형',
    fields: [{ key: 'r', term: 'radius', unit: 'cm', def: 10, min: 0 }],
    formula: '{area} = π × {radius}²,  {circumference} = 2π × {radius}',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round(PI * v.r ** 2, 2), digits: 2, primary: true },
      { term: 'circumference', unit: 'cm', value: round(2 * PI * v.r, 2), digits: 2 },
      { term: 'diameter', unit: 'cm', value: round(2 * v.r, 2), digits: 2 },
    ],
    ko: { title: '원의 면적 계산기', desc: '반지름으로 원의 면적과 둘레를 구합니다.',
      long: '면적은 반지름의 제곱에 π를 곱하고, 둘레는 반지름에 2π를 곱합니다. 반지름이 두 배가 되면 둘레는 두 배지만 면적은 네 배가 됩니다.',
      note: '지름을 알고 있다면 2로 나눠 반지름을 넣으세요. 지름을 그대로 넣으면 면적이 네 배로 나옵니다.' },
    en: { title: 'Circle Area Calculator', desc: 'Get the area and circumference of a circle from its radius.',
      long: 'Area is π times the radius squared; circumference is 2π times the radius. Double the radius and the circumference doubles while the area quadruples.',
      note: 'If you have the diameter, halve it first — entering the diameter gives four times the real area.' },
  },
  {
    slug: 'circle-from-circumference',
    icon: '🔵',
    category: '평면 도형',
    fields: [{ key: 'c', term: 'circumference', unit: 'cm', def: 100, min: 0 }],
    formula: '{radius} = {circumference} ÷ (2π)',
    compute: v => {
      const r = ratio(v.c, 2 * PI);
      return [
        { term: 'radius', unit: 'cm', value: round(r, 3), digits: 3, primary: true },
        { term: 'area', unit: 'cm2', value: round(PI * r ** 2, 2), digits: 2 },
        { term: 'diameter', unit: 'cm', value: round(2 * r, 3), digits: 3 },
      ];
    },
    ko: { title: '둘레로 반지름 구하기', desc: '줄자로 둘레만 재고 반지름과 면적을 역산합니다.',
      long: '나무 둘레나 파이프 둘레처럼 지름을 직접 잴 수 없을 때 씁니다. 둘레를 2π(약 6.283)로 나누면 반지름입니다.',
      note: '둘레 100cm는 반지름 15.9cm입니다. 나무는 껍질 두께 때문에 실제 목질부보다 크게 나옵니다.' },
    en: { title: 'Radius from Circumference', desc: 'Measure around an object and work back to radius and area.',
      long: 'Useful for tree trunks or pipes where the diameter cannot be measured directly. Divide the circumference by 2π (about 6.283).',
      note: 'A 100 cm circumference means a 15.9 cm radius. On trees, bark thickness inflates the result over the actual wood.' },
  },
  {
    slug: 'triangle-area',
    icon: '🔺',
    category: '평면 도형',
    fields: [
      { key: 'base', term: 'baseLen', unit: 'cm', def: 12, min: 0 },
      { key: 'height', term: 'heightGeo', unit: 'cm', def: 8, min: 0 },
    ],
    formula: '{area} = {baseLen} × {heightGeo} ÷ 2',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round((v.base * v.height) / 2, 2), digits: 2, primary: true },
    ],
    ko: { title: '삼각형 면적 계산기', desc: '밑변과 높이로 삼각형의 면적을 구합니다.',
      long: '어떤 삼각형이든 밑변 곱하기 높이를 2로 나누면 면적입니다. 같은 밑변과 높이라면 모양이 아무리 기울어도 면적은 같습니다.',
      note: '높이는 밑변에 수직인 거리입니다. 기울어진 변의 길이를 높이로 넣으면 면적이 크게 나옵니다.' },
    en: { title: 'Triangle Area Calculator', desc: 'Find a triangle’s area from its base and height.',
      long: 'For any triangle, area is base times height over two. With the same base and height the area is identical no matter how skewed the shape.',
      note: 'Height means the perpendicular distance to the base — using a slanted side instead overstates the area.' },
  },
  {
    slug: 'triangle-heron',
    icon: '📐',
    category: '평면 도형',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 5, min: 0 },
      { key: 'b', term: 'sideB', unit: 'cm', def: 6, min: 0 },
      { key: 'c', term: 'sideC', unit: 'cm', def: 7, min: 0 },
    ],
    formula: '{area} = √(s(s−a)(s−b)(s−c)),  s = ({sideA}+{sideB}+{sideC}) ÷ 2',
    compute: v => {
      const s = (v.a + v.b + v.c) / 2;
      const inner = s * (s - v.a) * (s - v.b) * (s - v.c);
      return [
        { term: 'area', unit: 'cm2', value: round(inner > 0 ? Math.sqrt(inner) : 0, 3), digits: 3, primary: true },
        { term: 'perimeter', unit: 'cm', value: round(v.a + v.b + v.c, 2), digits: 2 },
      ];
    },
    verdict: v => {
      const [a, b, c] = [v.a, v.b, v.c].sort((x, y) => x - y);
      return a + b <= c ? {
        ko: '두 변의 합이 나머지 한 변보다 짧아 삼각형이 만들어지지 않습니다.',
        en: 'Two sides do not add up to more than the third, so no triangle exists.',
        tone: 'bad',
      } : null;
    },
    ko: { title: '헤론의 공식 계산기', desc: '높이를 몰라도 세 변 길이만으로 삼각형 면적을 구합니다.',
      long: '세 변의 합을 반으로 나눈 값을 s라 하고, s에서 각 변을 뺀 세 값을 모두 곱한 뒤 제곱근을 씌웁니다. 땅의 면적을 잴 때 실제로 쓰이는 방법입니다.',
      note: '두 변의 합이 나머지 한 변보다 커야 삼각형이 됩니다. 그렇지 않으면 면적이 0으로 나옵니다.' },
    en: { title: "Heron's Formula Calculator", desc: 'Find a triangle’s area from three side lengths, without knowing the height.',
      long: 'Halve the perimeter to get s, multiply s by (s − each side), and take the square root. Surveyors use exactly this to measure plots of land.',
      note: 'Any two sides must sum to more than the third, otherwise no triangle exists and the area comes out zero.' },
  },
  {
    slug: 'trapezoid-area',
    icon: '🪁',
    category: '평면 도형',
    fields: [
      { key: 'top', term: 'baseTop', unit: 'cm', def: 6, min: 0 },
      { key: 'bottom', term: 'baseLen', unit: 'cm', def: 10, min: 0 },
      { key: 'height', term: 'heightGeo', unit: 'cm', def: 5, min: 0 },
    ],
    formula: '{area} = ({baseTop} + {baseLen}) × {heightGeo} ÷ 2',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round(((v.top + v.bottom) * v.height) / 2, 2), digits: 2, primary: true },
      { term: 'result', unit: 'cm', value: round((v.top + v.bottom) / 2, 2), digits: 2 },
    ],
    ko: { title: '사다리꼴 면적 계산기', desc: '윗변·아랫변·높이로 사다리꼴 면적을 구합니다.',
      long: '윗변과 아랫변을 더해 반으로 나누면 평균 폭이고, 거기에 높이를 곱하면 면적입니다. 아래 값이 그 평균 폭입니다.',
      note: '높이는 두 평행한 변 사이의 수직 거리입니다. 비스듬한 변의 길이가 아닙니다.' },
    en: { title: 'Trapezoid Area Calculator', desc: 'Area of a trapezoid from its two parallel sides and height.',
      long: 'Average the two parallel sides to get the mean width, then multiply by the height. The second figure is that mean width.',
      note: 'Height is the perpendicular distance between the parallel sides, not the length of a slanted side.' },
  },
  {
    slug: 'parallelogram-area',
    icon: '🟪',
    category: '평면 도형',
    fields: [
      { key: 'base', term: 'baseLen', unit: 'cm', def: 12, min: 0 },
      { key: 'height', term: 'heightGeo', unit: 'cm', def: 7, min: 0 },
      { key: 'side', term: 'sideB', unit: 'cm', def: 9, min: 0 },
    ],
    formula: '{area} = {baseLen} × {heightGeo}',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round(v.base * v.height, 2), digits: 2, primary: true },
      { term: 'perimeter', unit: 'cm', value: round(2 * (v.base + v.side), 2), digits: 2 },
    ],
    ko: { title: '평행사변형 면적 계산기', desc: '밑변과 높이로 평행사변형의 면적과 둘레를 구합니다.',
      long: '평행사변형은 직사각형을 기울인 모양이라 면적은 밑변 곱하기 높이 그대로입니다. 둘레는 두 변의 합을 두 배 한 값입니다.',
      note: '기울일수록 높이는 줄지만 변의 길이는 그대로입니다. 둘레가 같아도 면적은 크게 달라집니다.' },
    en: { title: 'Parallelogram Area', desc: 'Area and perimeter of a parallelogram from base, height and side.',
      long: 'A parallelogram is a sheared rectangle, so area stays base times height. The perimeter is twice the sum of the two side lengths.',
      note: 'Shearing reduces the height but not the side lengths — equal perimeters can mean very different areas.' },
  },
  {
    slug: 'rhombus-area',
    icon: '🔷',
    category: '평면 도형',
    fields: [
      { key: 'd1', term: 'diagonal1', unit: 'cm', def: 10, min: 0 },
      { key: 'd2', term: 'diagonal2', unit: 'cm', def: 8, min: 0 },
    ],
    formula: '{area} = {diagonal1} × {diagonal2} ÷ 2',
    compute: v => {
      const side = Math.sqrt((v.d1 / 2) ** 2 + (v.d2 / 2) ** 2);
      return [
        { term: 'area', unit: 'cm2', value: round((v.d1 * v.d2) / 2, 2), digits: 2, primary: true },
        { term: 'sideLen', unit: 'cm', value: round(side, 3), digits: 3 },
        { term: 'perimeter', unit: 'cm', value: round(4 * side, 2), digits: 2 },
      ];
    },
    ko: { title: '마름모 면적 계산기', desc: '두 대각선 길이로 마름모의 면적과 한 변을 구합니다.',
      long: '마름모의 대각선은 서로 수직이라 면적은 두 대각선을 곱해 2로 나눈 값입니다. 한 변은 대각선 절반들로 만든 직각삼각형의 빗변입니다.',
      note: '정사각형도 마름모의 한 종류입니다. 대각선이 같으면 정사각형이 됩니다.' },
    en: { title: 'Rhombus Area Calculator', desc: 'Area and side length of a rhombus from its two diagonals.',
      long: 'The diagonals of a rhombus cross at right angles, so the area is their product over two. The side is the hypotenuse of the triangle formed by the half-diagonals.',
      note: 'A square is a rhombus too — equal diagonals give you a square.' },
  },
  {
    slug: 'regular-polygon-area',
    icon: '🔶',
    category: '평면 도형',
    fields: [
      { key: 'n', term: 'sideCount', def: 6, min: 3, max: 100, step: 1 },
      { key: 'side', term: 'sideLen', unit: 'cm', def: 10, min: 0 },
    ],
    formula: '{area} = {sideCount} × {sideLen}² ÷ (4 × tan(π ÷ {sideCount}))',
    compute: v => {
      const n = Math.max(3, Math.round(v.n));
      const area = ratio(n * v.side ** 2, 4 * Math.tan(PI / n));
      return [
        { term: 'area', unit: 'cm2', value: round(area, 2), digits: 2, primary: true },
        { term: 'perimeter', unit: 'cm', value: round(n * v.side, 2), digits: 2 },
        { term: 'innerAngle', unit: 'deg', value: round(((n - 2) * 180) / n, 2), digits: 2 },
      ];
    },
    ko: { title: '정다각형 면적 계산기', desc: '변의 수와 한 변 길이로 정다각형의 면적을 구합니다.',
      long: '정다각형은 중심에서 n개의 이등변삼각형으로 쪼갤 수 있습니다. 변이 많아질수록 같은 둘레에서 면적이 커지고, 결국 원에 가까워집니다.',
      note: '한 변 10cm 정육각형은 259.81㎠입니다. 같은 둘레의 정사각형(15cm)은 225㎠로 더 작습니다.' },
    en: { title: 'Regular Polygon Area', desc: 'Area of a regular polygon from side count and side length.',
      long: 'A regular polygon splits into n isosceles triangles from the centre. More sides means more area for the same perimeter, approaching a circle in the limit.',
      note: 'A hexagon with 10 cm sides is 259.81 cm². A square of the same perimeter (15 cm sides) is only 225 cm².' },
  },
  {
    slug: 'ellipse-area',
    icon: '🥚',
    category: '평면 도형',
    fields: [
      { key: 'a', term: 'axisA', unit: 'cm', def: 10, min: 0 },
      { key: 'b', term: 'axisB', unit: 'cm', def: 6, min: 0 },
    ],
    formula: '{area} = π × {axisA} × {axisB}',
    compute: v => {
      // 타원 둘레는 정확한 초등 공식이 없다 — 라마누잔 근사식을 쓴다
      const h = ((v.a - v.b) ** 2) / ((v.a + v.b) ** 2 || 1);
      const peri = PI * (v.a + v.b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
      return [
        { term: 'area', unit: 'cm2', value: round(PI * v.a * v.b, 2), digits: 2, primary: true },
        { term: 'circumference', unit: 'cm', value: round(peri, 2), digits: 2 },
      ];
    },
    ko: { title: '타원 면적 계산기', desc: '장반경과 단반경으로 타원의 면적과 둘레를 구합니다.',
      long: '면적은 두 반경을 곱하고 π를 곱하면 되지만, 둘레는 초등 함수로 딱 떨어지지 않습니다. 여기서는 라마누잔 근사식을 씁니다.',
      note: '두 반경이 같으면 원이 됩니다. 반경이 아니라 지름을 넣으면 면적이 네 배로 나옵니다.' },
    en: { title: 'Ellipse Area Calculator', desc: 'Area and perimeter of an ellipse from its two semi-axes.',
      long: 'Area is simply π times both semi-axes, but the perimeter has no closed elementary form — this uses Ramanujan’s approximation.',
      note: 'Equal semi-axes give a circle. Entering diameters instead of semi-axes quadruples the area.' },
  },
  {
    slug: 'sector-area',
    icon: '🍕',
    category: '평면 도형',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 10, min: 0 },
      { key: 'angle', term: 'angleDeg', unit: 'deg', def: 60, min: 0, max: 360 },
    ],
    formula: '{area} = π × {radius}² × {angleDeg} ÷ 360',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round((PI * v.r ** 2 * v.angle) / 360, 2), digits: 2, primary: true },
      { term: 'arcLen', unit: 'cm', value: round((2 * PI * v.r * v.angle) / 360, 2), digits: 2 },
      { term: 'perimeter', unit: 'cm', value: round((2 * PI * v.r * v.angle) / 360 + 2 * v.r, 2), digits: 2 },
    ],
    ko: { title: '부채꼴 면적 계산기', desc: '반지름과 중심각으로 부채꼴의 면적과 호의 길이를 구합니다.',
      long: '부채꼴은 원의 일부이므로 원 면적에 중심각을 360으로 나눈 비율을 곱합니다. 둘레는 호에 반지름 두 개를 더한 값입니다.',
      note: '360°를 넣으면 원 전체가 됩니다. 피자 한 조각의 면적을 구할 때 그대로 쓸 수 있습니다.' },
    en: { title: 'Circular Sector Area', desc: 'Area and arc length of a sector from radius and central angle.',
      long: 'A sector is a fraction of the circle, so multiply the full area by the angle over 360. The perimeter is the arc plus two radii.',
      note: 'Enter 360° and you get the whole circle. This is exactly how you size a slice of pizza.' },
  },
];
