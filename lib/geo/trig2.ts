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
    zh: { title: '正弦定理计算器', desc: '由一条边和两个角求出其余的边与角。',
      long: '任意三角形中，边与其对角正弦之比恒定，且该比值等于外接圆直径。因此已知一边及其对角，整个三角形便确定，第三个角由内角和180°得出。',
      note: '已知两边及非夹角时可能出现两个解。本计算器采用一边两角，不存在这种歧义。' },
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
        ? { ko: `가장 큰 각이 ${round(max, 1)}°로 둔각삼각형입니다.`, en: `The largest angle is ${round(max, 1)}° — an obtuse triangle.`, zh: `最大角为${round(max, 1)}°，属钝角三角形。`, tone: 'good' }
        : max > 89.5
          ? { ko: `가장 큰 각이 ${round(max, 1)}°로 직각삼각형입니다.`, en: `The largest angle is ${round(max, 1)}° — a right triangle.`, zh: `最大角为${round(max, 1)}°，属直角三角形。`, tone: 'good' }
          : { ko: `모든 각이 90° 미만인 예각삼각형입니다.`, en: `Every angle is under 90° — an acute triangle.`, zh: `所有角都小于90°，属锐角三角形。`, tone: 'good' };
    },
    ko: { title: '세 변으로 세 각 구하기', desc: '변 길이만 재서 삼각형의 세 각을 모두 구합니다.',
      long: '코사인 법칙을 각에 대해 풀면 세 변만으로 각이 나옵니다. 각도기 없이 줄자만으로 각을 아는 방법이라 목공과 측량에서 씁니다. 세 각의 합이 180°인지 확인하면 검산이 됩니다.',
      note: '한 변이 나머지 두 변의 합보다 길면 삼각형이 만들어지지 않습니다. 그 경우 각이 0이나 180°로 눌립니다.' },
    en: { title: 'All Three Angles from Three Sides', desc: 'Measure only the sides and get every angle.',
      long: 'Solving the cosine rule for the angle gives all three from the sides alone. It is how you find angles with a tape measure and no protractor, which is why carpenters and surveyors use it. Check that the three add to 180°.',
      note: 'If one side exceeds the other two combined, no triangle exists and the angles collapse to 0 or 180°.' },
    zh: { title: '由三边求三角', desc: '只量边长即可求出三角形的三个内角。',
      long: '把余弦定理对角求解，仅用三边就能得出各角。这是没有量角器、只有卷尺时求角的方法，木工与测量常用。可用三角之和是否为180°来验算。',
      note: '若某边大于另两边之和则无法构成三角形，此时角会被压到0或180°。' },
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
    zh: { title: '用仰角测高度', desc: '由距离和仰角求出建筑或树木的高度。',
      long: '在以距离为底边的直角三角形中，高等于距离×tan(角)。测量是从视线高度进行的，所以最后要加上眼高。只要有手机测斜仪，不用梯子就能量树高。',
      note: '角接近90°时正切急剧变大，微小测角误差会放大成很大的高度误差。应站得足够远，把角保持在30°至45°。' },
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
    zh: { title: '三维两点距离计算器', desc: '求空间中两点之间的直线距离。',
      long: '在平面勾股定理上再加一项z差的平方即可：把三个轴向差各自平方相加，再开平方根。形式在升维后依然不变，正是该定理的力量。',
      note: '同时显示水平距离与高度差。计算管路或线缆长度时还需加上余量。' },
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
        ? { ko: '두 벡터가 서로 수직입니다. 내적이 0이면 항상 90°입니다.', en: 'The vectors are perpendicular — a zero dot product always means 90°.', zh: '两向量互相垂直；点积为0时必为90°。', tone: 'good' }
        : a < 90
          ? { ko: `${a}°로 같은 쪽을 향합니다.`, en: `At ${a}° they point broadly the same way.`, zh: `${a}°，两者大致同向。`, tone: 'good' }
          : { ko: `${a}°로 반대쪽을 향합니다.`, en: `At ${a}° they point broadly opposite ways.`, zh: `${a}°，两者大致反向。`, tone: 'good' };
    },
    ko: { title: '두 벡터 사이 각 계산기', desc: '내적으로 두 방향이 이루는 각을 구합니다.',
      long: '내적을 두 크기의 곱으로 나누면 코사인이 나오고, 역코사인을 취하면 각입니다. 내적이 0이면 수직, 양수면 같은 쪽, 음수면 반대쪽을 향한다는 것을 바로 알 수 있습니다.',
      note: '벡터 하나가 0이면 각이 정의되지 않습니다. 이 계산기는 그 경우 0으로 처리합니다.' },
    en: { title: 'Angle Between Two Vectors', desc: 'Use the dot product to find the angle between two directions.',
      long: 'Divide the dot product by the product of the magnitudes to get the cosine, then take the inverse cosine. A zero dot product means perpendicular; positive means broadly aligned; negative means broadly opposed.',
      note: 'The angle is undefined if either vector is zero. This calculator returns zero in that case.' },
    zh: { title: '两向量夹角计算器', desc: '用点积求两个方向之间的夹角。',
      long: '把点积除以两者模长之积得到余弦，再取反余弦即为夹角。点积为0表示垂直，为正表示大致同向，为负表示大致反向。',
      note: '若任一向量为零，夹角无定义，本计算器在该情况下返回0。' },
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
      const dirs = [
        { ko: '북', en: 'north', zh: '北' }, { ko: '북동', en: 'north-east', zh: '东北' },
        { ko: '동', en: 'east', zh: '东' }, { ko: '남동', en: 'south-east', zh: '东南' },
        { ko: '남', en: 'south', zh: '南' }, { ko: '남서', en: 'south-west', zh: '西南' },
        { ko: '서', en: 'west', zh: '西' }, { ko: '북서', en: 'north-west', zh: '西北' },
      ];
      const i = Math.round(d / 45) % 8;
      return {
        ko: `방위각 ${d}°는 ${dirs[i].ko}쪽입니다. 돌아오는 방향은 ${out[2].value}°입니다.`,
        en: `A bearing of ${d}° points ${dirs[i].en}; the return bearing is ${out[2].value}°.`,
        zh: `方位角${d}°指向${dirs[i].zh}方，返程方位角为${out[2].value}°。`,
        tone: 'good',
      };
    },
    ko: { title: '방위각 계산기', desc: '두 좌표로 북쪽 기준 방위각과 거리를 구합니다.',
      long: '방위각은 북쪽을 0°로 놓고 시계 방향으로 재는 각입니다. atan2를 쓰면 사분면을 따로 따지지 않아도 0~360° 값이 한 번에 나옵니다. 반대 방향인 역방위각도 함께 보여 줍니다.',
      note: '여기서 y는 북쪽, x는 동쪽입니다. 위도·경도로 계산할 때는 지구가 둥글어 다른 공식(대권항로)을 써야 합니다.' },
    en: { title: 'Bearing Between Two Points', desc: 'Bearing from north and distance from two coordinates.',
      long: 'A bearing is measured clockwise from north as zero. Using atan2 returns a value in 0–360° without case-checking quadrants. The reciprocal bearing for the return trip is shown too.',
      note: 'Here y is north and x is east. For latitude and longitude the Earth’s curvature requires the great-circle formula instead.' },
    zh: { title: '方位角计算器', desc: '由两个坐标求出以北为基准的方位角与距离。',
      long: '方位角以北为0°、按顺时针测量。使用atan2可直接得到0至360°的值，无需分象限讨论。同时给出返程用的反方位角。',
      note: '此处y为北、x为东。若用经纬度计算，地球是曲面，需改用大圆航线公式。' },
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
    zh: { title: '反三角函数计算器（比值求角）', desc: '由三角比值反推出角度。',
      long: '已知边长之比而要求角时使用。对同一个0.6，asin得36.87°，acos得53.13°，atan得30.96°，因此必须先确定这是哪一种比值。',
      note: 'asin与acos只接受−1到1之间的值；atan接受任意实数，但永远达不到90°。' },
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
        ? { ko: `${a}°는 권장 범위(70~80°) 안입니다. 벽에서 사다리 길이의 4분의 1만큼 띄우면 약 75.5°가 됩니다.`, en: `${a}° is inside the recommended 70–80°. Standing the foot a quarter of the length out gives about 75.5°.`, zh: `${a}°在建议范围70至80°内。将梯脚离墙约为梯长的四分之一时约为75.5°。`, tone: 'good' }
        : a > 80
          ? { ko: `${a}°는 너무 섭니다. 뒤로 넘어질 위험이 있으니 발을 더 띄우세요.`, en: `${a}° is too steep — the ladder can topple backwards. Move the foot out.`, zh: `${a}°过于陡直，有向后倾倒的风险，应把梯脚往外移。`, tone: 'bad' }
          : { ko: `${a}°는 너무 눕습니다. 발이 미끄러질 위험이 있으니 벽에 더 붙이세요.`, en: `${a}° is too shallow — the foot can slide out. Bring it closer to the wall.`, zh: `${a}°过于平缓，梯脚容易滑出，应更靠近墙面。`, tone: 'bad' };
    },
    ko: { title: '사다리 안전 각도 계산기', desc: '사다리 길이와 벽에서 띄운 거리로 기대는 각도를 구합니다.',
      long: '기대는 각도는 벽에서 띄운 거리를 사다리 길이로 나눈 값의 역코사인입니다. 안전 기준은 70~80°이고, 발을 사다리 길이의 4분의 1만큼 띄우면 약 75.5°가 나옵니다.',
      note: '닿는 높이도 함께 보여 줍니다. 실제로 올라갈 수 있는 높이는 위쪽 세 칸을 뺀 값으로 봐야 합니다.' },
    en: { title: 'Ladder Safe Angle', desc: 'The lean angle from ladder length and distance from the wall.',
      long: 'The lean angle is the inverse cosine of the base distance over the ladder length. The safe band is 70–80°, and setting the foot out a quarter of the length lands near 75.5°.',
      note: 'The height reached is shown too. Treat the usable height as three rungs less than that.' },
    zh: { title: '梯子安全角度计算器', desc: '由梯长与离墙距离求出倚靠角度。',
      long: '倚靠角度是离墙距离除以梯长后的反余弦。安全范围为70至80°，将梯脚外移约梯长的四分之一时约为75.5°。',
      note: '同时显示可搭到的高度。实际可攀爬高度应按扣除顶部三级来估算。' },
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
    zh: { title: '极坐标转直角坐标', desc: '由半径和角度求出x、y坐标。',
      long: '极坐标用“多远、朝哪个方向”表示位置。x等于半径×cos(角)，y等于半径×sin(角)。绘制圆上的点或定位机械臂时会用到。',
      note: '角度以x轴正方向为基准、逆时针为正。指南针方位角的基准与方向都不同。' },
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
    zh: { title: '由坐标求三角形面积（鞋带公式）', desc: '仅用三个顶点坐标求面积。',
      long: '不必先求边长，而是把坐标交叉相乘再相加，因此称为“鞋带公式”。因为取了绝对值，点的输入顺序不影响结果。',
      note: '三点共线时面积为0，因此也可用来检验三点是否真能构成三角形。' },
  },
];
