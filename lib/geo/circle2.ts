/**
 * 도형 - 원·호 둘째 묶음 (6종)
 *
 * 원을 자르고 이어 붙이는 계산들. 부채꼴 둘레, 현으로 재는 활 높이, 벨트 길이,
 * 파이프 단면과 유량처럼 현장에서 자를 대는 순서대로 골랐다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

const PI = Math.PI;
const D2R = PI / 180;

export const CIRCLE2_TOOLS: FormulaTool[] = [
  {
    slug: 'sector-perimeter',
    icon: '🍕',
    category: '원·호',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 10, min: 0 },
      { key: 'ang', term: 'angleDeg', unit: 'deg', def: 72, min: 0, max: 360 },
    ],
    formula: '{sectorPerimeter} = {radius} × 2 + 2 × π × {radius} × {angleDeg} ÷ 360',
    compute: v => {
      const arc = 2 * PI * v.r * (v.ang / 360);
      return [
        { term: 'sectorPerimeter', unit: 'cm', value: round(v.r * 2 + arc, 3), digits: 3, primary: true },
        { term: 'arcLen', unit: 'cm', value: round(arc, 3), digits: 3 },
        { term: 'area', unit: 'cm2', value: round(PI * v.r * v.r * (v.ang / 360), 3), digits: 3 },
      ];
    },
    ko: { title: '부채꼴 둘레 계산기', desc: '반지름과 중심각으로 부채꼴의 둘레와 면적을 구합니다.',
      long: '부채꼴 둘레는 곡선인 호 하나와 직선인 반지름 두 개를 더한 값입니다. 호만 재고 반지름을 빼먹는 실수가 흔한데, 천을 재단하거나 테두리를 두를 때는 반지름 두 변도 마감해야 합니다.',
      note: '중심각이 360°면 둘레에 반지름 두 개가 남습니다. 완전한 원을 원하면 원주 공식을 쓰세요.' },
    en: { title: 'Sector Perimeter', desc: 'Perimeter and area of a sector from radius and central angle.',
      long: 'A sector’s perimeter is one curved arc plus two straight radii. Forgetting the radii is a common slip — when cutting fabric or trimming an edge, those two straight sides need finishing too.',
      note: 'At 360° the formula still adds two radii. Use the plain circumference formula for a full circle.' },
    zh: { title: '扇形周长计算器', desc: '由半径和圆心角求出扇形的周长与面积。',
      long: '扇形周长是一段弧加两条半径。常见的失误是只算弧、忘了半径——裁布或收边时，这两条直边同样需要处理。',
      note: '圆心角为360°时公式仍会加上两条半径。要整圆请使用圆周公式。' },
  },
  {
    slug: 'segment-from-chord',
    icon: '🌙',
    category: '원·호',
    fields: [
      { key: 'r', term: 'radius', unit: 'cm', def: 20, min: 0.01 },
      { key: 'c', term: 'chordLen', unit: 'cm', def: 24, min: 0 },
    ],
    formula: '{angleDeg} = 2 × asin({chordLen} ÷ (2 × {radius}))',
    compute: v => {
      const half = Math.min(1, ratio(v.c, 2 * v.r));
      const ang = 2 * Math.asin(half);
      const area = v.r * v.r / 2 * (ang - Math.sin(ang));
      return [
        { term: 'area', unit: 'cm2', value: round(area, 3), digits: 3, primary: true },
        { term: 'angleDeg', unit: 'deg', value: round(ang * 180 / PI, 2), digits: 2 },
        { term: 'sagitta', unit: 'cm', value: round(v.r - Math.sqrt(Math.max(0, v.r * v.r - (v.c / 2) ** 2)), 3), digits: 3 },
        { term: 'arcLen', unit: 'cm', value: round(v.r * ang, 3), digits: 3 },
      ];
    },
    ko: { title: '현으로 활꼴 면적 구하기', desc: '반지름과 현 길이로 활꼴의 면적과 중심각을 구합니다.',
      long: '현의 절반을 반지름으로 나누면 반각의 사인이 되므로 중심각이 나옵니다. 활꼴 면적은 부채꼴에서 삼각형을 뺀 값이라 r²÷2 × (각 − sin각)이 됩니다. 각은 라디안으로 넣어야 합니다.',
      note: '현이 지름보다 길 수는 없습니다. 그런 값을 넣으면 중심각이 180°로 눌립니다.' },
    en: { title: 'Circular Segment from a Chord', desc: 'Segment area and central angle from radius and chord.',
      long: 'Half the chord over the radius is the sine of the half-angle, which gives the central angle. The segment is the sector minus the triangle, so the area is r²/2 × (angle − sin angle), with the angle in radians.',
      note: 'A chord cannot exceed the diameter. Enter one that does and the angle saturates at 180°.' },
    zh: { title: '由弦求弓形面积', desc: '用半径和弦长求出弓形面积与圆心角。',
      long: '半弦除以半径即为半角的正弦，由此得到圆心角。弓形面积等于扇形减去三角形，即r²/2 ×(角 − sin角)，其中角需用弧度。',
      note: '弦不可能长于直径。若填入超过直径的值，圆心角会被压到180°。' },
  },
  {
    slug: 'sagitta',
    icon: '🏹',
    category: '원·호',
    fields: [
      { key: 'c', term: 'chordLen', unit: 'cm', def: 100, min: 0 },
      { key: 'h', term: 'sagitta', unit: 'cm', def: 8, min: 0.01 },
    ],
    formula: '{radius} = ({chordLen} ² ÷ 4 + {sagitta} ²) ÷ (2 × {sagitta})',
    compute: v => {
      const r = ratio(v.c * v.c / 4 + v.h * v.h, 2 * v.h);
      const ang = 2 * Math.asin(Math.min(1, ratio(v.c, 2 * r)));
      return [
        { term: 'radius', unit: 'cm', value: round(r, 3), digits: 3, primary: true },
        { term: 'diameter', unit: 'cm', value: round(r * 2, 3), digits: 3 },
        { term: 'angleDeg', unit: 'deg', value: round(ang * 180 / PI, 2), digits: 2 },
        { term: 'arcLen', unit: 'cm', value: round(r * ang, 3), digits: 3 },
      ];
    },
    ko: { title: '활 높이로 반지름 되짚기', desc: '현 길이와 활 높이만 재서 원래 원의 반지름을 구합니다.',
      long: '큰 원의 일부만 남았을 때 중심을 찾지 않고도 반지름을 알아내는 방법입니다. 현 위에 자를 걸치고 가장 부풀어 오른 곳까지의 높이를 재면 됩니다. 깨진 접시나 아치의 곡률을 복원할 때 씁니다.',
      note: '활 높이가 아주 작으면 반지름이 급격히 커지고 측정 오차도 그만큼 증폭됩니다. 현을 길게 잡으면 정확해집니다.' },
    en: { title: 'Radius from Chord and Sagitta', desc: 'Recover a circle’s radius from a chord and its bulge height.',
      long: 'This finds the radius of a large circle from a fragment, without locating the centre. Lay a straight edge across the chord and measure the height at the fullest point. It is how you recover the curvature of a broken plate or an arch.',
      note: 'A very small sagitta makes the radius blow up and amplifies measurement error with it. Use a longer chord for accuracy.' },
    zh: { title: '由弦与弓高反推半径', desc: '只量弦长与弓高即可求出原圆的半径。',
      long: '这是在只剩一段圆弧时、不必找圆心也能求半径的方法。把直尺横搭在弦上，量出最鼓处的高度即可。用于复原破碎盘子或拱券的曲率。',
      note: '弓高很小时半径会急剧变大，测量误差也随之放大。弦取得越长越准确。' },
  },
  {
    slug: 'belt-length',
    icon: '⚙️',
    category: '원·호',
    fields: [
      { key: 'd1', term: 'pulleyA', unit: 'cm', def: 20, min: 0 },
      { key: 'd2', term: 'pulleyB', unit: 'cm', def: 8, min: 0 },
      { key: 'c', term: 'centerDist', unit: 'cm', def: 40, min: 0.01 },
    ],
    formula: '{beltLen} = 2 × {centerDist} + π ÷ 2 × ({pulleyA} + {pulleyB}) + ({pulleyA} − {pulleyB}) ² ÷ (4 × {centerDist})',
    compute: v => {
      const len = 2 * v.c + PI / 2 * (v.d1 + v.d2) + (v.d1 - v.d2) ** 2 / (4 * v.c);
      return [
        { term: 'beltLen', unit: 'cm', value: round(len, 2), digits: 2, primary: true },
        { term: 'gearRatio', unit: 'times', value: round(ratio(v.d1, v.d2), 3), digits: 3 },
        { term: 'centerDist', unit: 'cm', value: round(v.c, 2), digits: 2 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `벨트 길이는 약 ${out[0].value}이고 감속비는 ${out[1].value}:1입니다. 큰 풀리가 한 바퀴 돌 때 작은 풀리는 ${out[1].value}바퀴 돕니다.`,
      en: `About ${out[0].value} of belt, with a ${out[1].value}:1 ratio — the small pulley turns ${out[1].value} times for each turn of the large one.`,
      zh: `皮带长约${out[0].value}，传动比为${out[1].value}:1；大轮转一圈时小轮转${out[1].value}圈。`,
      tone: 'good',
    }),
    ko: { title: '벨트 길이 계산기 (두 풀리)', desc: '두 풀리의 지름과 축간 거리로 벨트 길이를 구합니다.',
      long: '벨트는 두 풀리를 감고 그 사이를 직선으로 잇습니다. 직선 두 개와 두 풀리에 감기는 호를 더한 근사식이 널리 쓰이고, 지름 차이가 클 때의 보정항까지 넣었습니다.',
      note: '장력 조정 여유가 필요하므로 실제 벨트는 계산값보다 조금 짧은 규격을 고릅니다. 규격 벨트는 정해진 길이만 나옵니다.' },
    en: { title: 'Belt Length Between Two Pulleys', desc: 'Belt length from two pulley diameters and the centre distance.',
      long: 'The belt wraps both pulleys and runs straight between them. The widely used approximation adds the two straight runs to the wrapped arcs, plus a correction term for when the diameters differ a lot.',
      note: 'Real belts are chosen slightly shorter to leave tensioning travel, and only come in standard lengths.' },
    zh: { title: '两轮皮带长度计算器', desc: '由两个轮的直径与轴间距求出皮带长度。',
      long: '皮带绕过两个轮并在其间走直线。常用的近似式把两段直线与包在轮上的弧相加，并加入直径差较大时的修正项。',
      note: '需要留张紧行程，实际选型会比计算值略短，且成品皮带只有标准长度。' },
  },
  {
    slug: 'pipe-flow',
    icon: '🚰',
    category: '원·호',
    fields: [
      { key: 'd', term: 'pipeDia', unit: 'cm', def: 5, min: 0 },
      { key: 'v', term: 'flowSpeed', def: 1.5, min: 0 },
    ],
    formula: '{flowRate} = π × ({pipeDia} ÷ 200) ² × {flowSpeed} × 60000',
    compute: v => {
      const areaM2 = PI * Math.pow(v.d / 200, 2);
      const lpm = areaM2 * v.v * 60000;
      return [
        { term: 'flowRate', unit: 'lpm', value: round(lpm, 1), digits: 1, primary: true },
        { term: 'area', unit: 'cm2', value: round(PI * Math.pow(v.d / 2, 2), 2), digits: 2 },
        { term: 'liters', unit: 'liter', value: round(lpm * 60, 0), digits: 0 },
      ];
    },
    ko: { title: '파이프 유량 계산기', desc: '안지름과 유속으로 분당 흐르는 물의 양을 구합니다.',
      long: '단면적에 유속을 곱하면 부피 유량입니다. 지름이 두 배가 되면 단면적은 네 배가 되므로 유량도 네 배가 됩니다. 지름을 조금 키우는 것이 압력을 올리는 것보다 효과가 큰 이유입니다.',
      note: '안지름을 넣어야 합니다. 파이프 규격은 보통 바깥지름이나 호칭 지름으로 표기되니 두께를 빼고 계산하세요.' },
    en: { title: 'Pipe Flow Rate', desc: 'Litres per minute from bore diameter and flow speed.',
      long: 'Cross-sectional area times speed is the volumetric flow. Double the diameter and the area quadruples, so the flow quadruples too — which is why widening a pipe beats raising the pressure.',
      note: 'Use the internal bore. Pipe is usually specified by outside or nominal diameter, so subtract the wall thickness.' },
    zh: { title: '管道流量计算器', desc: '由内径与流速求出每分钟通过的水量。',
      long: '截面积乘流速即为体积流量。直径加倍时截面积变为四倍，流量也变为四倍——这就是加大管径比提高压力更有效的原因。',
      note: '要填内径。管材通常按外径或公称直径标注，需扣除壁厚后计算。' },
  },
  {
    slug: 'circles-in-circle',
    icon: '🎯',
    category: '원·호',
    fields: [
      { key: 'big', term: 'diameter', unit: 'cm', def: 30, min: 0 },
      { key: 'small', term: 'smallDia', unit: 'cm', def: 6, min: 0.01 },
    ],
    formula: '{fitCount} = 0.9069 × ({diameter} ÷ {smallDia}) ²',
    compute: v => {
      // 원을 육각 배열로 채울 때의 충전율 0.9069를 면적비에 곱한 어림
      const est = 0.9069 * Math.pow(ratio(v.big, v.small), 2);
      return [
        { term: 'fitCount', unit: 'piece', value: Math.floor(est), digits: 0, primary: true },
        { term: 'areaRatio', unit: 'times', value: round(Math.pow(ratio(v.big, v.small), 2), 2), digits: 2 },
        { term: 'area', unit: 'cm2', value: round(PI * Math.pow(v.big / 2, 2), 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `약 ${out[0].value}개가 들어갑니다. 면적비로는 ${out[1].value}개지만 원 사이에 빈틈이 생겨 90.7%만 채워집니다.`,
      en: `About ${out[0].value} fit. The area ratio suggests ${out[1].value}, but gaps between circles leave only 90.7% usable.`,
      zh: `大约能放${out[0].value}个。按面积比是${out[1].value}个，但圆之间存在空隙，只能填满90.7%。`,
      tone: 'warn',
    }),
    ko: { title: '큰 원 안에 작은 원 몇 개', desc: '지름 비율로 원 안에 들어가는 작은 원 개수를 어림합니다.',
      long: '면적으로 나눈 값을 그대로 쓰면 실제보다 많이 나옵니다. 원을 아무리 잘 배열해도 사이에 빈틈이 남고, 무한히 넓은 평면에서도 육각 배열의 충전율이 90.69%로 한계입니다. 그 값을 곱한 어림입니다.',
      note: '개수가 적으면(열 개 이하) 오차가 큽니다. 테두리 효과가 커서 실제로는 이 값보다 적게 들어가는 경우가 많습니다.' },
    en: { title: 'How Many Small Circles Fit in a Big One', desc: 'Estimate the count from the diameter ratio.',
      long: 'Dividing areas straight across overcounts. However neatly you arrange circles, gaps remain: even on an infinite plane the best hexagonal packing reaches only 90.69%. This multiplies by that limit.',
      note: 'For small counts — under ten or so — the error is large. Edge effects usually mean fewer fit than this suggests.' },
    zh: { title: '大圆内能放几个小圆', desc: '按直径比估算大圆内可容纳的小圆数量。',
      long: '直接用面积相除会高估。无论如何排布，圆之间总有空隙：即便在无限大平面上，六方最密排布的填充率也只有90.69%。此处乘上了这一上限。',
      note: '数量较少（十个以内）时误差很大。边界效应会使实际数量往往低于估算值。' },
  },
];
