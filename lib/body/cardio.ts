/** 몸 수치 - 심장·운동 (10종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const CARDIO_TOOLS: FormulaTool[] = [
  {
    slug: 'max-heart-rate',
    icon: '❤️',
    category: '심장·운동',
    fields: [{ key: 'age', term: 'ageYears', def: 35, min: 5, max: 100 }],
    formula: '{maxHr} = 208 − 0.7 × {ageYears}  (Tanaka)',
    compute: v => [
      { term: 'maxHr', unit: 'bpm', value: Math.round(208 - 0.7 * v.age), digits: 0, primary: true },
      { term: 'result', unit: 'bpm', value: Math.round(220 - v.age), digits: 0 },
    ],
    ko: { title: '최대 심박수 계산기', desc: '나이로 최대 심박수를 추정합니다. Tanaka 식과 220−나이를 함께 봅니다.',
      long: '오래 쓰인 "220 − 나이"는 젊은 층에서 과대, 고령층에서 과소평가합니다. Tanaka 식(208 − 0.7×나이)이 더 정확하다고 보고됩니다.',
      note: '개인차가 ±10~12bpm 있습니다. 정확한 값은 운동부하검사로만 알 수 있습니다.' },
    en: { title: 'Max Heart Rate', desc: 'Estimate maximum heart rate from age using Tanaka and 220−age.',
      long: 'The familiar "220 − age" overestimates for the young and underestimates for older adults. The Tanaka equation (208 − 0.7 × age) tracks reality better.',
      note: 'Individual variation runs ±10–12 bpm — only a graded exercise test gives your true maximum.' },
  },
  {
    slug: 'target-heart-rate',
    icon: '🎯',
    category: '심장·운동',
    fields: [
      { key: 'age', term: 'ageYears', def: 35, min: 5, max: 100 },
      { key: 'rest', term: 'restHr', unit: 'bpm', def: 65, min: 30, max: 120 },
      { key: 'intensity', term: 'intensity', unit: 'percent', def: 70, min: 40, max: 95 },
    ],
    formula: '{hrLow} = ({maxHr} − {restHr}) × {intensity} ÷ 100 + {restHr}  (Karvonen)',
    compute: v => {
      const max = 208 - 0.7 * v.age;
      const reserve = max - v.rest;
      const at = (pct: number) => v.rest + (reserve * pct) / 100;
      return [
        { term: 'hrLow', unit: 'bpm', value: Math.round(at(v.intensity)), digits: 0, primary: true },
        { term: 'hrHigh', unit: 'bpm', value: Math.round(at(Math.min(95, v.intensity + 10))), digits: 0 },
        { term: 'maxHr', unit: 'bpm', value: Math.round(max), digits: 0 },
      ];
    },
    verdict: v => {
      const i = v.intensity;
      const ko = i < 60 ? '가벼운 유산소(지방 연소 구간)' : i < 70 ? '기초 체력 구간' : i < 80 ? '유산소 능력 향상 구간' : i < 90 ? '무산소 역치 구간' : '최대 강도 구간';
      const en = i < 60 ? 'light aerobic, fat-burning zone' : i < 70 ? 'base endurance zone' : i < 80 ? 'aerobic development zone' : i < 90 ? 'anaerobic threshold zone' : 'maximal effort zone';
      return { ko: `강도 ${i}%는 ${ko}입니다.`, en: `${i}% intensity is the ${en}.`, l10n: { es: `Una intensidad del ${i} % es la ${i < 60 ? 'zona aeróbica ligera, la de quemar grasa' : i < 70 ? 'zona de base aeróbica' : i < 80 ? 'zona de desarrollo aeróbico' : i < 90 ? 'zona de umbral anaeróbico' : 'zona de esfuerzo máximo'}.`, 'pt-br': `Uma intensidade de ${i} % é a ${i < 60 ? 'zona aeróbica leve, a de queimar gordura' : i < 70 ? 'zona de base aeróbica' : i < 80 ? 'zona de desenvolvimento aeróbico' : i < 90 ? 'zona de limiar anaeróbico' : 'zona de esforço máximo'}.`, ja: `強度${i}%は${i < 60 ? '軽い有酸素、脂肪を燃やす領域' : i < 70 ? '基礎持久力の領域' : i < 80 ? '有酸素能力を伸ばす領域' : i < 90 ? '無酸素性作業閾値の領域' : '最大強度の領域'}です。`, de: `${i} % Intensität ist die ${i < 60 ? 'leichte aerobe Zone, in der Fett verbrannt wird' : i < 70 ? 'Grundlagenausdauerzone' : i < 80 ? 'Zone für die aerobe Entwicklung' : i < 90 ? 'Zone der anaeroben Schwelle' : 'Zone maximaler Belastung'}.`, fr: `Une intensité de ${i} % correspond à la ${i < 60 ? 'zone aérobie légère, celle où l’on brûle du gras' : i < 70 ? 'zone d’endurance de base' : i < 80 ? 'zone de développement aérobie' : i < 90 ? 'zone du seuil anaérobie' : 'zone d’effort maximal'}.`, hi: `${i}% तीव्रता ${i < 60 ? 'हल्का एरोबिक, वसा जलाने वाला' : i < 70 ? 'बुनियादी सहनशक्ति का' : i < 80 ? 'एरोबिक क्षमता बढ़ाने वाला' : i < 90 ? 'अवायवीय दहलीज़ का' : 'अधिकतम ज़ोर का'} क्षेत्र है।` }, tone: 'good' };
    },
    ko: { title: '목표 심박수 계산기(카르보넨)', desc: '안정 심박수를 반영해 운동 강도별 목표 심박 구간을 구합니다.',
      long: '단순히 최대 심박수에 비율을 곱하는 방식과 달리, 카르보넨 식은 최대와 안정 심박수의 차이(심박 예비량)에 비율을 곱합니다. 체력이 좋아 안정 심박수가 낮은 사람에게 더 맞습니다.',
      note: '안정 심박수는 아침에 깨자마자 누운 상태로 재야 정확합니다.' },
    en: { title: 'Target Heart Rate (Karvonen)', desc: 'Get training zones that account for your resting heart rate.',
      long: 'Instead of taking a percentage of maximum heart rate, the Karvonen method takes a percentage of heart rate reserve — max minus resting. It suits fitter people with low resting rates better.',
      note: 'Measure resting heart rate lying down, immediately after waking, for an accurate figure.' },
  },
  {
    slug: 'vo2max-cooper',
    icon: '🏃',
    category: '심장·운동',
    fields: [{ key: 'meters', term: 'cooperDist', def: 2400, min: 500, max: 5000 }],
    formula: '{vo2max} = ({cooperDist} − 504.9) ÷ 44.73',
    compute: v => [
      { term: 'vo2max', value: round(ratio(v.meters - 504.9, 44.73), 1), digits: 1, primary: true },
      { term: 'speedKmh', unit: 'km', value: round(v.meters / 1000 / 0.2, 2), digits: 2 },
    ],
    verdict: (v, out) => {
      const x = out[0].value;
      const band = x >= 55 ? 0 : x >= 45 ? 1 : x >= 35 ? 2 : 3;
      const ko = ['매우 우수', '좋음', '보통', '낮음'][band];
      const en = ['excellent', 'good', 'average', 'below average'][band];
      return { ko: `VO2max ${x}는 ${ko} 수준입니다.`, en: `A VO2max of ${x} is ${en}.`, l10n: { es: `Un VO2max de ${x} es ${['excelente', 'bueno', 'medio', 'por debajo de la media'][band]}.`, 'pt-br': `Um VO2max de ${x} é ${['excelente', 'bom', 'médio', 'abaixo da média'][band]}.`, ja: `VO2max ${x}は${['非常に優秀', '良好', '平均的', '平均以下'][band]}な水準です。`, de: `Eine VO2max von ${x} ist ${['ausgezeichnet', 'gut', 'durchschnittlich', 'unterdurchschnittlich'][band]}.`, fr: `Une VO2max de ${x} est ${['excellente', 'bonne', 'moyenne', 'sous la moyenne'][band]}.`, hi: `${x} का VO2max ${['बहुत बढ़िया', 'अच्छा', 'औसत', 'औसत से नीचे'][band]} है।` }, tone: band <= 1 ? 'good' : band === 2 ? 'warn' : 'bad' };
    },
    ko: { title: '쿠퍼 테스트 VO2max', desc: '12분 동안 달린 거리로 최대 산소 섭취량을 추정합니다.',
      long: '평지에서 12분간 최대한 멀리 달린 거리를 미터로 넣습니다. VO2max는 심폐 능력의 대표 지표이고, 사망률과 가장 강하게 연관된 체력 지표입니다.',
      note: '전력 달리기 검사입니다. 심장 질환이 있거나 평소 운동을 하지 않았다면 먼저 의사와 상의하세요.' },
    en: { title: 'Cooper Test VO2max', desc: 'Estimate maximal oxygen uptake from how far you run in 12 minutes.',
      long: 'Enter the metres covered running as far as possible in 12 minutes on level ground. VO2max is the headline measure of cardiorespiratory fitness and the fitness metric most strongly tied to mortality.',
      note: 'This is an all-out effort — check with a doctor first if you have heart disease or are untrained.' },
  },
  {
    slug: 'vo2max-resting',
    icon: '💗',
    category: '심장·운동',
    fields: [
      { key: 'age', term: 'ageYears', def: 35, min: 10, max: 100 },
      { key: 'rest', term: 'restHr', unit: 'bpm', def: 60, min: 30, max: 120 },
    ],
    formula: '{vo2max} = 15 × {maxHr} ÷ {restHr}',
    compute: v => {
      const max = 208 - 0.7 * v.age;
      return [
        { term: 'vo2max', value: round(15 * ratio(max, v.rest), 1), digits: 1, primary: true },
        { term: 'maxHr', unit: 'bpm', value: Math.round(max), digits: 0 },
      ];
    },
    ko: { title: '안정 심박수로 VO2max 추정', desc: '달리지 않고 안정 심박수만으로 심폐 능력을 어림합니다.',
      long: '최대 심박수를 안정 심박수로 나눈 값에 15를 곱하는 간이 추정법입니다. 안정 심박수가 낮을수록 심장이 한 번에 많은 피를 보낸다는 뜻입니다.',
      note: '오차가 큰 간이법입니다. 정확한 값은 쿠퍼 테스트나 실험실 측정으로 확인하세요.' },
    en: { title: 'VO2max from Resting HR', desc: 'Rough cardiorespiratory fitness estimate with no running required.',
      long: 'This shortcut multiplies max heart rate divided by resting heart rate by 15. A lower resting rate means the heart moves more blood per beat.',
      note: 'The error margin is wide — use the Cooper test or a lab measurement when accuracy matters.' },
  },
  {
    slug: 'one-rep-max',
    icon: '🏋️',
    category: '심장·운동',
    fields: [
      { key: 'weight', term: 'liftWeight', def: 80, min: 1, max: 500 },
      { key: 'reps', term: 'reps', def: 8, min: 1, max: 20 },
    ],
    formula: '{oneRm} = {liftWeight} × (1 + {reps} ÷ 30)  (Epley)',
    compute: v => {
      const epley = v.weight * (1 + v.reps / 30);
      const brzycki = ratio(v.weight * 36, 37 - v.reps);
      return [
        { term: 'oneRm', unit: 'kg', value: round(epley, 1), digits: 1, primary: true },
        { term: 'result', unit: 'kg', value: round(brzycki, 1), digits: 1 },
      ];
    },
    ko: { title: '1RM 계산기', desc: '든 무게와 반복 횟수로 1회 최대 중량을 추정합니다.',
      long: 'Epley 식과 Brzycki 식을 함께 보여줍니다. 반복 횟수가 10회를 넘으면 두 식의 오차가 커지니 5~8회 세트로 재는 것이 좋습니다.',
      note: '추정값입니다. 실제 1RM 시도는 보조자와 함께, 충분한 준비운동 후에 하세요.' },
    en: { title: 'One-Rep Max Calculator', desc: 'Estimate your single-rep maximum from a set you completed.',
      long: 'Both the Epley and Brzycki formulas are shown. Above about 10 reps the two diverge, so a set of 5–8 gives the most reliable estimate.',
      note: 'This is an estimate — attempt a true 1RM only with a spotter and a full warm-up.' },
  },
  {
    slug: 'rep-weight',
    icon: '📋',
    category: '심장·운동',
    fields: [
      { key: 'oneRm', term: 'oneRm', unit: 'kg', def: 100, min: 1, max: 500 },
      { key: 'reps', term: 'reps', def: 10, min: 1, max: 20 },
    ],
    formula: '{liftWeight} = {oneRm} ÷ (1 + {reps} ÷ 30)',
    compute: v => [
      { term: 'liftWeight', unit: 'kg', value: round(ratio(v.oneRm, 1 + v.reps / 30), 1), digits: 1, primary: true },
      { term: 'percent', unit: 'percent', value: round(ratio(100, 1 + v.reps / 30), 1), digits: 1 },
    ],
    ko: { title: '목표 횟수 중량 계산기', desc: '1RM에서 원하는 반복 횟수로 들 무게를 역산합니다.',
      long: '1RM의 몇 %를 쓰는지도 함께 보여줍니다. 근력은 1~5회(85% 이상), 근육 크기는 6~12회(65~80%) 구간에서 잘 자랍니다.',
      note: '같은 %라도 종목마다 가능한 횟수가 다릅니다. 스쿼트는 벤치프레스보다 같은 %에서 더 많이 들립니다.' },
    en: { title: 'Weight for Target Reps', desc: 'Work back from your 1RM to the load for a given rep count.',
      long: 'The percentage of 1RM is shown too. Strength responds best at 1–5 reps (85%+), size at 6–12 reps (65–80%).',
      note: 'The same percentage allows different rep counts per lift — squats give more reps than bench at equal percentages.' },
  },
  {
    slug: 'running-pace',
    icon: '⏱️',
    category: '심장·운동',
    fields: [
      { key: 'km', term: 'distanceKm', def: 10, min: 0.1, max: 200, step: 0.1 },
      { key: 'minutes', term: 'timeMin', def: 55, min: 1, max: 1000 },
    ],
    formula: '{paceMin} = {timeMin} ÷ {distanceKm}',
    compute: v => {
      const pace = ratio(v.minutes, v.km);
      return [
        { term: 'paceMin', unit: 'minPerKm', value: round(pace, 2), digits: 2, primary: true },
        { term: 'paceSec', value: Math.round((pace % 1) * 60), digits: 0 },
        { term: 'speedKmh', value: round(ratio(v.km * 60, v.minutes), 2), digits: 2 },
      ];
    },
    ko: { title: '달리기 페이스 계산기', desc: '거리와 시간으로 1km당 페이스와 속도를 구합니다.',
      long: '페이스는 소수 분으로 나오므로 초 부분을 따로 보여줍니다. 5.5분/km는 5분 30초/km입니다.',
      note: '10km를 55분에 달리면 5분 30초/km 페이스이고, 이 페이스를 유지하면 하프는 약 1시간 56분입니다.' },
    en: { title: 'Running Pace Calculator', desc: 'Get pace per kilometre and speed from a distance and a time.',
      long: 'Pace comes out in decimal minutes, so the seconds part is shown separately — 5.5 min/km means 5:30 per kilometre.',
      note: '10 km in 55 minutes is a 5:30/km pace; holding it through a half marathon gives about 1:56.' },
  },
  {
    slug: 'race-time',
    icon: '🏁',
    category: '심장·운동',
    fields: [
      { key: 'km', term: 'distanceKm', def: 42.195, min: 0.1, max: 200, step: 0.1 },
      { key: 'pace', term: 'paceMin', unit: 'minPerKm', def: 6, min: 2, max: 20, step: 0.05 },
    ],
    formula: '{finishTime} = {distanceKm} × {paceMin}',
    compute: v => {
      const total = v.km * v.pace;
      return [
        { term: 'finishTime', unit: 'minute', value: round(total, 1), digits: 1, primary: true },
        { term: 'hours', value: Math.floor(total / 60), digits: 0 },
        { term: 'minutes', value: Math.round(total % 60), digits: 0 },
      ];
    },
    ko: { title: '완주 시간 계산기', desc: '목표 페이스로 달리면 몇 분에 들어오는지 계산합니다.',
      long: '거리에 페이스를 곱한 총 분과, 시·분으로 나눈 값을 함께 보여줍니다. 마라톤 42.195km를 6분/km로 달리면 4시간 13분입니다.',
      note: '후반에 페이스가 떨어지는 것이 보통입니다. 목표 기록은 전반을 조금 느리게 잡는 편이 안전합니다.' },
    en: { title: 'Race Finish Time', desc: 'See your finishing time for a target pace and distance.',
      long: 'Distance times pace gives total minutes, shown alongside the hours-and-minutes split. A marathon at 6:00/km finishes in 4:13.',
      note: 'Pace usually fades in the second half, so plan the first half slightly slower than target.' },
  },
  {
    slug: 'treadmill-pace',
    icon: '🎽',
    category: '심장·운동',
    fields: [{ key: 'speed', term: 'speedKmh', def: 10, min: 1, max: 30, step: 0.1 }],
    formula: '{paceMin} = 60 ÷ {speedKmh}',
    compute: v => {
      const pace = ratio(60, v.speed);
      return [
        { term: 'paceMin', unit: 'minPerKm', value: round(pace, 2), digits: 2, primary: true },
        { term: 'paceSec', value: Math.round((pace % 1) * 60), digits: 0 },
        { term: 'distanceKm', unit: 'km', value: round(v.speed / 2, 2), digits: 2 },
      ];
    },
    ko: { title: '트레드밀 속도 → 페이스', desc: '러닝머신 속도(km/h)를 1km당 페이스로 바꿉니다.',
      long: '러닝머신은 속도로 표시되고 야외 달리기는 페이스로 말합니다. 60을 속도로 나누면 페이스이고, 10km/h는 6분/km입니다.',
      note: '아래 값은 그 속도로 30분 달렸을 때의 거리입니다. 트레드밀은 경사 0에서도 야외보다 약간 쉽습니다.' },
    en: { title: 'Treadmill Speed to Pace', desc: 'Convert a treadmill speed in km/h into pace per kilometre.',
      long: 'Treadmills read out speed while runners talk in pace. Divide 60 by the speed: 10 km/h is 6:00 per kilometre.',
      note: 'The third figure is the distance covered in 30 minutes. Even at 0% incline, a treadmill is slightly easier than road running.' },
  },
  {
    slug: 'swim-pace',
    icon: '🏊',
    category: '심장·운동',
    fields: [
      { key: 'meters', term: 'cooperDist', def: 1000, min: 25, max: 10000 },
      { key: 'minutes', term: 'timeMin', def: 22, min: 1, max: 600 },
    ],
    formula: '{per100m} = {timeMin} × 100 ÷ {cooperDist}',
    compute: v => {
      const per100 = ratio(v.minutes * 100, v.meters);
      return [
        { term: 'per100m', unit: 'minPerKm', value: round(per100, 2), digits: 2, primary: true },
        { term: 'paceSec', value: Math.round((per100 % 1) * 60), digits: 0 },
        { term: 'speedKmh', value: round(ratio(v.meters / 1000 * 60, v.minutes), 2), digits: 2 },
      ];
    },
    ko: { title: '수영 100m 페이스 계산기', desc: '수영 거리와 시간으로 100m당 기록을 구합니다.',
      long: '수영은 100m당 기록으로 실력을 말합니다. 1000m를 22분에 완영하면 100m당 2분 12초입니다.',
      note: '25m 풀과 50m 풀은 턴 횟수가 달라 같은 실력에서도 기록 차이가 납니다.' },
    en: { title: 'Swim Pace per 100 m', desc: 'Get your per-100-metre split from a swim distance and time.',
      long: 'Swimmers describe speed as time per 100 m. Covering 1,000 m in 22 minutes is 2:12 per 100 m.',
      note: 'A 25 m pool involves more turns than a 50 m pool, so times differ at equal fitness.' },
  },
];
