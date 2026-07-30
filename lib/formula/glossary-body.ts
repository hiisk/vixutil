/**
 * 몸 수치 둘째 묶음 용어의 뜻풀이(3언어).
 *
 * 입력·결과 표에서 라벨 아래 한 줄로 붙는다. 검사 수치는 이름만 봐서는 뭘
 * 재는지 알 수 없는 것이 많아서, 여기 적어 두면 결과지를 읽는 데 바로 쓰인다.
 */
import type { Lang, Term } from './terms.ts';

export const BODY2_DESC: Record<string, Term> = {
  /* 체중·체형 */
  bmiPrime: { ko: 'BMI를 과체중 기준선으로 나눈 값. 1이 문턱입니다.', en: 'BMI divided by the overweight cut-off; one is the line.' },
  weightLow: { ko: 'BMI 18.5에 해당하는 체중. 이보다 적으면 저체중입니다.', en: 'The weight at BMI 18.5; below it counts as underweight.' },
  weightHigh: { ko: 'BMI 24.9에 해당하는 체중. 이보다 많으면 과체중입니다.', en: 'The weight at BMI 24.9; above it counts as overweight.' },
  waistTarget: { ko: '키의 절반. 허리둘레가 이 값을 넘지 않는 것을 목표로 봅니다.', en: 'Half your height — the ceiling your waist should stay under.' },
  ffmi: { ko: '지방을 뺀 무게를 키로 나눈 지수. 근육량 수준을 봅니다.', en: 'Fat-free weight over height squared — a muscle index.' },
  chestCm: { ko: '가슴의 가장 굵은 곳 둘레. 겨드랑이 바로 아래에서 잽니다.', en: 'Chest at its widest, measured just under the armpits.' },
  wristCm: { ko: '손목의 가장 얇은 곳 둘레. 지방이 거의 없어 뼈대를 잘 나타냅니다.', en: 'The narrowest point of the wrist; almost no fat, so it reflects frame.' },
  frameIndex: { ko: '키를 손목둘레로 나눈 값. 클수록 뼈대가 가늡니다.', en: 'Height over wrist circumference; larger means a finer frame.' },
  smi: { ko: '팔다리 근육량을 키의 제곱으로 나눈 값. 근육 부족을 봅니다.', en: 'Limb muscle over height squared — used to spot muscle shortfall.' },
  brocaWeight: { ko: '키에서 100을 뺀 뒤 계수를 곱한 표준체중.', en: 'Height minus 100, times a factor — the classic reference weight.' },
  weightBefore: { ko: '변화를 재기 시작한 시점의 체중.', en: 'Your weight when the comparison starts.' },
  weightNow: { ko: '지금 재 본 체중. 같은 시간·같은 옷차림으로 재야 비교됩니다.', en: 'Today’s weight; measure at the same time and dress for comparison.' },
  shapeRatio: { ko: '허리를 가슴으로 나눈 값. 작을수록 허리가 들어간 체형입니다.', en: 'Waist over chest; smaller means a more defined waist.' },

  /* 대사·칼로리 */
  bmrMifflin: { ko: '가만히 있어도 하루에 쓰는 최소 열량.', en: 'The calories you burn in a day at complete rest.' },
  surplus: { ko: '쓰는 것보다 더 먹는 하루치 열량. 증량의 연료입니다.', en: 'The daily calories you eat beyond what you burn — the fuel for gaining.' },
  gainPerWeek: { ko: '그 잉여를 유지할 때 한 주에 늘어나는 무게.', en: 'The weight gained in a week if that surplus holds.' },
  lossPerWeek: { ko: '한 주에 빼려는 무게. 0.5~1kg이 지키기 쉬운 범위입니다.', en: 'The weight you aim to lose weekly; 0.5–1 kg is sustainable.' },
  needDeficit: { ko: '그 속도를 만들기 위해 하루에 줄여야 하는 열량.', en: 'The daily calorie cut that pace requires.' },
  foodKcal: { ko: '먹은 음식의 열량. 영양표시나 앱에서 확인한 값을 넣습니다.', en: 'The calories in what you ate; take it from a label or an app.' },
  burnMinutes: { ko: '그 열량을 운동으로 태우는 데 걸리는 시간.', en: 'How long it takes to burn that off with exercise.' },
  kcalPerKg: { ko: '체중 1kg마다 쓰는 열량. 대사가 얼마나 활발한지 봅니다.', en: 'Calories burned per kilogram — how briskly your metabolism runs.' },
  gPerKg: { ko: '체중 1kg마다 먹을 그램 수. 단백질에 흔히 쓰는 기준입니다.', en: 'Grams per kilogram of body weight — the usual protein yardstick.' },
  mgPerKg: { ko: '체중 1kg마다의 밀리그램. 약과 카페인 상한에 씁니다.', en: 'Milligrams per kilogram — used for drugs and caffeine ceilings.' },
  fiberPerMeal: { ko: '한 끼에 나눠 먹을 식이섬유 양.', en: 'Fibre to take at a single meal.' },
  mealsPerDay: { ko: '하루에 나눠 먹는 끼니 수. 간식도 한 끼로 셉니다.', en: 'How many eating occasions a day; count snacks too.' },
  proteinPerMeal: { ko: '한 끼에 먹을 단백질. 20~40g에서 근육 합성이 잘 돕니다.', en: 'Protein per meal; 20–40 g drives muscle synthesis best.' },
  fiberG: { ko: '하루에 먹을 식이섬유. 열량 1,000kcal마다 14g이 기준입니다.', en: 'Daily fibre; the reference is 14 g per 1,000 kcal.' },
  sugarLimitG: { ko: '하루에 넘지 않을 첨가당의 양.', en: 'The daily added-sugar figure to stay under.' },
  sodiumMg: { ko: '영양표시에 적힌 나트륨의 양.', en: 'The sodium figure printed on a label.' },
  saltG: { ko: '그 나트륨에 해당하는 소금의 무게. 나트륨보다 2.54배 무겁습니다.', en: 'The salt that sodium corresponds to — 2.54 times heavier.' },
  caffeineLimit: { ko: '하루에 넘지 않을 카페인의 양. 성인은 400mg에서 멈춥니다.', en: 'The daily caffeine ceiling; for adults it stops at 400 mg.' },
  coffeeCups: { ko: '그 상한을 지금 잔 기준으로 환산한 잔 수.', en: 'That ceiling expressed in cups of the strength you entered.' },

  /* 심장·운동 */
  karvonenLow: { ko: '목표 구간의 아래쪽 비율. 여유 심박수에 곱합니다.', en: 'The lower percentage of the target zone, applied to heart-rate reserve.' },
  karvonenHigh: { ko: '목표 구간의 위쪽 비율.', en: 'The upper percentage of the target zone.' },
  peakHr: { ko: '운동을 멈춘 바로 그 순간의 심박수.', en: 'Your pulse at the instant you stopped.' },
  hr1min: { ko: '멈춘 뒤 1분이 지났을 때의 심박수.', en: 'Your pulse one minute after stopping.' },
  hrDrop: { ko: '1분 동안 떨어진 심박수. 클수록 회복이 빠릅니다.', en: 'How far the pulse fell in that minute; larger is fitter.' },
  metFromVo2: { ko: '낼 수 있는 최대 운동 강도를 MET로 나타낸 값.', en: 'Your top exercise intensity expressed in METs.' },
  wheelCm: { ko: '바퀴가 한 바퀴 돌 때 나아가는 거리.', en: 'How far the wheel travels in one full turn.' },
  cadence: { ko: '1분에 페달을 몇 바퀴 돌리는지.', en: 'Pedal revolutions per minute.' },
  gearRatio: { ko: '앞 기어 잇수를 뒤 기어 잇수로 나눈 값.', en: 'Front chainring teeth divided by rear sprocket teeth.' },
  rowMeters: { ko: '노를 저어 간 거리. 실내 로잉머신의 표시 거리를 씁니다.', en: 'The distance rowed, as shown on the ergometer.' },
  rowSeconds: { ko: '그 거리를 가는 데 걸린 시간.', en: 'The time taken to cover it.' },
  split500: { ko: '500m를 가는 데 걸리는 시간. 작을수록 빠릅니다.', en: 'The time to cover 500 m; lower is faster.' },
  sets: { ko: '같은 동작을 쉬어 가며 반복한 묶음의 수.', en: 'How many groups of reps you did, with rest between.' },
  volumeKg: { ko: '무게 × 횟수 × 세트. 근육이 받은 일의 총량입니다.', en: 'Weight × reps × sets — the total work the muscle did.' },
  rpe: { ko: '얼마나 힘들었는지 스스로 매긴 값. 10이 더는 못 드는 상태입니다.', en: 'How hard it felt, self-rated; 10 means nothing left.' },
  rmPercent: { ko: '그 무게가 1RM의 몇 %인지.', en: 'What share of your one-rep max that weight is.' },
  halfMin: { ko: '하프마라톤 21.0975km를 완주한 시간.', en: 'Your finish time over the 21.0975 km half marathon.' },
  fullPredict: { ko: '같은 체력으로 42.195km를 달렸을 때의 예상 시간.', en: 'Predicted time over 42.195 km at the same fitness.' },

  /* 아이·성장 */
  childWater: { ko: '아이가 하루에 필요한 수분. 음식에 든 물을 포함합니다.', en: 'A child’s daily fluid need, water in food included.' },
  fluidPerKg: { ko: '체중 1kg마다 필요한 수분. 작은 아이일수록 큽니다.', en: 'Fluid needed per kilogram; smaller children need more.' },
  fluidPerHour: { ko: '하루 요구량을 24로 나눈 시간당 양.', en: 'The daily need spread across 24 hours.' },
  childKcal: { ko: '아이가 하루에 필요한 열량. 자라면서 체중당 값이 줄어듭니다.', en: 'A child’s daily calories; the per-kilogram figure falls with age.' },
  heightBefore: { ko: '지난번에 잰 키. 성장 속도의 출발점이 됩니다.', en: 'The height measured last time — the starting point for velocity.' },
  heightNow: { ko: '이번에 잰 키. 같은 시간대에 재야 비교됩니다.', en: 'The height measured now; measure at the same time of day.' },
  monthsGap: { ko: '두 측정 사이에 지난 개월 수.', en: 'How many months passed between measurements.' },
  growthVelocity: { ko: '1년에 자라는 키. 절대 키보다 이 속도가 중요합니다.', en: 'Centimetres a year; this speed matters more than absolute height.' },
  formulaPerKg: { ko: '체중 1kg마다 하루에 먹이는 분유량.', en: 'Formula given per kilogram of body weight, per day.' },
  feverDose: { ko: '체중에 맞춘 1회 용량. 나이가 아니라 무게로 정합니다.', en: 'One dose scaled to weight — not to age.' },
  maxDaily: { ko: '하루에 넘지 않아야 하는 총량.', en: 'The total not to exceed in a day.' },
  birthWeeks: { ko: '태어났을 때의 임신 주수. 40주를 만삭으로 봅니다.', en: 'Gestational age at birth; 40 weeks is full term.' },
  ageWeeks: { ko: '태어난 뒤 지난 주 수.', en: 'How many weeks since birth.' },
  correctedAge: { ko: '이르게 태어난 만큼을 뺀 나이. 발달은 이 나이로 봅니다.', en: 'Age with the missed weeks removed; read development against this.' },

  /* 건강 지표 */
  creatinine: { ko: '근육이 쓰고 남긴 물질. 신장이 걸러 내므로 신장 기능 지표가 됩니다.', en: 'A muscle waste product the kidneys clear, which makes it a kidney marker.' },
  egfr: { ko: '신장이 1분에 걸러 내는 양을 추정한 값. 90 이상이 정상입니다.', en: 'Estimated millilitres filtered per minute; 90 or above is normal.' },
  crcl: { ko: '체중을 반영한 신장 청소율. 약 용량을 정할 때 씁니다.', en: 'Kidney clearance including weight, used for drug dosing.' },
  tgHdl: { ko: '중성지방을 HDL로 나눈 값. 2 아래를 목표로 봅니다.', en: 'Triglycerides over HDL; under 2 is the target.' },
  quicki: { ko: '인슐린이 잘 듣는지 보는 지수. 클수록 좋습니다.', en: 'An index of insulin sensitivity; higher is better.' },
  tygIndex: { ko: '중성지방과 혈당만으로 인슐린 저항성을 가늠하는 지수.', en: 'Insulin resistance gauged from triglycerides and glucose alone.' },
  ast: { ko: '간과 근육에 있는 효소. 세포가 상하면 피로 나옵니다.', en: 'An enzyme in liver and muscle; it leaks into blood when cells are damaged.' },
  alt: { ko: '주로 간에 있는 효소. AST보다 간에 특이적입니다.', en: 'An enzyme mostly in the liver — more liver-specific than AST.' },
  platelet: { ko: '피를 굳게 하는 세포. 간이 굳으면 수가 줄어듭니다.', en: 'The clotting cells; the count falls as the liver stiffens.' },
  fib4: { ko: '간 섬유화 가능성을 가리는 지수. 낮으면 진행된 섬유화가 드뭅니다.', en: 'A fibrosis screen; low values largely rule out advanced disease.' },
  remnantChol: { ko: '총콜레스테롤에서 HDL과 LDL을 뺀 나머지. LDL 검사에 안 나옵니다.', en: 'What is left after HDL and LDL — an LDL test does not see it.' },
  a1cIfcc: { ko: '당화혈색소를 mmol/mol로 나타낸 값. 유럽에서 씁니다.', en: 'HbA1c in mmol/mol, the unit used across Europe.' },
  crclPerKg: { ko: '청소율을 체중으로 나눈 값. 체격 차이를 지웁니다.', en: 'Clearance divided by weight, which removes body-size differences.' },

  /* 생활 대사 */
  sleepNeed: { ko: '개인에게 필요한 수면 시간. 성인은 대개 7~9시간입니다.', en: 'The sleep you personally need; most adults land at 7–9 hours.' },
  sleepActual: { ko: '실제로 잠든 시간. 눕는 시간과는 다릅니다.', en: 'Time actually asleep, not time in bed.' },
  sleepDebt: { ko: '며칠 동안 쌓인 부족한 수면의 합.', en: 'The shortfall accumulated across those days.' },
  timezoneGap: { ko: '출발지와 도착지의 시각 차이.', en: 'The clock difference between departure and arrival.' },
  goEast: { ko: '이동 방향. 동쪽 1, 서쪽 0으로 넣습니다.', en: 'Direction of travel — enter 1 for east, 0 for west.' },
  adaptDays: { ko: '몸속 시계가 도착지 시각에 맞기까지 걸리는 날.', en: 'Days until the body clock lines up with local time.' },
  standardDrinks: { ko: '순알코올 10g을 한 잔으로 세었을 때의 잔 수.', en: 'Drinks counted at 10 g of pure alcohol each.' },
  pureAlcoholG: { ko: '마신 술에 든 알코올의 무게. 부피에 0.789를 곱합니다.', en: 'The weight of alcohol you drank — volume times 0.789.' },
  cigsPerDay: { ko: '하루에 피우는 담배 개비 수. 한 갑은 20개비입니다.', en: 'Cigarettes smoked a day; a pack is twenty.' },
  smokeYears: { ko: '그 양으로 피운 기간.', en: 'How many years you smoked at that rate.' },
  packYears: { ko: '하루 한 갑 1년을 1로 센 누적 흡연량.', en: 'Cumulative exposure, where one is a pack a day for a year.' },
  weightLoss: { ko: '운동 전후 줄어든 체중. 거의 전부 물입니다.', en: 'Weight lost across the session — almost entirely water.' },
  drankMl: { ko: '운동 중에 마신 물의 양.', en: 'Fluid you drank during the session.' },
  sweatRate: { ko: '시간당 빠져나간 수분. 이 속도에 맞춰 마셔야 합니다.', en: 'Fluid lost per hour; drink to match this rate.' },
  alcoholKcal: { ko: '알코올에서 나오는 열량. 1g에 7kcal입니다.', en: 'Energy from the alcohol itself, at 7 kcal a gram.' },
};

export const body2Desc = (key: string, lang: Lang): string | null => BODY2_DESC[key]?.[lang] ?? null;
