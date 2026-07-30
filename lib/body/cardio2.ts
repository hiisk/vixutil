/**
 * 몸 수치 - 심장·운동 둘째 묶음 (10종)
 *
 * 첫 묶음이 심박수와 페이스였으니 여기는 종목별 숫자 — 자전거 케이던스, 로잉
 * 스플릿, 훈련 볼륨, 기록 예측처럼 운동하는 사람이 실제로 세는 것들이다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const CARDIO2_TOOLS: FormulaTool[] = [
  {
    slug: 'karvonen-zone',
    icon: '❤️',
    category: '심장·운동',
    fields: [
      { key: 'age', term: 'ageYears', def: 35, min: 5, max: 100 },
      { key: 'rest', term: 'restHr', unit: 'bpm', def: 62, min: 30, max: 120 },
      { key: 'low', term: 'karvonenLow', unit: 'percent', def: 60, min: 30, max: 100 },
      { key: 'high', term: 'karvonenHigh', unit: 'percent', def: 75, min: 30, max: 100 },
    ],
    formula: '{karvonenLow} = ({maxHr} − {restHr}) × {percent} ÷ 100 + {restHr}',
    compute: v => {
      const max = 220 - v.age;
      const reserve = max - v.rest;
      return [
        { term: 'hrLow', unit: 'bpm', value: Math.round(reserve * (v.low / 100) + v.rest), digits: 0, primary: true },
        { term: 'hrHigh', unit: 'bpm', value: Math.round(reserve * (v.high / 100) + v.rest), digits: 0 },
        { term: 'maxHr', unit: 'bpm', value: Math.round(max), digits: 0 },
        { term: 'diff', unit: 'bpm', value: Math.round(reserve), digits: 0 },
      ];
    },
    ko: { title: '카보넨 목표 심박수 계산기', desc: '안정 시 심박수를 반영해 목표 심박 구간을 구합니다.',
      long: '최대 심박수에 비율만 곱하는 방식은 안정 시 심박이 사람마다 다른 것을 무시합니다. 카보넨 공식은 최대에서 안정을 뺀 여유 심박수에 비율을 곱하고 다시 안정을 더해, 체력이 좋은 사람과 그렇지 않은 사람의 구간을 다르게 잡습니다.',
      note: '안정 시 심박수는 아침에 눈뜨고 바로 재야 정확합니다. 낮에 앉아서 재면 실제보다 높게 나와 구간이 위로 밀립니다.' },
    en: { title: 'Karvonen Target Heart Rate', desc: 'A target zone that accounts for your resting heart rate.',
      long: 'Taking a percentage of maximum heart rate ignores how much resting rates differ between people. Karvonen works on heart-rate reserve — maximum minus resting — then adds resting back, so a fit body and an unfit one get different zones.',
      note: 'Measure resting rate the moment you wake. Taken sitting during the day it reads high and pushes the whole zone up.' },
    zh: { title: 'Karvonen目标心率', desc: '结合静息心率计算目标心率区间。',
      long: '只对最大心率取百分比，会忽略各人静息心率的差异。Karvonen公式作用于心率储备（最大减静息），再加回静息，因此体能好与不好的人得到的区间不同。',
      note: '静息心率应在晨起时立即测量。白天坐着测会偏高，导致整个区间上移。' },
  },
  {
    slug: 'heart-rate-recovery',
    icon: '📉',
    category: '심장·운동',
    fields: [
      { key: 'peak', term: 'peakHr', unit: 'bpm', def: 168, min: 60, max: 230 },
      { key: 'after', term: 'hr1min', unit: 'bpm', def: 140, min: 40, max: 230 },
    ],
    formula: '{hrDrop} = {peakHr} − {hr1min}',
    compute: v => [
      { term: 'hrDrop', unit: 'bpm', value: Math.round(v.peak - v.after), digits: 0, primary: true },
      { term: 'percent', unit: 'percent', value: round(ratio(v.peak - v.after, v.peak) * 100, 1), digits: 1 },
      { term: 'peakHr', unit: 'bpm', value: Math.round(v.peak), digits: 0 },
    ],
    verdict: (_v, out) => {
      const d = out[0].value;
      return d >= 25
        ? { ko: `1분에 ${d}회 떨어졌습니다. 회복이 빠른 편입니다.`, en: `Down ${d} beats in a minute — brisk recovery.`, zh: `一分钟下降${d}次，恢复较快。`, tone: 'good' }
        : d >= 13
          ? { ko: `1분에 ${d}회 떨어졌습니다. 보통 범위입니다.`, en: `Down ${d} beats in a minute — a normal range.`, zh: `一分钟下降${d}次，属于正常范围。`, tone: 'good' }
          : { ko: `1분에 ${d}회는 느린 편입니다. 12회 이하가 반복되면 확인해 볼 신호로 봅니다.`, en: `${d} beats is slow; a repeated drop of 12 or fewer is treated as worth checking.`, zh: `一分钟仅下降${d}次偏慢，若反复低于12次则被视为需要检查的信号。`, tone: 'warn' };
    },
    ko: { title: '심박수 회복 계산기', desc: '운동을 멈춘 뒤 1분 동안 심박이 얼마나 떨어지는지 봅니다.',
      long: '운동 직후 심박에서 1분 뒤 심박을 빼면 회복 심박수입니다. 심장이 부교감신경으로 얼마나 빠르게 돌아오는지를 보는 값이고, 체력이 늘면 이 숫자도 커집니다.',
      note: '멈춘 직후에 완전히 서 있는지 걷는지에 따라 값이 달라집니다. 비교하려면 매번 같은 자세로 재세요.' },
    en: { title: 'Heart Rate Recovery', desc: 'How far your pulse falls in the minute after you stop.',
      long: 'Subtract the one-minute reading from the rate at the finish. It shows how quickly the heart hands back to the parasympathetic system, and the number grows as fitness improves.',
      note: 'Standing still versus walking it off changes the figure. Use the same posture every time if you want to compare.' },
    zh: { title: '心率恢复计算器', desc: '看停止运动后一分钟内心率下降多少。',
      long: '用运动结束时的心率减去一分钟后的心率即为心率恢复值。它反映心脏交回副交感调控的速度，体能提升后这个数字会变大。',
      note: '停下后是站立还是慢走会影响结果。若要比较，请每次保持相同姿势。' },
  },
  {
    slug: 'max-heart-rate-tanaka',
    icon: '💓',
    category: '심장·운동',
    fields: [
      { key: 'age', term: 'ageYears', def: 45, min: 15, max: 100 },
    ],
    formula: '{maxHr} = 208 − 0.7 × {ageYears}',
    compute: v => {
      const tanaka = 208 - 0.7 * v.age;
      return [
        { term: 'maxHr', unit: 'bpm', value: Math.round(tanaka), digits: 0, primary: true },
        { term: 'diff', unit: 'bpm', value: Math.round(tanaka - (220 - v.age)), digits: 0 },
        { term: 'hrHigh', unit: 'bpm', value: Math.round(tanaka * 0.85), digits: 0 },
      ];
    },
    ko: { title: '최대 심박수 (타나카 공식)', desc: '220에서 나이를 빼는 방식보다 정확한 추정식을 씁니다.',
      long: '"220 − 나이"는 1970년대에 자료 없이 만들어진 어림이라 젊은 사람은 높게, 나이 든 사람은 낮게 나옵니다. 타나카 공식(208 − 0.7 × 나이)은 실측 자료로 만든 식이라 40대 이후에 특히 잘 맞습니다.',
      note: '어느 공식이든 개인차가 ±10회 정도 있습니다. 정확한 값이 필요하면 운동부하검사를 받아야 합니다.' },
    en: { title: 'Maximum Heart Rate (Tanaka)', desc: 'A better estimate than subtracting your age from 220.',
      long: '“220 minus age” was a rough guess made in the 1970s without data; it reads high for the young and low for the old. Tanaka’s 208 − 0.7 × age was fitted to measurements and holds up much better past forty.',
      note: 'Every formula carries about ±10 beats of individual variation. A real figure needs a graded exercise test.' },
    zh: { title: '最大心率（Tanaka公式）', desc: '比“220减年龄”更准确的估算方式。',
      long: '“220减年龄”是1970年代在缺乏数据下提出的粗略估计，对年轻人偏高、对年长者偏低。Tanaka公式（208 − 0.7×年龄）由实测数据拟合，四十岁以后尤其吻合。',
      note: '任何公式都有约±10次的个体差异。需要精确数值应做运动负荷试验。' },
  },
  {
    slug: 'steps-calories',
    icon: '👟',
    category: '심장·운동',
    fields: [
      { key: 'steps', term: 'steps', unit: 'step', def: 8000, min: 0 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 68, min: 1 },
      { key: 'stride', term: 'strideCm', unit: 'cm', def: 70, min: 30, max: 120 },
    ],
    formula: '{calories} = {steps} × {strideCm} ÷ 100000 × {weightKgB} × 0.9',
    compute: v => {
      const km = v.steps * v.stride / 100000;
      return [
        { term: 'calories', unit: 'kcal', value: Math.round(km * v.kg * 0.9), digits: 0, primary: true },
        { term: 'distanceKm', unit: 'km', value: round(km, 2), digits: 2 },
        { term: 'timeMin', unit: 'minute', value: Math.round(ratio(km, 4.8) * 60), digits: 0 },
      ];
    },
    ko: { title: '걸음 수 → 칼로리 계산기', desc: '걸음 수와 체중으로 태운 열량과 걸은 거리를 구합니다.',
      long: '걸음에 보폭을 곱해 거리를 만들고, 걷기는 1km에 체중(kg)당 약 0.9kcal을 씁니다. 68kg이 5.6km를 걸으면 약 343kcal입니다.',
      note: '오르막과 짐이 있으면 실제 소비가 커집니다. 반대로 아주 느리게 걸으면 이 값보다 적게 나옵니다.' },
    en: { title: 'Step Count to Calories', desc: 'Turn a step count and your weight into calories and distance.',
      long: 'Steps times stride gives distance, and walking costs roughly 0.9 kcal per kilogram per kilometre. A 68 kg person walking 5.6 km burns about 343 kcal.',
      note: 'Hills and a loaded bag push the real figure up; very slow walking pulls it down.' },
    zh: { title: '步数换算热量', desc: '用步数和体重算出消耗的热量与行走距离。',
      long: '步数乘以步幅得到距离，步行每公斤体重每公里约消耗0.9千卡。68公斤的人走5.6公里约消耗343千卡。',
      note: '上坡或负重会使实际消耗更高；走得很慢则会低于此值。' },
  },
  {
    slug: 'vo2-to-met',
    icon: '🫁',
    category: '심장·운동',
    fields: [
      { key: 'vo2', term: 'vo2max', def: 42, min: 5, max: 90 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 1 },
    ],
    formula: '{metFromVo2} = {vo2max} ÷ 3.5',
    compute: v => {
      const met = ratio(v.vo2, 3.5);
      return [
        { term: 'metFromVo2', unit: 'none', value: round(met, 2), digits: 2, primary: true },
        { term: 'calories', unit: 'kcal', value: round(met * v.kg, 1), digits: 1 },
        { term: 'vo2max', unit: 'none', value: round(v.vo2 * v.kg, 0), digits: 0 },
      ];
    },
    verdict: (_v, out) => ({
      ko: `최대 ${out[0].value} MET까지 낼 수 있습니다. 계단을 쉬지 않고 오르려면 4~5 MET, 조깅은 7 MET 정도가 필요합니다.`,
      en: `You can reach about ${out[0].value} METs. Stairs without stopping need 4–5; jogging needs around 7.`,
      zh: `最大可达约${out[0].value} MET。不停歇上楼梯需4至5，慢跑约需7。`,
      tone: 'good',
    }),
    ko: { title: 'VO2max ↔ MET 환산기', desc: '심폐 능력을 운동 강도 단위로 바꿔 봅니다.',
      long: '가만히 있을 때 산소를 체중 1kg당 분당 3.5ml 씁니다. 이걸 1 MET로 정했으므로 VO2max를 3.5로 나누면 낼 수 있는 최대 MET가 나옵니다. 어떤 운동을 감당할 수 있는지 가늠할 때 씁니다.',
      note: '최대 MET로 오래 운동할 수는 없습니다. 지속 가능한 강도는 보통 최대의 60~70%입니다.' },
    en: { title: 'VO2max to METs', desc: 'Convert cardio capacity into units of exercise intensity.',
      long: 'At rest you use 3.5 mL of oxygen per kilogram per minute, and that was defined as one MET. Divide VO2max by 3.5 for the highest MET you can produce — useful for judging which activities are within reach.',
      note: 'You cannot hold your maximum MET for long. Sustainable intensity usually sits at 60–70% of it.' },
    zh: { title: 'VO2max与MET换算', desc: '把心肺能力换算成运动强度单位。',
      long: '静息时每公斤体重每分钟消耗3.5毫升氧气，这被定为1 MET。把VO2max除以3.5即得可达到的最大MET，用于判断能承担哪些运动。',
      note: '最大MET无法长时间维持，可持续强度通常为最大值的60%至70%。' },
  },
  {
    slug: 'bike-speed',
    icon: '🚲',
    category: '심장·운동',
    fields: [
      { key: 'wheel', term: 'wheelCm', unit: 'cm', def: 210, min: 100, max: 260 },
      { key: 'cadence', term: 'cadence', unit: 'rpm', def: 85, min: 30, max: 150 },
      { key: 'gear', term: 'gearRatio', def: 3.2, min: 0.5, max: 6 },
    ],
    formula: '{speedKmh} = {wheelCm} × {gearRatio} × {cadence} × 60 ÷ 100000',
    compute: v => {
      const kmh = v.wheel * v.gear * v.cadence * 60 / 100000;
      return [
        { term: 'speedKmh', unit: 'km', value: round(kmh, 1), digits: 1, primary: true },
        { term: 'distanceKm', unit: 'm', value: round(v.wheel * v.gear / 100, 2), digits: 2 },
        { term: 'timeMin', unit: 'minute', value: round(ratio(60, kmh), 2), digits: 2 },
      ];
    },
    ko: { title: '자전거 속도 계산기 (케이던스·기어비)', desc: '페달 회전수와 기어비로 나오는 속도를 계산합니다.',
      long: '기어비는 앞 기어 잇수를 뒤 기어 잇수로 나눈 값입니다. 페달 한 바퀴에 바퀴가 기어비만큼 돌고, 바퀴 한 바퀴가 바퀴 둘레만큼 나아갑니다. 여기에 분당 회전수와 60분을 곱하면 시속이 됩니다.',
      note: '700×25c 타이어의 둘레가 약 210cm입니다. 타이어 폭과 공기압에 따라 몇 cm씩 달라지므로 정밀 측정에는 바퀴를 굴려 재세요.' },
    en: { title: 'Cycling Speed from Cadence', desc: 'Work out speed from pedal rpm and gear ratio.',
      long: 'Gear ratio is front teeth over rear teeth. One pedal turn spins the wheel that many times, and each wheel turn covers its circumference. Multiply by rpm and sixty minutes for km/h.',
      note: 'A 700×25c tyre rolls about 210 cm. Width and pressure shift that by a few centimetres, so roll the wheel out if you need precision.' },
    zh: { title: '自行车速度计算器（踏频与齿比）', desc: '用踏频和齿比算出行进速度。',
      long: '齿比是前齿数除以后齿数。踏板转一圈，车轮转齿比这么多圈，每圈前进一个轮周。再乘以每分钟转数和60分钟即为时速。',
      note: '700×25c轮胎的轮周约210厘米。胎宽与气压会带来数厘米差异，需精确时请实测滚动周长。' },
  },
  {
    slug: 'rowing-split',
    icon: '🚣',
    category: '심장·운동',
    fields: [
      { key: 'meters', term: 'rowMeters', unit: 'm', def: 2000, min: 100 },
      { key: 'seconds', term: 'rowSeconds', unit: 'sec', def: 480, min: 10 },
    ],
    formula: '{split500} = {rowSeconds} ÷ {rowMeters} × 500',
    compute: v => {
      const split = ratio(v.seconds, v.meters) * 500;
      return [
        { term: 'split500', unit: 'sec', value: round(split, 1), digits: 1, primary: true },
        { term: 'paceMin', unit: 'minute', value: Math.floor(split / 60), digits: 0 },
        { term: 'paceSec', unit: 'sec', value: round(split % 60, 1), digits: 1 },
        { term: 'speedKmh', unit: 'km', value: round(ratio(v.meters / 1000, v.seconds / 3600), 2), digits: 2 },
      ];
    },
    ko: { title: '로잉 500m 스플릿 계산기', desc: '거리와 기록으로 500m당 페이스를 구합니다.',
      long: '로잉에서는 속도를 500m를 가는 데 걸리는 시간으로 부릅니다. 2,000m를 8분에 갔다면 500m당 2분입니다. 숫자가 작을수록 빠른 것이라 달리기 페이스와 읽는 방향이 같습니다.',
      note: '기계마다 저항 설정(드래그 팩터)이 달라 같은 힘으로도 스플릿이 달라집니다. 기록을 비교하려면 드래그 팩터를 맞추세요.' },
    en: { title: 'Rowing 500 m Split', desc: 'Turn a distance and a time into pace per 500 metres.',
      long: 'Rowing quotes speed as the time to cover 500 m. Two thousand metres in eight minutes is a 2:00 split. Lower is faster, the same way running pace reads.',
      note: 'Drag factor differs between machines, so the same effort gives different splits. Match the drag factor before comparing times.' },
    zh: { title: '划船机500米分段', desc: '用距离和成绩算出每500米的配速。',
      long: '划船以走完500米所需时间表示速度。2000米用8分钟，则每500米为2分00秒。数值越小越快，与跑步配速的读法一致。',
      note: '各台机器的阻力设定（drag factor）不同，同样出力也会得到不同分段。比较成绩前请统一阻力设定。' },
  },
  {
    slug: 'training-volume',
    icon: '🏋️',
    category: '심장·운동',
    fields: [
      { key: 'weight', term: 'liftWeight', unit: 'kg', def: 80, min: 0 },
      { key: 'reps', term: 'reps', def: 8, min: 1, max: 100 },
      { key: 'sets', term: 'sets', unit: 'set', def: 4, min: 1, max: 20 },
    ],
    formula: '{volumeKg} = {liftWeight} × {reps} × {sets}',
    compute: v => [
      { term: 'volumeKg', unit: 'kg', value: Math.round(v.weight * v.reps * v.sets), digits: 0, primary: true },
      { term: 'reps', unit: 'none', value: Math.round(v.reps * v.sets), digits: 0 },
      { term: 'oneRm', unit: 'kg', value: round(v.weight * (1 + v.reps / 30), 1), digits: 1 },
    ],
    ko: { title: '훈련 볼륨 계산기', desc: '무게 × 횟수 × 세트로 한 운동의 총 부하를 구합니다.',
      long: '무게만 보면 5회 × 3세트와 10회 × 5세트의 차이가 안 보입니다. 셋을 모두 곱한 볼륨이 근육이 실제로 받은 일의 양에 가까워서 주간 훈련량을 비교하는 기준이 됩니다.',
      note: '볼륨이 같아도 무게가 크면 신경계 부담이, 횟수가 많으면 대사 부담이 큽니다. 볼륨만 맞추면 되는 것은 아닙니다.' },
    en: { title: 'Training Volume', desc: 'Weight × reps × sets — the total load of an exercise.',
      long: 'Looking at the weight alone hides the difference between 3×5 and 5×10. Multiplying all three gives volume, which is closer to the work the muscle actually did and is the usual basis for comparing weekly load.',
      note: 'Equal volume is not equal stress: heavy weight taxes the nervous system, high reps tax metabolism. Matching volume is not the whole story.' },
    zh: { title: '训练容量计算器', desc: '用重量×次数×组数算出一个动作的总负荷。',
      long: '只看重量，看不出5次×3组与10次×5组的差别。三者相乘得到的容量更接近肌肉实际完成的功，是比较每周训练量的常用基准。',
      note: '容量相同也未必负担相同：大重量偏向神经系统压力，高次数偏向代谢压力。只对齐容量并不够。' },
  },
  {
    slug: 'rpe-to-percent',
    icon: '🎚️',
    category: '심장·운동',
    fields: [
      { key: 'rpe', term: 'rpe', def: 8, min: 4, max: 10 },
      { key: 'reps', term: 'reps', def: 5, min: 1, max: 15 },
      { key: 'rm', term: 'oneRm', unit: 'kg', def: 120, min: 1 },
    ],
    formula: '{rmPercent} = 100 − ({reps} + (10 − {rpe})) × 3',
    compute: v => {
      // 남긴 횟수(10 − RPE)와 실제 횟수를 더해 총 유효 횟수를 만들고, 한 회당 약 3%로 잡는다
      const effective = v.reps + (10 - v.rpe);
      const pct = Math.max(40, 100 - (effective - 1) * 3);
      return [
        { term: 'rmPercent', unit: 'percent', value: round(pct, 1), digits: 1, primary: true },
        { term: 'liftWeight', unit: 'kg', value: round(v.rm * pct / 100, 1), digits: 1 },
        { term: 'count', unit: 'none', value: round(10 - v.rpe, 0), digits: 0 },
      ];
    },
    ko: { title: 'RPE → 1RM 비율 계산기', desc: '주관적 강도와 횟수로 1RM의 몇 %인지 추정합니다.',
      long: 'RPE 8은 두 번 더 들 수 있었다는 뜻입니다. 실제 횟수에 남긴 횟수를 더하면 그 무게로 가능한 최대 횟수가 되고, 한 회마다 약 3%씩 1RM에서 내려간다고 봅니다.',
      note: '한 회당 3%는 어림입니다. 5회 이하에서는 잘 맞지만 10회를 넘으면 오차가 커집니다.' },
    en: { title: 'RPE to Percentage of 1RM', desc: 'Estimate what share of your max a set at a given RPE represents.',
      long: 'RPE 8 means you had two more in you. Add the reps left to the reps done for the maximum possible at that weight, then drop about 3% off your one-rep max per rep.',
      note: 'The 3%-per-rep rule is an approximation. It holds well up to five reps and drifts beyond ten.' },
    zh: { title: 'RPE换算1RM百分比', desc: '用主观强度与次数估算相当于1RM的百分之几。',
      long: 'RPE 8表示还能再做两次。把实际次数与剩余次数相加，得到该重量下的最大可完成次数，再按每次约3%从1RM往下推。',
      note: '每次3%只是近似。5次以内较为吻合，超过10次误差会变大。' },
  },
  {
    slug: 'marathon-predict',
    icon: '🏅',
    category: '심장·운동',
    fields: [
      { key: 'half', term: 'halfMin', unit: 'minute', def: 105, min: 50, max: 300 },
    ],
    formula: '{fullPredict} = {halfMin} × 2 ^ 1.06',
    compute: v => {
      // 리겔의 지수 1.06 — 거리가 두 배가 되면 시간은 2^1.06배가 된다
      const full = v.half * Math.pow(2, 1.06);
      return [
        { term: 'fullPredict', unit: 'minute', value: round(full, 1), digits: 1, primary: true },
        { term: 'paceMin', unit: 'minPerKm', value: round(full / 42.195, 2), digits: 2 },
        { term: 'diff', unit: 'minute', value: round(full - v.half * 2, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const h = Math.floor(out[0].value / 60);
      const m = Math.round(out[0].value % 60);
      return {
        ko: `예상 완주 시간은 약 ${h}시간 ${m}분, 페이스는 km당 ${out[1].value}분입니다.`,
        en: `Predicted finish around ${h} h ${m} min, at ${out[1].value} min per kilometre.`,
        zh: `预计完成时间约${h}小时${m}分，配速为每公里${out[1].value}分。`,
        tone: 'good',
      };
    },
    ko: { title: '하프 기록으로 풀코스 예측', desc: '하프마라톤 기록으로 풀코스 완주 시간을 추정합니다.',
      long: '거리가 두 배가 되면 시간은 두 배보다 조금 더 걸립니다. 리겔 공식은 그 "조금 더"를 2의 1.06제곱으로 잡습니다. 하프 1시간 45분이면 풀은 약 3시간 39분입니다.',
      note: '30km 이후의 벽을 반영하지 못하므로 훈련량이 부족하면 예측보다 훨씬 늦게 들어옵니다. 장거리 훈련을 충분히 한 경우에만 잘 맞습니다.' },
    en: { title: 'Marathon Time from a Half', desc: 'Predict a full marathon finish from your half-marathon time.',
      long: 'Doubling the distance takes a little more than double the time. Riegel’s formula puts that “little more” at two to the power 1.06, so a 1:45 half predicts about 3:39 for the full.',
      note: 'It cannot see the wall past 30 km, so undertrained runners finish far later than predicted. Trust it only with solid long-run mileage behind you.' },
    zh: { title: '用半马成绩预测全马', desc: '根据半程马拉松成绩推算全马完成时间。',
      long: '距离翻倍所需时间会比两倍稍多。Riegel公式把这个“稍多”定为2的1.06次方，因此半马1小时45分对应全马约3小时39分。',
      note: '该公式无法反映30公里后的“撞墙”，训练量不足者会比预测慢很多。只有具备充分长距离训练时才准确。' },
  },
];
