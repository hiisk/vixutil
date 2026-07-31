/**
 * 도형 - 삼각비·각 둘째 묶음 (10종)
 *
 * 첫 묶음이 피타고라스와 삼각비 값이었으니 여기는 실제로 재는 쪽 — 사인법칙,
 * 세 변에서 각 구하기, 각도로 높이 재기, 좌표 사이 거리와 방위각이다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

export const TRIG2_TOOLS: FormulaTool[] = [
  {
    slug: 'sine-rule',
    icon: '📏',
    category: '삼각비·각',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 10, min: 0.01 },
      { key: 'angA', term: 'angleA', unit: 'deg', def: 40, min: 0.1, max: 179 },
      { key: 'angB', term: 'angleB', unit: 'deg', def: 65, min: 0.1, max: 179 },
    ],
    formula: '{sideB} = {sideA} × sin {angleB} ÷ sin {angleA}',
    compute: v => {
      const angC = 180 - v.angA - v.angB;
      const k = ratio(v.a, Math.sin(v.angA * D2R));
      return [
        { term: 'sideB', unit: 'cm', value: round(k * Math.sin(v.angB * D2R), 3), digits: 3, primary: true },
        { term: 'sideC', unit: 'cm', value: round(k * Math.sin(angC * D2R), 3), digits: 3 },
        { term: 'angleC', unit: 'deg', value: round(angC, 2), digits: 2 },
        { term: 'circumradius', unit: 'cm', value: round(k / 2, 3), digits: 3 },
      ];
    },
    ko: { title: '사인법칙 계산기', desc: '한 변과 두 각으로 나머지 변과 각을 구합니다.',
      long: '삼각형에서 변과 마주 보는 각의 사인의 비는 항상 일정합니다. 그 비는 외접원 지름과 같아서, 한 변과 그 대각을 알면 삼각형 전체가 정해집니다. 세 각의 합이 180°인 것으로 남은 각도 나옵니다.',
      note: '두 변과 그 사이가 아닌 각을 아는 경우에는 삼각형이 두 개 나올 수 있습니다. 이 계산기는 한 변과 두 각을 받으므로 그 모호함이 없습니다.' },
    en: { title: 'Law of Sines', desc: 'Find the remaining sides and angle from one side and two angles.',
      long: 'In any triangle the ratio of a side to the sine of its opposite angle is constant, and that ratio equals the circumcircle’s diameter. One side with its opposite angle therefore fixes the whole triangle, and the third angle follows from the 180° sum.',
      note: 'Two sides and a non-included angle can yield two valid triangles. Taking one side and two angles, as here, avoids that ambiguity.' },
  },
  {
    slug: 'angles-from-sides',
    icon: '🔺',
    category: '삼각비·각',
    fields: [
      { key: 'a', term: 'sideA', unit: 'cm', def: 7, min: 0.01 },
      { key: 'b', term: 'sideB', unit: 'cm', def: 9, min: 0.01 },
      { key: 'c', term: 'sideC', unit: 'cm', def: 12, min: 0.01 },
    ],
    formula: '{angleA} = acos(({sideB} ² + {sideC} ² − {sideA} ²) ÷ (2 × {sideB} × {sideC}))',
    compute: v => {
      const ang = (x: number, y: number, z: number) =>
        Math.acos(Math.min(1, Math.max(-1, ratio(y * y + z * z - x * x, 2 * y * z)))) * R2D;
      return [
        { term: 'angleA', unit: 'deg', value: round(ang(v.a, v.b, v.c), 2), digits: 2, primary: true },
        { term: 'angleB', unit: 'deg', value: round(ang(v.b, v.a, v.c), 2), digits: 2 },
        { term: 'angleC', unit: 'deg', value: round(ang(v.c, v.a, v.b), 2), digits: 2 },
      ];
    },
    verdict: (_v, out) => {
      const max = Math.max(out[0].value, out[1].value, out[2].value);
      return max > 90.5
        ? { ko: `가장 큰 각이 ${round(max, 1)}°로 둔각삼각형입니다.`, en: `The largest angle is ${round(max, 1)}° — an obtuse triangle.`, l10n: { es: `El mayor ángulo mide ${round(max, 1)}°: es un triángulo obtusángulo.`, 'pt-br': `O maior ângulo mede ${round(max, 1)}°: é um triângulo obtusângulo.`, ja: `いちばん大きい角が${round(max, 1)}°で、鈍角三角形です。`, de: `Der größte Winkel misst ${round(max, 1)}° — ein stumpfwinkliges Dreieck.`, fr: `Le plus grand angle vaut ${round(max, 1)}° : c’est un triangle obtusangle.`, hi: `सबसे बड़ा कोण ${round(max, 1)}° का है — यह अधिककोण त्रिभुज है।` }, tone: 'good' }
        : max > 89.5
          ? { ko: `가장 큰 각이 ${round(max, 1)}°로 직각삼각형입니다.`, en: `The largest angle is ${round(max, 1)}° — a right triangle.`, l10n: { es: `El mayor ángulo mide ${round(max, 1)}°: es un triángulo rectángulo.`, 'pt-br': `O maior ângulo mede ${round(max, 1)}°: é um triângulo retângulo.`, ja: `いちばん大きい角が${round(max, 1)}°で、直角三角形です。`, de: `Der größte Winkel misst ${round(max, 1)}° — ein rechtwinkliges Dreieck.`, fr: `Le plus grand angle vaut ${round(max, 1)}° : c’est un triangle rectangle.`, hi: `सबसे बड़ा कोण ${round(max, 1)}° का है — यह समकोण त्रिभुज है।` }, tone: 'good' }
          : { ko: `모든 각이 90° 미만인 예각삼각형입니다.`, en: `Every angle is under 90° — an acute triangle.`, l10n: { es: `Todos los ángulos quedan por debajo de 90°: es un triángulo acutángulo.`, 'pt-br': `Todos os ângulos ficam abaixo de 90°: é um triângulo acutângulo.`, ja: `すべての角が90°未満で、鋭角三角形です。`, de: `Jeder Winkel liegt unter 90° — ein spitzwinkliges Dreieck.`, fr: `Tous les angles sont sous 90° : c’est un triangle acutangle.`, hi: `हर कोण 90° से कम है — यह न्यूनकोण त्रिभुज है।` }, tone: 'good' };
    },
    ko: { title: '세 변으로 세 각 구하기', desc: '변 길이만 재서 삼각형의 세 각을 모두 구합니다.',
      long: '코사인 법칙을 각에 대해 풀면 세 변만으로 각이 나옵니다. 각도기 없이 줄자만으로 각을 아는 방법이라 목공과 측량에서 씁니다. 세 각의 합이 180°인지 확인하면 검산이 됩니다.',
      note: '한 변이 나머지 두 변의 합보다 길면 삼각형이 만들어지지 않습니다. 그 경우 각이 0이나 180°로 눌립니다.' },
    en: { title: 'All Three Angles from Three Sides', desc: 'Measure only the sides and get every angle.',
      long: 'Solving the cosine rule for the angle gives all three from the sides alone. It is how you find angles with a tape measure and no protractor, which is why carpenters and surveyors use it. Check that the three add to 180°.',
      note: 'If one side exceeds the other two combined, no triangle exists and the angles collapse to 0 or 180°.' },
  },
  {
    slug: 'height-from-angle',
    icon: '🏗️',
    category: '삼각비·각',
    fields: [
      { key: 'dist', term: 'distanceKm', unit: 'm', def: 30, min: 0 },
      { key: 'ang', term: 'angleDeg', unit: 'deg', def: 38, min: 0, max: 89.9 },
      { key: 'eye', term: 'eyeHeight', unit: 'm', def: 1.6, min: 0 },
    ],
    formula: '{targetHeight} = {distanceKm} × tan {angleDeg} + {eyeHeight}',
    compute: v => {
      const rise = v.dist * Math.tan(v.ang * D2R);
      return [
        { term: 'targetHeight', unit: 'm', value: round(rise + v.eye, 2), digits: 2, primary: true },
        { term: 'riseLen', unit: 'm', value: round(rise, 2), digits: 2 },
        { term: 'hypotenuse', unit: 'm', value: round(Math.hypot(v.dist, rise), 2), digits: 2 },
      ];
    },
    ko: { title: '올려본각으로 높이 재기', desc: '거리와 올려본각으로 건물이나 나무의 높이를 구합니다.',
      long: '밑변이 거리, 각이 올려본각인 직각삼각형에서 높이는 거리 × tan(각)입니다. 눈높이에서 재므로 마지막에 눈높이를 더해야 실제 높이가 됩니다. 스마트폰 경사계만 있으면 사다리 없이 나무 높이를 잽니다.',
      note: '각이 90°에 가까워지면 tan이 폭발해 작은 측정 오차가 큰 오차로 번집니다. 대상에서 충분히 떨어져 각을 30~45°로 만드는 것이 정확합니다.' },
    en: { title: 'Height from an Angle of Elevation', desc: 'Find a building or tree height from distance and angle.',
      long: 'In a right triangle with the distance as the base, the rise is distance × tan(angle). You measure from eye level, so add your eye height at the end. A phone inclinometer is enough to measure a tree without a ladder.',
      note: 'Near 90° the tangent explodes and a small angle error becomes a large height error. Stand far enough back to keep the angle between 30° and 45°.' },
  },
  {
    slug: 'distance-3d',
    icon: '🧭',
    category: '삼각비·각',
    fields: [
      { key: 'x1', term: 'x1', def: 0 }, { key: 'y1', term: 'y1', def: 0 }, { key: 'z1', term: 'z1', def: 0 },
      { key: 'x2', term: 'x2', def: 6 }, { key: 'y2', term: 'y2', def: 8 }, { key: 'z2', term: 'z2', def: 10 },
    ],
    formula: '{distance} = √(({x2} − {x1}) ² + ({y2} − {y1}) ² + ({z2} − {z1}) ²)',
    compute: v => {
      const dx = v.x2 - v.x1, dy = v.y2 - v.y1, dz = v.z2 - v.z1;
      return [
        { term: 'distance', unit: 'none', value: round(Math.sqrt(dx * dx + dy * dy + dz * dz), 4), digits: 4, primary: true },
        { term: 'result', unit: 'none', value: round(Math.hypot(dx, dy), 4), digits: 4 },
        { term: 'diff', unit: 'none', value: round(Math.abs(dz), 4), digits: 4 },
      ];
    },
    ko: { title: '3차원 두 점 거리 계산기', desc: '공간에 놓인 두 점 사이의 직선 거리를 구합니다.',
      long: '평면에서 쓰던 피타고라스에 z축 차이의 제곱을 하나 더 더하면 됩니다. 세 축의 차이를 각각 제곱해 더한 뒤 제곱근을 취합니다. 차원을 늘려도 형태가 그대로인 것이 이 정리의 힘입니다.',
      note: '수평 거리와 높이 차이를 함께 보여 줍니다. 배관이나 케이블 길이를 잡을 때는 여유분을 더해야 합니다.' },
    en: { title: '3D Distance Between Two Points', desc: 'The straight-line distance between two points in space.',
      long: 'Take the planar Pythagoras and add one more squared term for the z difference. Square each axis difference, add, take the root. That the form survives the extra dimension is the power of the theorem.',
      note: 'The horizontal run and vertical rise are shown alongside. For pipe or cable runs, add slack on top.' },
  },
  {
    slug: 'vector-angle',
    icon: '➡️',
    category: '삼각비·각',
    fields: [
      { key: 'ax', term: 'vecAx', def: 3 }, { key: 'ay', term: 'vecAy', def: 4 },
      { key: 'bx', term: 'vecBx', def: -1 }, { key: 'by', term: 'vecBy', def: 5 },
    ],
    formula: '{angleDeg} = acos(({vecAx} × {vecBx} + {vecAy} × {vecBy}) ÷ (|A| × |B|))',
    compute: v => {
      const dot = v.ax * v.bx + v.ay * v.by;
      const la = Math.hypot(v.ax, v.ay), lb = Math.hypot(v.bx, v.by);
      const cos = Math.min(1, Math.max(-1, ratio(dot, la * lb)));
      return [
        { term: 'angleDeg', unit: 'deg', value: round(Math.acos(cos) * R2D, 3), digits: 3, primary: true },
        { term: 'cosVal', unit: 'none', value: round(cos, 4), digits: 4 },
        { term: 'result', unit: 'none', value: round(dot, 3), digits: 3 },
      ];
    },
    verdict: (_v, out) => {
      const a = out[0].value;
      return Math.abs(a - 90) < 0.5
        ? { ko: '두 벡터가 서로 수직입니다. 내적이 0이면 항상 90°입니다.', en: 'The vectors are perpendicular — a zero dot product always means 90°.', l10n: { es: 'Los vectores son perpendiculares: un producto escalar nulo siempre significa 90°.', 'pt-br': 'Os vetores são perpendiculares: produto escalar nulo sempre significa 90°.', ja: '二つのベクトルは互いに垂直です。内積が0なら必ず90°になります。', de: 'Die Vektoren stehen senkrecht — ein Skalarprodukt von null bedeutet immer 90°.', fr: 'Les vecteurs sont perpendiculaires : un produit scalaire nul veut toujours dire 90°.', hi: 'दोनों सदिश एक-दूसरे पर लंब हैं — अदिश गुणनफल शून्य हो तो कोण हमेशा 90° होता है।' }, tone: 'good' }
        : a < 90
          ? { ko: `${a}°로 같은 쪽을 향합니다.`, en: `At ${a}° they point broadly the same way.`, l10n: { es: `Con ${a}° apuntan grosso modo en la misma dirección.`, 'pt-br': `Com ${a}° eles apontam grosso modo na mesma direção.`, ja: `${a}°で、おおむね同じ向きを指しています。`, de: `Bei ${a}° zeigen sie grob in dieselbe Richtung.`, fr: `À ${a}°, ils pointent globalement dans le même sens.`, hi: `${a}° पर दोनों मोटे तौर पर एक ही ओर इशारा करते हैं।` }, tone: 'good' }
          : { ko: `${a}°로 반대쪽을 향합니다.`, en: `At ${a}° they point broadly opposite ways.`, l10n: { es: `Con ${a}° apuntan grosso modo en direcciones opuestas.`, 'pt-br': `Com ${a}° eles apontam grosso modo em direções opostas.`, ja: `${a}°で、おおむね反対の向きを指しています。`, de: `Bei ${a}° zeigen sie grob in entgegengesetzte Richtungen.`, fr: `À ${a}°, ils pointent globalement en sens opposés.`, hi: `${a}° पर दोनों मोटे तौर पर उलटी दिशाओं में इशारा करते हैं।` }, tone: 'good' };
    },
    ko: { title: '두 벡터 사이 각 계산기', desc: '내적으로 두 방향이 이루는 각을 구합니다.',
      long: '내적을 두 크기의 곱으로 나누면 코사인이 나오고, 역코사인을 취하면 각입니다. 내적이 0이면 수직, 양수면 같은 쪽, 음수면 반대쪽을 향한다는 것을 바로 알 수 있습니다.',
      note: '벡터 하나가 0이면 각이 정의되지 않습니다. 이 계산기는 그 경우 0으로 처리합니다.' },
    en: { title: 'Angle Between Two Vectors', desc: 'Use the dot product to find the angle between two directions.',
      long: 'Divide the dot product by the product of the magnitudes to get the cosine, then take the inverse cosine. A zero dot product means perpendicular; positive means broadly aligned; negative means broadly opposed.',
      note: 'The angle is undefined if either vector is zero. This calculator returns zero in that case.' },
  },
  {
    slug: 'bearing',
    icon: '🗺️',
    category: '삼각비·각',
    fields: [
      { key: 'x1', term: 'x1', def: 0 }, { key: 'y1', term: 'y1', def: 0 },
      { key: 'x2', term: 'x2', def: 40 }, { key: 'y2', term: 'y2', def: 70 },
    ],
    formula: '{bearingDeg} = atan2({x2} − {x1}, {y2} − {y1})',
    compute: v => {
      const dx = v.x2 - v.x1, dy = v.y2 - v.y1;
      let deg = Math.atan2(dx, dy) * R2D;
      if (deg < 0) deg += 360;
      return [
        { term: 'bearingDeg', unit: 'deg', value: round(deg, 2), digits: 2, primary: true },
        { term: 'distance', unit: 'none', value: round(Math.hypot(dx, dy), 3), digits: 3 },
        { term: 'angleDeg', unit: 'deg', value: round((deg + 180) % 360, 2), digits: 2 },
      ];
    },
    verdict: (_v, out) => {
      const d = out[0].value;
      // 방위 이름은 여덟 언어분을 한 줄씩 묶어 둔다 — 8×8이라 표로 두는 편이 읽힌다
      const dirs = [
        { ko: '북', en: 'north', es: 'al norte', 'pt-br': 'ao norte', ja: '北', de: 'nach Norden', fr: 'vers le nord', hi: 'उत्तर' },
        { ko: '북동', en: 'north-east', es: 'al noreste', 'pt-br': 'a nordeste', ja: '北東', de: 'nach Nordosten', fr: 'vers le nord-est', hi: 'उत्तर-पूर्व' },
        { ko: '동', en: 'east', es: 'al este', 'pt-br': 'a leste', ja: '東', de: 'nach Osten', fr: 'vers l’est', hi: 'पूर्व' },
        { ko: '남동', en: 'south-east', es: 'al sureste', 'pt-br': 'a sudeste', ja: '南東', de: 'nach Südosten', fr: 'vers le sud-est', hi: 'दक्षिण-पूर्व' },
        { ko: '남', en: 'south', es: 'al sur', 'pt-br': 'ao sul', ja: '南', de: 'nach Süden', fr: 'vers le sud', hi: 'दक्षिण' },
        { ko: '남서', en: 'south-west', es: 'al suroeste', 'pt-br': 'a sudoeste', ja: '南西', de: 'nach Südwesten', fr: 'vers le sud-ouest', hi: 'दक्षिण-पश्चिम' },
        { ko: '서', en: 'west', es: 'al oeste', 'pt-br': 'a oeste', ja: '西', de: 'nach Westen', fr: 'vers l’ouest', hi: 'पश्चिम' },
        { ko: '북서', en: 'north-west', es: 'al noroeste', 'pt-br': 'a noroeste', ja: '北西', de: 'nach Nordwesten', fr: 'vers le nord-ouest', hi: 'उत्तर-पश्चिम' },
      ];
      const i = Math.round(d / 45) % 8;
      return {
        ko: `방위각 ${d}°는 ${dirs[i].ko}쪽입니다. 돌아오는 방향은 ${out[2].value}°입니다.`,
        en: `A bearing of ${d}° points ${dirs[i].en}; the return bearing is ${out[2].value}°.`,
        l10n: { es: `Un rumbo de ${d}° apunta ${dirs[i].es}; el rumbo de vuelta es ${out[2].value}°.`, 'pt-br': `Um azimute de ${d}° aponta ${dirs[i]['pt-br']}; o azimute de volta é ${out[2].value}°.`, ja: `方位角${d}°は${dirs[i].ja}の方角です。戻る向きは${out[2].value}°になります。`, de: `Eine Peilung von ${d}° zeigt ${dirs[i].de}; die Gegenpeilung beträgt ${out[2].value}°.`, fr: `Un azimut de ${d}° pointe ${dirs[i].fr} ; l’azimut de retour est ${out[2].value}°.`, hi: `${d}° का दिक्मान ${dirs[i].hi} की ओर है; लौटने का दिक्मान ${out[2].value}° होगा।` },
        tone: 'good',
      };
    },
    ko: { title: '방위각 계산기', desc: '두 좌표로 북쪽 기준 방위각과 거리를 구합니다.',
      long: '방위각은 북쪽을 0°로 놓고 시계 방향으로 재는 각입니다. atan2를 쓰면 사분면을 따로 따지지 않아도 0~360° 값이 한 번에 나옵니다. 반대 방향인 역방위각도 함께 보여 줍니다.',
      note: '여기서 y는 북쪽, x는 동쪽입니다. 위도·경도로 계산할 때는 지구가 둥글어 다른 공식(대권항로)을 써야 합니다.' },
    en: { title: 'Bearing Between Two Points', desc: 'Bearing from north and distance from two coordinates.',
      long: 'A bearing is measured clockwise from north as zero. Using atan2 returns a value in 0–360° without case-checking quadrants. The reciprocal bearing for the return trip is shown too.',
      note: 'Here y is north and x is east. For latitude and longitude the Earth’s curvature requires the great-circle formula instead.' },
  },
  {
    slug: 'inverse-trig',
    icon: '🔄',
    category: '삼각비·각',
    fields: [{ key: 'r', term: 'ratioVal', def: 0.6, min: -1, max: 1 }],
    formula: '{angleDeg} = asin({ratioVal})',
    compute: v => [
      { term: 'angleDeg', unit: 'deg', value: round(Math.asin(v.r) * R2D, 3), digits: 3, primary: true },
      { term: 'cosVal', unit: 'deg', value: round(Math.acos(v.r) * R2D, 3), digits: 3 },
      { term: 'tanVal', unit: 'deg', value: round(Math.atan(v.r) * R2D, 3), digits: 3 },
      { term: 'angleRad', unit: 'none', value: round(Math.asin(v.r), 4), digits: 4 },
    ],
    ko: { title: '역삼각함수 계산기 (비율 → 각)', desc: '삼각비 값에서 각도를 되짚어 구합니다.',
      long: '변의 비를 알 때 각을 구하는 계산입니다. 같은 값 0.6에 대해 asin은 36.87°, acos는 53.13°, atan은 30.96°로 서로 다른 각이 나오므로 어느 비인지 먼저 정해야 합니다.',
      note: 'asin과 acos는 −1에서 1 사이만 받습니다. tan은 모든 실수를 받지만 90°에는 도달하지 않습니다.' },
    en: { title: 'Inverse Trig (Ratio to Angle)', desc: 'Work back from a trigonometric ratio to the angle.',
      long: 'This is the calculation for when you know a side ratio and want the angle. For the same 0.6, asin gives 36.87°, acos 53.13° and atan 30.96° — so decide which ratio you have first.',
      note: 'asin and acos only accept values from −1 to 1. atan takes any real number but never quite reaches 90°.' },
  },
  {
    slug: 'ladder-angle',
    icon: '🪜',
    category: '삼각비·각',
    fields: [
      { key: 'len', term: 'ladderLen', unit: 'm', def: 4, min: 0.1 },
      { key: 'foot', term: 'footDist', unit: 'm', def: 1, min: 0 },
    ],
    formula: '{angleDeg} = acos({footDist} ÷ {ladderLen})',
    compute: v => {
      const cos = Math.min(1, ratio(v.foot, v.len));
      const ang = Math.acos(cos) * R2D;
      return [
        { term: 'angleDeg', unit: 'deg', value: round(ang, 2), digits: 2, primary: true },
        { term: 'wallHeight', unit: 'm', value: round(Math.sqrt(Math.max(0, v.len ** 2 - v.foot ** 2)), 3), digits: 3 },
        { term: 'footDist', unit: 'm', value: round(v.len / 4, 3), digits: 3 },
      ];
    },
    verdict: (_v, out) => {
      const a = out[0].value;
      return a >= 70 && a <= 80
        ? { ko: `${a}°는 권장 범위(70~80°) 안입니다. 벽에서 사다리 길이의 4분의 1만큼 띄우면 약 75.5°가 됩니다.`, en: `${a}° is inside the recommended 70–80°. Standing the foot a quarter of the length out gives about 75.5°.`, l10n: { es: `${a}° está dentro de los 70–80° recomendados. Separar el pie una cuarta parte de la longitud deja unos 75,5°.`, 'pt-br': `${a}° está dentro dos 70–80° recomendados. Afastar o pé um quarto do comprimento dá cerca de 75,5°.`, ja: `${a}°は推奨範囲(70〜80°)の内側です。足元を長さの四分の一だけ壁から離すと約75.5°になります。`, de: `${a}° liegen im empfohlenen Bereich von 70–80°. Den Fuß ein Viertel der Länge herauszustellen ergibt rund 75,5°.`, fr: `${a}° est dans la plage recommandée de 70 à 80°. Écarter le pied d’un quart de la longueur donne environ 75,5°.`, hi: `${a}° सुझाए गए दायरे (70–80°) के भीतर है। पैर को सीढ़ी की लंबाई के चौथाई जितना बाहर रखने पर यह लगभग 75.5° बैठता है।` }, tone: 'good' }
        : a > 80
          ? { ko: `${a}°는 너무 섭니다. 뒤로 넘어질 위험이 있으니 발을 더 띄우세요.`, en: `${a}° is too steep — the ladder can topple backwards. Move the foot out.`, l10n: { es: `${a}° es demasiado vertical: la escalera puede volcar hacia atrás. Separa más el pie.`, 'pt-br': `${a}° é vertical demais: a escada pode tombar para trás. Afaste mais o pé.`, ja: `${a}°は立ちすぎです。後ろに倒れる危険があるので、足元をもっと離してください。`, de: `${a}° ist zu steil — die Leiter kann nach hinten kippen. Stell den Fuß weiter heraus.`, fr: `${a}°, c’est trop droit : l’échelle peut basculer en arrière. Écarte davantage le pied.`, hi: `${a}° बहुत सीधा है — सीढ़ी पीछे की ओर गिर सकती है। पैर को और बाहर करें।` }, tone: 'bad' }
          : { ko: `${a}°는 너무 눕습니다. 발이 미끄러질 위험이 있으니 벽에 더 붙이세요.`, en: `${a}° is too shallow — the foot can slide out. Bring it closer to the wall.`, l10n: { es: `${a}° es demasiado tumbado: el pie puede resbalar. Acércalo más a la pared.`, 'pt-br': `${a}° é deitado demais: o pé pode escorregar. Aproxime-o mais da parede.`, ja: `${a}°は寝すぎです。足元が滑る危険があるので、もっと壁に寄せてください。`, de: `${a}° ist zu flach — der Fuß kann wegrutschen. Rück ihn näher an die Wand.`, fr: `${a}°, c’est trop couché : le pied peut glisser. Rapproche-le du mur.`, hi: `${a}° बहुत लेटा हुआ है — पैर फिसल सकता है। इसे दीवार के और पास लाएँ।` }, tone: 'bad' };
    },
    ko: { title: '사다리 안전 각도 계산기', desc: '사다리 길이와 벽에서 띄운 거리로 기대는 각도를 구합니다.',
      long: '기대는 각도는 벽에서 띄운 거리를 사다리 길이로 나눈 값의 역코사인입니다. 안전 기준은 70~80°이고, 발을 사다리 길이의 4분의 1만큼 띄우면 약 75.5°가 나옵니다.',
      note: '닿는 높이도 함께 보여 줍니다. 실제로 올라갈 수 있는 높이는 위쪽 세 칸을 뺀 값으로 봐야 합니다.' },
    en: { title: 'Ladder Safe Angle', desc: 'The lean angle from ladder length and distance from the wall.',
      long: 'The lean angle is the inverse cosine of the base distance over the ladder length. The safe band is 70–80°, and setting the foot out a quarter of the length lands near 75.5°.',
      note: 'The height reached is shown too. Treat the usable height as three rungs less than that.' },
  },
  {
    slug: 'polar-to-cartesian',
    icon: '🎯',
    category: '삼각비·각',
    fields: [
      { key: 'r', term: 'polarR', def: 10, min: 0 },
      { key: 'th', term: 'polarTheta', unit: 'deg', def: 35, min: -360, max: 360 },
    ],
    formula: '{cartX} = {polarR} × cos {polarTheta}, {cartY} = {polarR} × sin {polarTheta}',
    compute: v => [
      { term: 'cartX', unit: 'none', value: round(v.r * Math.cos(v.th * D2R), 4), digits: 4, primary: true },
      { term: 'cartY', unit: 'none', value: round(v.r * Math.sin(v.th * D2R), 4), digits: 4 },
      { term: 'angleRad', unit: 'none', value: round(v.th * D2R, 4), digits: 4 },
    ],
    ko: { title: '극좌표 → 직교좌표 변환기', desc: '반지름과 각으로 x, y 좌표를 구합니다.',
      long: '극좌표는 "얼마나 멀리, 어느 방향"으로 위치를 나타냅니다. x는 반지름 × cos(각), y는 반지름 × sin(각)입니다. 원 위의 점을 찍거나 로봇 팔 위치를 잡을 때 쓰입니다.',
      note: '각의 기준은 x축 양의 방향이고 반시계 방향이 양수입니다. 나침반 방위각과는 기준과 방향이 모두 다릅니다.' },
    en: { title: 'Polar to Cartesian Coordinates', desc: 'Turn a radius and angle into x and y.',
      long: 'Polar coordinates say “how far, which way”. x is radius × cos(angle) and y is radius × sin(angle). It is how you plot points on a circle or position a robot arm.',
      note: 'The angle is measured from the positive x-axis, counter-clockwise positive. Compass bearings use a different origin and direction.' },
  },
  {
    slug: 'triangle-area-coords',
    icon: '📌',
    category: '삼각비·각',
    fields: [
      { key: 'x1', term: 'x1', def: 1 }, { key: 'y1', term: 'y1', def: 1 },
      { key: 'x2', term: 'x2', def: 7 }, { key: 'y2', term: 'y2', def: 2 },
      { key: 'x3', term: 'x3', def: 4 }, { key: 'y3', term: 'y3', def: 8 },
    ],
    formula: '{area} = |{x1} × ({y2} − {y3}) + {x2} × ({y3} − {y1}) + {x3} × ({y1} − {y2})| ÷ 2',
    compute: v => {
      const area = Math.abs(v.x1 * (v.y2 - v.y3) + v.x2 * (v.y3 - v.y1) + v.x3 * (v.y1 - v.y2)) / 2;
      const a = Math.hypot(v.x2 - v.x1, v.y2 - v.y1);
      const b = Math.hypot(v.x3 - v.x2, v.y3 - v.y2);
      const c = Math.hypot(v.x1 - v.x3, v.y1 - v.y3);
      return [
        { term: 'area', unit: 'none', value: round(area, 4), digits: 4, primary: true },
        { term: 'perimeter', unit: 'none', value: round(a + b + c, 4), digits: 4 },
        { term: 'inradius', unit: 'none', value: round(ratio(area, (a + b + c) / 2), 4), digits: 4 },
      ];
    },
    ko: { title: '좌표로 삼각형 면적 (신발끈 공식)', desc: '세 꼭짓점 좌표만으로 면적을 구합니다.',
      long: '변의 길이를 구하지 않고 좌표를 엇갈려 곱해 더하는 방식이라 신발끈 공식이라 부릅니다. 절댓값을 씌우므로 점을 어느 순서로 넣어도 같은 값이 나옵니다.',
      note: '세 점이 한 직선에 있으면 면적이 0이 됩니다. 세 점이 정말 삼각형을 이루는지 확인하는 데도 쓸 수 있습니다.' },
    en: { title: 'Triangle Area from Coordinates (Shoelace)', desc: 'Area from three vertex coordinates alone.',
      long: 'Instead of finding side lengths you cross-multiply the coordinates and add — hence “shoelace”. The absolute value means the order of the points does not matter.',
      note: 'Collinear points give an area of zero, which makes this a quick test of whether three points really form a triangle.' },
  },
];
