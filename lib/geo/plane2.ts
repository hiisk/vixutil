/**
 * 도형 - 평면 도형 둘째 묶음 (10종)
 *
 * 첫 묶음이 넓이 공식이었으니 여기는 한 값에서 나머지가 줄줄이 나오는 것들 —
 * 한 변에서 면적·둘레·대각선까지, 세 변에서 내접원·외접원까지.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const D2R = Math.PI / 180;

export const PLANE2_TOOLS: FormulaTool[] = [
  {
    slug: 'square-area',
    icon: '🟥',
    category: '평면 도형',
    fields: [{ key: 'a', term: 'sideSquare', unit: 'cm', def: 12, min: 0 }],
    formula: '{area} = {sideSquare} ²',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round(v.a * v.a, 2), digits: 2, primary: true },
      { term: 'perimeter', unit: 'cm', value: round(v.a * 4, 2), digits: 2 },
      { term: 'diagonal', unit: 'cm', value: round(v.a * Math.SQRT2, 3), digits: 3 },
    ],
    ko: { title: '정사각형 면적·둘레·대각선', desc: '한 변만 넣으면 면적, 둘레, 대각선이 함께 나옵니다.',
      long: '면적은 한 변의 제곱, 둘레는 네 배, 대각선은 한 변에 √2(약 1.414)를 곱한 값입니다. 대각선이 한 변보다 41% 길다는 사실은 가구를 문으로 넣을 때 자주 쓰입니다.',
      note: '면적의 단위는 길이의 제곱입니다. cm를 넣으면 ㎠, m를 넣으면 ㎡가 나오므로 단위를 섞지 마세요.' },
    en: { title: 'Square: Area, Perimeter, Diagonal', desc: 'One side gives you area, perimeter and the diagonal.',
      long: 'Area is the side squared, perimeter is four times the side, and the diagonal is the side times √2 (about 1.414). That 41% extra length is what matters when you carry furniture through a doorway.',
      note: 'Area units are length squared: enter centimetres and you get cm², metres and you get m². Do not mix them.' },
  },
  {
    slug: 'rect-diagonal',
    icon: '📱',
    category: '평면 도형',
    fields: [
      { key: 'w', term: 'lengthCm', unit: 'cm', def: 160, min: 0 },
      { key: 'h', term: 'widthCm', unit: 'cm', def: 90, min: 0 },
    ],
    formula: '{diagonal} = √({lengthCm} ² + {widthCm} ²)',
    compute: v => [
      { term: 'diagonal', unit: 'cm', value: round(Math.hypot(v.w, v.h), 2), digits: 2, primary: true },
      { term: 'area', unit: 'cm2', value: round(v.w * v.h, 1), digits: 1 },
      { term: 'perimeter', unit: 'cm', value: round((v.w + v.h) * 2, 1), digits: 1 },
      { term: 'shapeRatio', unit: 'none', value: round(ratio(v.w, v.h), 3), digits: 3 },
    ],
    ko: { title: '직사각형 대각선 계산기', desc: '가로와 세로로 대각선, 면적, 둘레를 함께 구합니다.',
      long: '대각선은 가로와 세로를 두 변으로 하는 직각삼각형의 빗변이므로 피타고라스 정리로 구합니다. 화면 크기, 액자, 문틀 통과 여부가 모두 이 값으로 결정됩니다.',
      note: '가구를 문으로 넣을 때는 대각선만으로 부족합니다. 두께가 있으면 회전 여유가 필요하므로 실제로는 대각선보다 조금 더 넓어야 합니다.' },
    en: { title: 'Rectangle Diagonal', desc: 'Diagonal, area and perimeter from width and height.',
      long: 'The diagonal is the hypotenuse of a right triangle whose legs are the sides, so Pythagoras gives it. Screen sizes, picture frames and whether something clears a doorway all come down to this figure.',
      note: 'The diagonal alone is not enough for moving furniture. Anything with thickness needs room to rotate, so the opening has to be a little wider than the diagonal.' },
  },
  {
    slug: 'equilateral-triangle',
    icon: '🔺',
    category: '평면 도형',
    fields: [{ key: 'a', term: 'sideLen', unit: 'cm', def: 10, min: 0 }],
    formula: '{area} = √3 ÷ 4 × {sideLen} ²',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round(Math.sqrt(3) / 4 * v.a * v.a, 3), digits: 3, primary: true },
      { term: 'heightTri', unit: 'cm', value: round(Math.sqrt(3) / 2 * v.a, 3), digits: 3 },
      { term: 'inradius', unit: 'cm', value: round(v.a / (2 * Math.sqrt(3)), 3), digits: 3 },
      { term: 'circumradius', unit: 'cm', value: round(v.a / Math.sqrt(3), 3), digits: 3 },
    ],
    ko: { title: '정삼각형 면적·높이 계산기', desc: '한 변으로 면적, 높이, 내접원·외접원 반지름을 구합니다.',
      long: '정삼각형은 한 변만 알면 나머지가 모두 정해집니다. 높이는 한 변의 √3÷2배이고, 면적은 √3÷4에 한 변의 제곱을 곱합니다. 외접원 반지름은 내접원 반지름의 정확히 두 배입니다.',
      note: '높이를 한 변의 절반으로 착각하기 쉽습니다. 정삼각형의 높이는 한 변의 약 0.866배입니다.' },
    en: { title: 'Equilateral Triangle', desc: 'Area, height and both circle radii from one side.',
      long: 'Knowing one side fixes everything else. The height is √3÷2 of the side, the area is √3÷4 times the side squared, and the circumradius is exactly twice the inradius.',
      note: 'It is easy to assume the height is half the side. It is actually about 0.866 of it.' },
  },
  {
    slug: 'hexagon-area',
    icon: '🐝',
    category: '평면 도형',
    fields: [{ key: 'a', term: 'sideLen', unit: 'cm', def: 8, min: 0 }],
    formula: '{area} = 3 × √3 ÷ 2 × {sideLen} ²',
    compute: v => [
      { term: 'area', unit: 'cm2', value: round(3 * Math.sqrt(3) / 2 * v.a * v.a, 2), digits: 2, primary: true },
      { term: 'perimeter', unit: 'cm', value: round(v.a * 6, 2), digits: 2 },
      { term: 'diagonal', unit: 'cm', value: round(v.a * 2, 2), digits: 2 },
      { term: 'inradius', unit: 'cm', value: round(Math.sqrt(3) / 2 * v.a, 3), digits: 3 },
    ],
    ko: { title: '정육각형 면적 계산기', desc: '한 변으로 정육각형의 면적과 대각선을 구합니다.',
      long: '정육각형은 정삼각형 여섯 개를 붙인 모양이라 면적이 정삼각형 여섯 배입니다. 가장 긴 대각선은 한 변의 정확히 두 배이고, 마주 보는 변 사이 거리는 한 변의 √3배입니다.',
      note: '벌집과 육각 타일이 육각형인 이유는 같은 면적을 둘러싸는 데 드는 둘레가 사각형보다 짧기 때문입니다.' },
    en: { title: 'Regular Hexagon Area', desc: 'Area and diagonals of a hexagon from one side.',
      long: 'A regular hexagon is six equilateral triangles, so its area is six times theirs. The longest diagonal is exactly twice the side, and the distance across the flats is √3 times the side.',
      note: 'Honeycomb and hex tiles use this shape because it encloses a given area with less perimeter than a square.' },
  },
  {
    slug: 'triangle-sas-area',
    icon: '📐',
    category: '평면 도형',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 9, min: 0 },
      { key: 'b', term: 'sideB', unit: 'cm', def: 12, min: 0 },
      { key: 'ang', term: 'included', unit: 'deg', def: 50, min: 0, max: 180 },
    ],
    formula: '{area} = {sideA} × {sideB} × sin {included} ÷ 2',
    compute: v => {
      const area = v.a * v.b * Math.sin(v.ang * D2R) / 2;
      const c = Math.sqrt(v.a * v.a + v.b * v.b - 2 * v.a * v.b * Math.cos(v.ang * D2R));
      return [
        { term: 'area', unit: 'cm2', value: round(area, 3), digits: 3, primary: true },
        { term: 'sideC', unit: 'cm', value: round(c, 3), digits: 3 },
        { term: 'perimeter', unit: 'cm', value: round(v.a + v.b + c, 3), digits: 3 },
      ];
    },
    ko: { title: '두 변과 끼인각으로 삼각형 면적', desc: '높이를 몰라도 두 변과 그 사이 각으로 면적을 구합니다.',
      long: '밑변 × 높이 ÷ 2를 쓰려면 높이를 알아야 하지만, 높이는 재기 어려울 때가 많습니다. 두 변과 끼인각을 알면 sin을 써서 바로 면적이 나옵니다. 나머지 한 변은 코사인 법칙으로 함께 구했습니다.',
      note: '각이 끼인각이 아니면 이 공식이 성립하지 않습니다. 두 변이 만나서 이루는 각이어야 합니다.' },
    en: { title: 'Triangle Area from Two Sides and the Angle', desc: 'Find the area without knowing the height.',
      long: 'Base times height over two needs a height, which is often the hard thing to measure. With two sides and the angle between them, a sine gives the area directly. The third side comes from the cosine rule.',
      note: 'The angle has to be the one between the two sides. Any other angle breaks the formula.' },
  },
  {
    slug: 'triangle-inradius',
    icon: '⭕',
    category: '평면 도형',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 6, min: 0 },
      { key: 'b', term: 'sideB', unit: 'cm', def: 8, min: 0 },
      { key: 'c', term: 'sideC', unit: 'cm', def: 10, min: 0 },
    ],
    formula: '{inradius} = {area} ÷ ({perimeter} ÷ 2)',
    compute: v => {
      const s = (v.a + v.b + v.c) / 2;
      const area = Math.sqrt(Math.max(0, s * (s - v.a) * (s - v.b) * (s - v.c)));
      return [
        { term: 'inradius', unit: 'cm', value: round(ratio(area, s), 3), digits: 3, primary: true },
        { term: 'area', unit: 'cm2', value: round(area, 3), digits: 3 },
        { term: 'perimeter', unit: 'cm', value: round(v.a + v.b + v.c, 2), digits: 2 },
      ];
    },
    ko: { title: '삼각형 내접원 반지름 계산기', desc: '세 변으로 삼각형에 꼭 맞게 들어가는 원의 반지름을 구합니다.',
      long: '내접원은 세 변에 모두 닿는 원입니다. 반지름은 삼각형 면적을 둘레의 절반으로 나눈 값인데, 면적은 세 변만으로 헤론 공식으로 구할 수 있으므로 결국 세 변만 알면 됩니다.',
      note: '세 변으로 삼각형이 만들어지지 않으면(한 변이 나머지 두 변의 합보다 길면) 면적이 0으로 나옵니다.' },
    en: { title: 'Triangle Inradius', desc: 'The radius of the circle that fits snugly inside a triangle.',
      long: 'The incircle touches all three sides. Its radius is the area divided by half the perimeter, and since Heron’s formula gives the area from the sides alone, three sides are all you need.',
      note: 'If the sides cannot form a triangle — one longer than the other two combined — the area comes out as zero.' },
  },
  {
    slug: 'triangle-circumradius',
    icon: '🔵',
    category: '평면 도형',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 7, min: 0 },
      { key: 'b', term: 'sideB', unit: 'cm', def: 9, min: 0 },
      { key: 'c', term: 'sideC', unit: 'cm', def: 12, min: 0 },
    ],
    formula: '{circumradius} = {sideA} × {sideB} × {sideC} ÷ (4 × {area})',
    compute: v => {
      const s = (v.a + v.b + v.c) / 2;
      const area = Math.sqrt(Math.max(0, s * (s - v.a) * (s - v.b) * (s - v.c)));
      return [
        { term: 'circumradius', unit: 'cm', value: round(ratio(v.a * v.b * v.c, 4 * area), 3), digits: 3, primary: true },
        { term: 'area', unit: 'cm2', value: round(area, 3), digits: 3 },
        { term: 'circumference', unit: 'cm', value: round(2 * Math.PI * ratio(v.a * v.b * v.c, 4 * area), 2), digits: 2 },
      ];
    },
    ko: { title: '삼각형 외접원 반지름 계산기', desc: '세 변으로 세 꼭짓점을 지나는 원의 반지름을 구합니다.',
      long: '외접원은 세 꼭짓점을 모두 지나는 원입니다. 세 변의 곱을 면적의 네 배로 나누면 반지름이 나옵니다. 직각삼각형에서는 빗변이 지름이 되므로 반지름이 빗변의 절반입니다.',
      note: '세 점이 한 직선에 가까울수록 외접원이 급격히 커집니다. 완전히 일직선이면 원을 그릴 수 없습니다.' },
    en: { title: 'Triangle Circumradius', desc: 'The radius of the circle through all three vertices.',
      long: 'The circumcircle passes through every vertex. Divide the product of the three sides by four times the area. In a right triangle the hypotenuse is the diameter, so the radius is half of it.',
      note: 'The closer the three points come to a straight line, the larger the circumcircle grows. Perfectly collinear points have no circle at all.' },
  },
  {
    slug: 'polygon-perimeter',
    icon: '🔷',
    category: '평면 도형',
    fields: [
      { key: 'n', term: 'sideCount', def: 8, min: 3, max: 100 },
      { key: 'a', term: 'sideLen', unit: 'cm', def: 5, min: 0 },
    ],
    formula: '{circumradius} = {sideLen} ÷ (2 × sin(180 ÷ {sideCount}))',
    compute: v => {
      const half = Math.PI / v.n;
      return [
        { term: 'circumradius', unit: 'cm', value: round(ratio(v.a, 2 * Math.sin(half)), 3), digits: 3, primary: true },
        { term: 'inradius', unit: 'cm', value: round(ratio(v.a, 2 * Math.tan(half)), 3), digits: 3 },
        { term: 'perimeter', unit: 'cm', value: round(v.n * v.a, 2), digits: 2 },
        { term: 'area', unit: 'cm2', value: round(v.n * v.a * v.a / (4 * Math.tan(half)), 2), digits: 2 },
      ];
    },
    ko: { title: '정다각형 외접원·내접원 반지름', desc: '변의 수와 한 변으로 두 원의 반지름을 구합니다.',
      long: '정다각형은 꼭짓점이 외접원 위에, 변이 내접원에 닿습니다. 한 변을 2sin(180°÷n)으로 나누면 외접원 반지름, 2tan(180°÷n)으로 나누면 내접원 반지름입니다. n이 커지면 두 값이 같아지며 원에 가까워집니다.',
      note: '원을 다각형으로 근사할 때 n이 얼마나 커야 하는지를 이 두 값의 차이로 판단할 수 있습니다. n이 36이면 차이가 0.4% 이내입니다.' },
    en: { title: 'Regular Polygon: Both Radii', desc: 'Circumradius and inradius from the side count and side length.',
      long: 'Vertices sit on the circumcircle and the sides touch the incircle. Divide the side by 2·sin(180°/n) for the circumradius and by 2·tan(180°/n) for the inradius. As n grows the two converge and the shape becomes a circle.',
      note: 'The gap between the two radii tells you how large n must be to approximate a circle. At n = 36 they differ by under 0.4%.' },
  },
  {
    slug: 'similar-scale',
    icon: '🔍',
    category: '평면 도형',
    fields: [
      { key: 'k', term: 'scaleFactor', unit: 'times', def: 2, min: 0.01, max: 100 },
      { key: 'area', term: 'area', unit: 'cm2', def: 50, min: 0 },
    ],
    formula: '{areaRatio} = {scaleFactor} ², {volumeRatio} = {scaleFactor} ³',
    compute: v => [
      { term: 'areaRatio', unit: 'times', value: round(v.k * v.k, 4), digits: 4, primary: true },
      { term: 'volumeRatio', unit: 'times', value: round(v.k * v.k * v.k, 4), digits: 4 },
      { term: 'area', unit: 'cm2', value: round(v.area * v.k * v.k, 2), digits: 2 },
    ],
    verdict: (v, out) => ({
      ko: `길이를 ${v.k}배로 키우면 면적은 ${out[0].value}배, 부피는 ${out[1].value}배가 됩니다.`,
      en: `Scale length by ${v.k} and area grows ${out[0].value}×, volume ${out[1].value}×.`,
      l10n: { es: `Escala la longitud por ${v.k} y el área crece ${out[0].value}×, el volumen ${out[1].value}×.`, 'pt-br': `Escale o comprimento por ${v.k} e a área cresce ${out[0].value}×, o volume ${out[1].value}×.`, ja: `長さを${v.k}倍にすると、面積は${out[0].value}倍、体積は${out[1].value}倍になります。`, de: `Skalier die Länge mit ${v.k} und die Fläche wächst um das ${out[0].value}-Fache, das Volumen um das ${out[1].value}-Fache.`, fr: `Multiplie la longueur par ${v.k} et l’aire est multipliée par ${out[0].value}, le volume par ${out[1].value}.`, hi: `लंबाई ${v.k} गुना करें तो क्षेत्रफल ${out[0].value} गुना और आयतन ${out[1].value} गुना हो जाता है।` },
      tone: 'good',
    }),
    ko: { title: '닮음비 → 면적비·부피비', desc: '길이를 몇 배로 키우면 면적과 부피가 몇 배가 되는지 계산합니다.',
      long: '길이가 k배가 되면 면적은 k², 부피는 k³배가 됩니다. 지도를 두 배로 확대하면 종이는 네 배 들고, 케이크 지름을 두 배로 하면 반죽은 여덟 배 필요합니다.',
      note: '피자 크기를 비교할 때 지름이 1.4배면 양은 두 배입니다. 지름 차이가 작아 보여도 양 차이는 큽니다.' },
    en: { title: 'Scale Factor to Area and Volume', desc: 'How area and volume grow when you scale length.',
      long: 'Scale length by k and area scales by k², volume by k³. Doubling a map takes four times the paper; doubling a cake’s diameter takes eight times the batter.',
      note: 'When comparing pizzas, 1.4 times the diameter is twice the food. A small-looking difference in diameter is a large difference in amount.' },
  },
  {
    slug: 'triangle-centroid',
    icon: '⚖️',
    category: '평면 도형',
    fields: [
      { key: 'x1', term: 'x1', def: 0 },
      { key: 'y1', term: 'y1', def: 0 },
      { key: 'x2', term: 'x2', def: 8, },
      { key: 'y2', term: 'y2', def: 2 },
      { key: 'x3', term: 'x3', def: 3 },
      { key: 'y3', term: 'y3', def: 7 },
    ],
    formula: '{centroidX} = ({x1} + {x2} + {x3}) ÷ 3',
    compute: v => {
      const area = Math.abs(v.x1 * (v.y2 - v.y3) + v.x2 * (v.y3 - v.y1) + v.x3 * (v.y1 - v.y2)) / 2;
      return [
        { term: 'centroidX', unit: 'none', value: round((v.x1 + v.x2 + v.x3) / 3, 3), digits: 3, primary: true },
        { term: 'centroidY', unit: 'none', value: round((v.y1 + v.y2 + v.y3) / 3, 3), digits: 3 },
        { term: 'area', unit: 'none', value: round(area, 3), digits: 3 },
      ];
    },
    ko: { title: '삼각형 무게중심 좌표 계산기', desc: '세 꼭짓점 좌표로 무게중심과 면적을 구합니다.',
      long: '무게중심은 세 좌표의 평균입니다. 세 중선이 만나는 점이고, 종이로 만든 삼각형을 이 점에서 받치면 균형이 잡힙니다. 면적은 신발끈 공식으로 함께 구했습니다.',
      note: '무게중심은 각 중선을 2:1로 나눕니다. 꼭짓점 쪽이 2, 마주 보는 변 쪽이 1입니다.' },
    en: { title: 'Triangle Centroid', desc: 'Centroid and area from three vertex coordinates.',
      long: 'The centroid is simply the average of the three coordinates. It is where the medians meet, and a paper triangle balances on it. The area comes from the shoelace formula.',
      note: 'The centroid cuts each median in a 2:1 ratio — two parts towards the vertex, one towards the opposite side.' },
  },
];
