/** 몸 수치 - 대사·칼로리 (10종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

/** Mifflin-St Jeor — 현재 가장 널리 쓰이는 기초대사량 식 */
const mifflin = (kg: number, cm: number, age: number, male: boolean) =>
  10 * kg + 6.25 * cm - 5 * age + (male ? 5 : -161);

export const METABOLISM_TOOLS: FormulaTool[] = [
  {
    slug: 'bmr',
    icon: '🔥',
    category: '대사·칼로리',
    fields: [
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1, step: 1 },
      { key: 'age', term: 'ageYears', def: 30, min: 1, max: 120 },
      { key: 'height', term: 'heightCm', def: 170, min: 100, max: 250 },
      { key: 'weight', term: 'weightKgB', def: 65, min: 10, max: 300 },
    ],
    formula: '{bmr} = 10×{weightKgB} + 6.25×{heightCm} − 5×{ageYears} + 5 (M) / −161 (F)',
    compute: v => {
      const bmr = mifflin(v.weight, v.height, v.age, v.sex >= 0.5);
      return [
        { term: 'bmr', unit: 'kcal', value: Math.round(bmr), digits: 0, primary: true },
        { term: 'tdee', unit: 'kcal', value: Math.round(bmr * 1.55), digits: 0 },
      ];
    },
    ko: { title: '기초대사량 계산기', desc: '가만히 누워만 있어도 쓰는 하루 최소 열량을 구합니다.',
      long: 'Mifflin-St Jeor 식은 체중·키·나이·성별로 기초대사량을 추정합니다. 오래 쓰인 Harris-Benedict 식보다 현대인에게 더 잘 맞습니다.',
      note: '아래 값은 보통 활동량(계수 1.55)을 가정한 하루 소모량입니다. 활동량은 다음 계산기에서 조절하세요.' },
    en: { title: 'BMR Calculator', desc: 'Find the minimum calories your body burns doing nothing at all.',
      long: 'The Mifflin-St Jeor equation estimates basal metabolic rate from weight, height, age and sex. It fits modern populations better than the older Harris-Benedict formula.',
      note: 'The second figure assumes moderate activity (factor 1.55) — adjust activity in the TDEE calculator.' },
  },
  {
    slug: 'bmr-katch',
    icon: '💪',
    category: '대사·칼로리',
    fields: [
      { key: 'lean', term: 'leanMass', unit: 'kg', def: 55, min: 5, max: 200, step: 0.5 },
    ],
    formula: '{bmr} = 370 + 21.6 × {leanMass}',
    compute: v => {
      const bmr = 370 + 21.6 * v.lean;
      return [
        { term: 'bmr', unit: 'kcal', value: Math.round(bmr), digits: 0, primary: true },
        { term: 'tdee', unit: 'kcal', value: Math.round(bmr * 1.55), digits: 0 },
      ];
    },
    ko: { title: '제지방량 기반 기초대사량', desc: '체지방률을 아는 사람에게 더 정확한 Katch-McArdle 식입니다.',
      long: '지방은 대사가 거의 없으므로, 제지방량만으로 계산하면 근육량이 많은 사람의 대사량을 과소평가하지 않습니다.',
      note: '체지방률 측정값이 있어야 의미가 있습니다. 모르면 Mifflin-St Jeor 식을 쓰세요.' },
    en: { title: 'BMR from Lean Mass', desc: 'The Katch-McArdle formula, more accurate when you know your body fat.',
      long: 'Fat tissue is nearly inert metabolically, so working from lean mass alone avoids underestimating people who carry a lot of muscle.',
      note: 'This only helps if you have a measured body fat percentage — otherwise use Mifflin-St Jeor.' },
  },
  {
    slug: 'tdee',
    icon: '🏃',
    category: '대사·칼로리',
    fields: [
      { key: 'bmr', term: 'bmr', unit: 'kcal', def: 1500, min: 500, max: 4000 },
      { key: 'activity', term: 'activity', def: 1.55, min: 1.2, max: 2.4, step: 0.05 },
    ],
    formula: '{tdee} = {bmr} × {activity}',
    compute: v => [
      { term: 'tdee', unit: 'kcal', value: Math.round(v.bmr * v.activity), digits: 0, primary: true },
      { term: 'deficit', unit: 'kcal', value: Math.round(v.bmr * v.activity - 500), digits: 0 },
    ],
    verdict: v => {
      const a = v.activity;
      const ko = a < 1.35 ? '거의 앉아서 생활' : a < 1.5 ? '주 1~3회 운동' : a < 1.7 ? '주 3~5회 운동' : a < 1.95 ? '주 6~7회 운동' : '하루 두 번 훈련';
      const en = a < 1.35 ? 'mostly sedentary' : a < 1.5 ? 'light exercise 1–3×/week' : a < 1.7 ? 'moderate 3–5×/week' : a < 1.95 ? 'hard 6–7×/week' : 'twice-daily training';
      return { ko: `활동계수 ${a}는 "${ko}" 수준입니다.`, en: `An activity factor of ${a} means ${en}.`, l10n: { es: `Un factor de actividad de ${a} significa ${a < 1.35 ? 'una vida casi sedentaria' : a < 1.5 ? 'ejercicio ligero 1–3 veces por semana' : a < 1.7 ? 'ejercicio moderado 3–5 veces por semana' : a < 1.95 ? 'ejercicio intenso 6–7 veces por semana' : 'dos entrenamientos al día'}.`, 'pt-br': `Um fator de atividade de ${a} significa ${a < 1.35 ? 'uma vida quase sedentária' : a < 1.5 ? 'exercício leve 1–3 vezes por semana' : a < 1.7 ? 'exercício moderado 3–5 vezes por semana' : a < 1.95 ? 'exercício pesado 6–7 vezes por semana' : 'dois treinos por dia'}.`, ja: `活動係数${a}は「${a < 1.35 ? 'ほとんど座って生活' : a < 1.5 ? '週1〜3回の運動' : a < 1.7 ? '週3〜5回の運動' : a < 1.95 ? '週6〜7回の運動' : '一日二回のトレーニング'}」の水準です。`, de: `Ein Aktivitätsfaktor von ${a} bedeutet ${a < 1.35 ? 'überwiegend sitzend' : a < 1.5 ? 'leichter Sport 1–3× pro Woche' : a < 1.7 ? 'mäßiger Sport 3–5× pro Woche' : a < 1.95 ? 'harter Sport 6–7× pro Woche' : 'zweimal tägliches Training'}.`, fr: `Un coefficient d’activité de ${a} correspond à ${a < 1.35 ? 'une vie surtout assise' : a < 1.5 ? 'du sport léger 1 à 3 fois par semaine' : a < 1.7 ? 'du sport modéré 3 à 5 fois par semaine' : a < 1.95 ? 'du sport intense 6 à 7 fois par semaine' : 'deux entraînements par jour'}.`, hi: `${a} का गतिविधि गुणक यानी ${a < 1.35 ? 'लगभग बैठे रहने वाली ज़िंदगी' : a < 1.5 ? 'हफ़्ते में 1–3 बार हल्की कसरत' : a < 1.7 ? 'हफ़्ते में 3–5 बार मध्यम कसरत' : a < 1.95 ? 'हफ़्ते में 6–7 बार कड़ी कसरत' : 'दिन में दो बार अभ्यास'}।` }, tone: 'good' };
    },
    ko: { title: '활동대사량(TDEE) 계산기', desc: '기초대사량에 활동계수를 곱해 하루 총 소모 칼로리를 구합니다.',
      long: '활동계수는 앉아서 생활하면 1.2, 주 3~5회 운동하면 1.55, 매일 훈련하면 1.9 정도를 씁니다. 아래 값은 하루 500kcal 적자 기준 섭취량입니다.',
      note: '활동계수는 어림값입니다. 2주간 체중이 변하지 않는 섭취량이 자신의 실제 TDEE입니다.' },
    en: { title: 'TDEE Calculator', desc: 'Multiply BMR by an activity factor for total daily calories burned.',
      long: 'Use about 1.2 if you sit all day, 1.55 for training 3–5 times a week, and 1.9 for daily hard training. The second figure is intake at a 500 kcal deficit.',
      note: 'Activity factors are rough. Your real TDEE is the intake at which your weight holds steady for two weeks.' },
  },
  {
    slug: 'calorie-deficit',
    icon: '📉',
    category: '대사·칼로리',
    fields: [
      { key: 'tdee', term: 'tdee', unit: 'kcal', def: 2300, min: 800, max: 6000 },
      { key: 'perWeek', term: 'targetWeight', unit: 'kg', def: 0.5, min: 0.1, max: 2, step: 0.1 },
    ],
    formula: '{deficit} = {targetWeight} × 7700 ÷ 7',
    compute: v => {
      // 지방 1kg ≈ 7,700kcal
      const daily = (v.perWeek * 7700) / 7;
      return [
        { term: 'calories', unit: 'kcal', value: Math.round(v.tdee - daily), digits: 0, primary: true },
        { term: 'deficit', unit: 'kcal', value: Math.round(daily), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const intake = out[0].value;
      const tooLow = intake < 1200;
      return {
        ko: tooLow ? `하루 ${intake}kcal는 너무 적습니다. 감량 속도를 늦추세요.` : `하루 ${intake}kcal를 먹으면 주 ${v.perWeek}kg 속도입니다.`,
        en: tooLow ? `${intake} kcal a day is too low — slow the target down.` : `Eating ${intake} kcal a day gives about ${v.perWeek} kg per week.`,
        l10n: { es: tooLow ? `${intake} kcal al día es demasiado poco: baja el ritmo del objetivo.` : `Comer ${intake} kcal al día da alrededor de ${v.perWeek} kg por semana.`, 'pt-br': tooLow ? `${intake} kcal por dia é pouco demais: diminua o ritmo da meta.` : `Comer ${intake} kcal por dia dá cerca de ${v.perWeek} kg por semana.`, ja: tooLow ? `一日${intake}kcalは少なすぎます。減量のペースを落としてください。` : `一日${intake}kcalなら週${v.perWeek}kgのペースになります。`, de: tooLow ? `${intake} kcal am Tag sind zu wenig — nimm das Tempo heraus.` : `${intake} kcal am Tag ergeben etwa ${v.perWeek} kg pro Woche.`, fr: tooLow ? `${intake} kcal par jour, c’est trop peu : ralentis l’objectif.` : `Manger ${intake} kcal par jour donne environ ${v.perWeek} kg par semaine.`, hi: tooLow ? `दिन में ${intake} kcal बहुत कम है — लक्ष्य की रफ़्तार घटा दें।` : `रोज़ ${intake} kcal खाने पर हफ़्ते में लगभग ${v.perWeek} किग्रा की रफ़्तार बनती है।` },
        tone: tooLow ? 'bad' : 'good',
      };
    },
    ko: { title: '감량 칼로리 계산기', desc: '원하는 감량 속도에 맞춰 하루 섭취 칼로리를 정합니다.',
      long: '체지방 1kg은 약 7,700kcal입니다. 주 0.5kg을 빼려면 하루 550kcal 적자가 필요합니다.',
      note: '성인 여성 1,200kcal, 남성 1,500kcal 아래로 내려가면 영양 결핍과 근손실 위험이 커집니다.' },
    en: { title: 'Calorie Deficit Calculator', desc: 'Set daily intake to match the rate of weight loss you want.',
      long: 'A kilogram of body fat holds roughly 7,700 kcal, so losing 0.5 kg a week needs a deficit of about 550 kcal a day.',
      note: 'Dropping below roughly 1,200 kcal for women or 1,500 for men risks nutrient shortfalls and muscle loss.' },
  },
  {
    slug: 'weight-loss-time',
    icon: '📅',
    category: '대사·칼로리',
    fields: [
      { key: 'now', term: 'weightKgB', def: 80, min: 10, max: 300 },
      { key: 'goal', term: 'targetWeight', unit: 'kg', def: 70, min: 10, max: 300 },
      { key: 'deficit', term: 'deficit', unit: 'kcal', def: 500, min: 100, max: 1500 },
    ],
    formula: '{weeksNeeded} = ({weightKgB} − {targetWeight}) × 7700 ÷ ({deficit} × 7)',
    compute: v => {
      const kg = Math.max(0, v.now - v.goal);
      const weeks = ratio(kg * 7700, v.deficit * 7);
      return [
        { term: 'weeksNeeded', unit: 'week', value: round(weeks, 1), digits: 1, primary: true },
        { term: 'diff', unit: 'kg', value: round(kg, 1), digits: 1 },
        { term: 'result', unit: 'month', value: round(weeks / 4.345, 1), digits: 1 },
      ];
    },
    ko: { title: '감량 기간 계산기', desc: '목표 체중까지 몇 주가 걸리는지 계산합니다.',
      long: '줄일 체중에 7,700kcal를 곱해 하루 적자로 나눈 값이 필요한 일수입니다. 하루 500kcal 적자로 10kg을 빼려면 22주쯤 걸립니다.',
      note: '체중이 줄면 기초대사량도 줄어 실제로는 후반부가 더 느려집니다. 계산값보다 여유를 두세요.' },
    en: { title: 'Weight Loss Timeline', desc: 'See how many weeks reaching your goal weight will take.',
      long: 'Multiply the kilos to lose by 7,700 kcal and divide by the daily deficit. Losing 10 kg at 500 kcal a day takes about 22 weeks.',
      note: 'BMR falls as you lose weight, so the later weeks run slower than the maths suggests — allow extra time.' },
  },
  {
    slug: 'protein-need',
    icon: '🥩',
    category: '대사·칼로리',
    fields: [
      { key: 'weight', term: 'weightKgB', def: 65, min: 10, max: 300 },
      { key: 'perKg', term: 'dosePerKg', def: 1.6, min: 0.5, max: 3, step: 0.1 },
    ],
    formula: '{proteinG} = {weightKgB} × {dosePerKg}',
    compute: v => {
      const g = v.weight * v.perKg;
      return [
        { term: 'proteinG', unit: 'gram', value: round(g, 1), digits: 1, primary: true },
        { term: 'calories', unit: 'kcal', value: Math.round(g * 4), digits: 0 },
        { term: 'perFeed', unit: 'gram', value: round(g / 3, 1), digits: 1 },
      ];
    },
    ko: { title: '단백질 권장량 계산기', desc: '체중 1kg당 목표량으로 하루 단백질 섭취량을 구합니다.',
      long: '일반 성인은 체중 1kg당 0.8~1g, 근력 운동을 하면 1.6~2.2g을 권합니다. 한 번에 흡수되는 양에 한계가 있어 세 끼로 나눈 양도 함께 보여줍니다.',
      note: '신장 질환이 있으면 단백질 섭취를 제한해야 할 수 있습니다. 의료진과 상의하세요.' },
    en: { title: 'Protein Requirement', desc: 'Work out daily protein from a target per kilogram of body weight.',
      long: 'Sedentary adults are advised 0.8–1 g per kg; people doing resistance training aim for 1.6–2.2 g. Since absorption per meal is limited, the per-meal share is shown too.',
      note: 'Kidney disease can require restricting protein — check with your clinician before raising intake.' },
  },
  {
    slug: 'water-need',
    icon: '💧',
    category: '대사·칼로리',
    fields: [
      { key: 'weight', term: 'weightKgB', def: 65, min: 10, max: 300 },
      { key: 'minutes', term: 'minutes', def: 30, min: 0, max: 300 },
    ],
    formula: '{waterMl} = {weightKgB} × 33 + {minutes} × 12',
    compute: v => {
      const base = v.weight * 33;
      const extra = v.minutes * 12;
      return [
        { term: 'waterMl', unit: 'ml', value: Math.round(base + extra), digits: 0, primary: true },
        { term: 'result', unit: 'ml', value: Math.round(base), digits: 0 },
        { term: 'count', value: Math.round((base + extra) / 250), digits: 0 },
      ];
    },
    ko: { title: '하루 물 섭취량 계산기', desc: '체중과 운동 시간으로 권장 수분량을 구합니다.',
      long: '체중 1kg당 30~35ml가 통상 권장량이고, 운동 30분마다 350ml 정도를 더 마십니다. 250ml 컵으로 몇 잔인지도 함께 보여줍니다.',
      note: '음식과 국에도 수분이 들어 있어 실제로 마셔야 할 양은 이보다 적습니다. 심장·신장 질환이 있으면 제한이 필요합니다.' },
    en: { title: 'Daily Water Intake', desc: 'Estimate how much water to drink from body weight and exercise time.',
      long: 'The usual guide is 30–35 mL per kilogram, plus roughly 350 mL for every 30 minutes of exercise. The count of 250 mL glasses is shown as well.',
      note: 'Food and soup contribute water too, so you need to drink less than this. Heart or kidney conditions may require limits.' },
  },
  {
    slug: 'macro-split',
    icon: '🥗',
    category: '대사·칼로리',
    fields: [
      { key: 'calories', term: 'calories', unit: 'kcal', def: 2000, min: 500, max: 6000 },
      { key: 'carbPct', term: 'percentA', unit: 'percent', def: 45, min: 0, max: 100 },
      { key: 'proteinPct', term: 'percentB', unit: 'percent', def: 30, min: 0, max: 100 },
    ],
    formula: '{carbG} = {calories} × {percentA} ÷ 100 ÷ 4,  {fatG} = {calories} × (100 − {percentA} − {percentB}) ÷ 100 ÷ 9',
    compute: v => {
      const fatPct = Math.max(0, 100 - v.carbPct - v.proteinPct);
      return [
        { term: 'carbG', unit: 'gram', value: Math.round((v.calories * v.carbPct) / 100 / 4), digits: 0, primary: true },
        { term: 'proteinG', unit: 'gram', value: Math.round((v.calories * v.proteinPct) / 100 / 4), digits: 0 },
        { term: 'fatG', unit: 'gram', value: Math.round((v.calories * fatPct) / 100 / 9), digits: 0 },
      ];
    },
    verdict: v => {
      const fatPct = 100 - v.carbPct - v.proteinPct;
      return fatPct < 15 ? {
        ko: `지방 비율이 ${Math.max(0, fatPct)}%로 너무 낮습니다. 호르몬 합성에 지방이 필요합니다.`,
        en: `Fat is only ${Math.max(0, fatPct)}% — too low; the body needs fat for hormone synthesis.`,
        l10n: { es: `La grasa se queda en el ${Math.max(0, fatPct)} %: demasiado poco; el cuerpo necesita grasa para fabricar hormonas.`, 'pt-br': `A gordura fica em ${Math.max(0, fatPct)} %: pouco demais; o corpo precisa de gordura para produzir hormônios.`, ja: `脂質が${Math.max(0, fatPct)}%しかなく、低すぎます。ホルモンの合成には脂質が必要です。`, de: `Fett liegt bei nur ${Math.max(0, fatPct)} % — zu wenig; der Körper braucht Fett, um Hormone zu bilden.`, fr: `Les lipides ne font que ${Math.max(0, fatPct)} % : trop peu ; le corps a besoin de gras pour fabriquer ses hormones.`, hi: `वसा सिर्फ़ ${Math.max(0, fatPct)}% है — यह बहुत कम है; हार्मोन बनाने के लिए शरीर को वसा चाहिए।` },
        tone: 'bad',
      } : null;
    },
    ko: { title: '탄단지 비율 계산기', desc: '하루 칼로리를 탄수화물·단백질·지방 그램으로 나눕니다.',
      long: '탄수화물과 단백질은 1g에 4kcal, 지방은 9kcal입니다. 비율을 정하면 각각 몇 그램인지 나옵니다.',
      note: '지방 비율은 최소 20% 이상 두는 것이 일반적입니다. 지방은 호르몬 합성과 지용성 비타민 흡수에 필요합니다.' },
    en: { title: 'Macro Split Calculator', desc: 'Turn a daily calorie target into grams of carbs, protein and fat.',
      long: 'Carbs and protein give 4 kcal per gram, fat gives 9. Choose the percentages and this converts them to grams.',
      note: 'Most guidance keeps fat at 20% or more — it is needed for hormone synthesis and fat-soluble vitamin absorption.' },
  },
  {
    slug: 'met-calories',
    icon: '🏋️',
    category: '대사·칼로리',
    fields: [
      { key: 'met', term: 'metValue', def: 6, min: 1, max: 20, step: 0.5 },
      { key: 'weight', term: 'weightKgB', def: 65, min: 10, max: 300 },
      { key: 'minutes', term: 'minutes', def: 40, min: 1, max: 600 },
    ],
    formula: '{calories} = {metValue} × 3.5 × {weightKgB} ÷ 200 × {minutes}',
    compute: v => {
      const kcal = ((v.met * 3.5 * v.weight) / 200) * v.minutes;
      return [
        { term: 'calories', unit: 'kcal', value: Math.round(kcal), digits: 0, primary: true },
        { term: 'result', unit: 'kcal', value: round(kcal / v.minutes, 1), digits: 1 },
      ];
    },
    ko: { title: 'MET 운동 소모 칼로리', desc: '운동 강도(MET)와 시간으로 소모 칼로리를 구합니다.',
      long: 'MET은 가만히 있을 때의 몇 배로 에너지를 쓰는지 나타냅니다. 걷기 3.5, 조깅 7, 자전거 8, 수영 8~10 정도입니다.',
      note: '기초대사량이 포함된 총 소모량입니다. "운동으로 추가로 태운 양"은 여기서 안정 시 소모량을 빼야 합니다.' },
    en: { title: 'MET Calorie Burn', desc: 'Calculate calories burned from exercise intensity (MET) and duration.',
      long: 'A MET is a multiple of your resting energy use: walking is about 3.5, jogging 7, cycling 8, swimming 8–10.',
      note: 'This is total expenditure including your resting rate — subtract resting burn to get the extra from exercise alone.' },
  },
  {
    slug: 'walk-calories',
    icon: '👟',
    category: '대사·칼로리',
    fields: [
      { key: 'steps', term: 'steps', unit: 'step', def: 10000, min: 100, max: 100000 },
      { key: 'weight', term: 'weightKgB', def: 65, min: 10, max: 300 },
      { key: 'stride', term: 'strideCm', def: 70, min: 30, max: 120 },
    ],
    formula: '{distanceKm} = {steps} × {strideCm} ÷ 100000,  {calories} ≈ {distanceKm} × {weightKgB} × 0.75',
    compute: v => {
      const km = (v.steps * v.stride) / 100000;
      return [
        { term: 'calories', unit: 'kcal', value: Math.round(km * v.weight * 0.75), digits: 0, primary: true },
        { term: 'distanceKm', unit: 'km', value: round(km, 2), digits: 2 },
        { term: 'minutes', value: Math.round((km / 4.8) * 60), digits: 0 },
      ];
    },
    ko: { title: '걸음 수 칼로리 계산기', desc: '걸음 수와 보폭으로 걸은 거리와 소모 칼로리를 구합니다.',
      long: '걷기는 체중 1kg당 1km에 약 0.75kcal를 씁니다. 보폭은 키의 0.4배 정도이고, 만 보는 보통 6~7km입니다.',
      note: '스마트폰 만보기는 보폭을 평균값으로 잡아 오차가 있습니다. 실제 거리를 알면 그 값으로 보폭을 역산하세요.' },
    en: { title: 'Steps to Calories', desc: 'Convert step count and stride into distance walked and calories burned.',
      long: 'Walking costs roughly 0.75 kcal per kilogram per kilometre. Stride is about 0.4× your height, so 10,000 steps is usually 6–7 km.',
      note: 'Phone pedometers assume an average stride, so they drift. If you know a real distance, back-calculate your stride from it.' },
  },
];
