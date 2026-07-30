/**
 * 몸 수치 둘째 묶음 용어의 뜻풀이(3언어).
 *
 * 입력·결과 표에서 라벨 아래 한 줄로 붙는다. 검사 수치는 이름만 봐서는 뭘
 * 재는지 알 수 없는 것이 많아서, 여기 적어 두면 결과지를 읽는 데 바로 쓰인다.
 */
import type { Lang, Term } from './terms.ts';

export const BODY2_DESC: Record<string, Term> = {
  /* 체중·체형 */
  bmiPrime: { ko: 'BMI를 과체중 기준선으로 나눈 값. 1이 문턱입니다.', en: 'BMI divided by the overweight cut-off; one is the line.', zh: 'BMI除以超重界值，1即为分界线。' },
  weightLow: { ko: 'BMI 18.5에 해당하는 체중. 이보다 적으면 저체중입니다.', en: 'The weight at BMI 18.5; below it counts as underweight.', zh: '对应BMI 18.5的体重，低于此为体重不足。' },
  weightHigh: { ko: 'BMI 24.9에 해당하는 체중. 이보다 많으면 과체중입니다.', en: 'The weight at BMI 24.9; above it counts as overweight.', zh: '对应BMI 24.9的体重，高于此为超重。' },
  waistTarget: { ko: '키의 절반. 허리둘레가 이 값을 넘지 않는 것을 목표로 봅니다.', en: 'Half your height — the ceiling your waist should stay under.', zh: '身高的一半，腰围应保持在此值以下。' },
  ffmi: { ko: '지방을 뺀 무게를 키로 나눈 지수. 근육량 수준을 봅니다.', en: 'Fat-free weight over height squared — a muscle index.', zh: '去脂体重除以身高平方，反映肌肉量水平。' },
  chestCm: { ko: '가슴의 가장 굵은 곳 둘레. 겨드랑이 바로 아래에서 잽니다.', en: 'Chest at its widest, measured just under the armpits.', zh: '胸部最宽处的周长，在腋下位置测量。' },
  wristCm: { ko: '손목의 가장 얇은 곳 둘레. 지방이 거의 없어 뼈대를 잘 나타냅니다.', en: 'The narrowest point of the wrist; almost no fat, so it reflects frame.', zh: '腕部最细处的周长；几乎无脂肪，能反映骨架。' },
  frameIndex: { ko: '키를 손목둘레로 나눈 값. 클수록 뼈대가 가늡니다.', en: 'Height over wrist circumference; larger means a finer frame.', zh: '身高除以腕围，数值越大骨架越细。' },
  smi: { ko: '팔다리 근육량을 키의 제곱으로 나눈 값. 근육 부족을 봅니다.', en: 'Limb muscle over height squared — used to spot muscle shortfall.', zh: '四肢肌肉量除以身高平方，用于发现肌肉不足。' },
  brocaWeight: { ko: '키에서 100을 뺀 뒤 계수를 곱한 표준체중.', en: 'Height minus 100, times a factor — the classic reference weight.', zh: '身高减100再乘系数得到的标准体重。' },
  weightBefore: { ko: '변화를 재기 시작한 시점의 체중.', en: 'Your weight when the comparison starts.', zh: '开始比较时的体重。' },
  weightNow: { ko: '지금 재 본 체중. 같은 시간·같은 옷차림으로 재야 비교됩니다.', en: 'Today’s weight; measure at the same time and dress for comparison.', zh: '当前体重；应在相同时间、相同着装下测量以便比较。' },
  shapeRatio: { ko: '허리를 가슴으로 나눈 값. 작을수록 허리가 들어간 체형입니다.', en: 'Waist over chest; smaller means a more defined waist.', zh: '腰围除以胸围，数值越小腰线越明显。' },

  /* 대사·칼로리 */
  bmrMifflin: { ko: '가만히 있어도 하루에 쓰는 최소 열량.', en: 'The calories you burn in a day at complete rest.', zh: '完全静息状态下一天消耗的最低热量。' },
  surplus: { ko: '쓰는 것보다 더 먹는 하루치 열량. 증량의 연료입니다.', en: 'The daily calories you eat beyond what you burn — the fuel for gaining.', zh: '每天摄入超过消耗的热量，是增重的燃料。' },
  gainPerWeek: { ko: '그 잉여를 유지할 때 한 주에 늘어나는 무게.', en: 'The weight gained in a week if that surplus holds.', zh: '维持该盈余时每周增加的体重。' },
  lossPerWeek: { ko: '한 주에 빼려는 무게. 0.5~1kg이 지키기 쉬운 범위입니다.', en: 'The weight you aim to lose weekly; 0.5–1 kg is sustainable.', zh: '每周想减掉的体重，0.5至1公斤较易坚持。' },
  needDeficit: { ko: '그 속도를 만들기 위해 하루에 줄여야 하는 열량.', en: 'The daily calorie cut that pace requires.', zh: '达到该速度每天需削减的热量。' },
  foodKcal: { ko: '먹은 음식의 열량. 영양표시나 앱에서 확인한 값을 넣습니다.', en: 'The calories in what you ate; take it from a label or an app.', zh: '所吃食物的热量，可取自营养标签或应用记录。' },
  burnMinutes: { ko: '그 열량을 운동으로 태우는 데 걸리는 시간.', en: 'How long it takes to burn that off with exercise.', zh: '通过运动消耗掉该热量所需的时间。' },
  kcalPerKg: { ko: '체중 1kg마다 쓰는 열량. 대사가 얼마나 활발한지 봅니다.', en: 'Calories burned per kilogram — how briskly your metabolism runs.', zh: '每公斤体重的耗能，反映代谢活跃程度。' },
  gPerKg: { ko: '체중 1kg마다 먹을 그램 수. 단백질에 흔히 쓰는 기준입니다.', en: 'Grams per kilogram of body weight — the usual protein yardstick.', zh: '每公斤体重的克数，常用于蛋白质标准。' },
  mgPerKg: { ko: '체중 1kg마다의 밀리그램. 약과 카페인 상한에 씁니다.', en: 'Milligrams per kilogram — used for drugs and caffeine ceilings.', zh: '每公斤体重的毫克数，用于药物与咖啡因上限。' },
  fiberPerMeal: { ko: '한 끼에 나눠 먹을 식이섬유 양.', en: 'Fibre to take at a single meal.', zh: '每餐应摄入的膳食纤维量。' },
  mealsPerDay: { ko: '하루에 나눠 먹는 끼니 수. 간식도 한 끼로 셉니다.', en: 'How many eating occasions a day; count snacks too.', zh: '一天分几次进食，零食也算一次。' },
  proteinPerMeal: { ko: '한 끼에 먹을 단백질. 20~40g에서 근육 합성이 잘 돕니다.', en: 'Protein per meal; 20–40 g drives muscle synthesis best.', zh: '每餐蛋白质，20至40克最利于肌肉合成。' },
  fiberG: { ko: '하루에 먹을 식이섬유. 열량 1,000kcal마다 14g이 기준입니다.', en: 'Daily fibre; the reference is 14 g per 1,000 kcal.', zh: '每日膳食纤维，标准为每1000千卡14克。' },
  sugarLimitG: { ko: '하루에 넘지 않을 첨가당의 양.', en: 'The daily added-sugar figure to stay under.', zh: '每天不应超过的添加糖量。' },
  sodiumMg: { ko: '영양표시에 적힌 나트륨의 양.', en: 'The sodium figure printed on a label.', zh: '营养标签上标示的钠含量。' },
  saltG: { ko: '그 나트륨에 해당하는 소금의 무게. 나트륨보다 2.54배 무겁습니다.', en: 'The salt that sodium corresponds to — 2.54 times heavier.', zh: '该钠量对应的盐重，是钠的2.54倍。' },
  caffeineLimit: { ko: '하루에 넘지 않을 카페인의 양. 성인은 400mg에서 멈춥니다.', en: 'The daily caffeine ceiling; for adults it stops at 400 mg.', zh: '每日咖啡因上限，成人以400毫克为止。' },
  coffeeCups: { ko: '그 상한을 지금 잔 기준으로 환산한 잔 수.', en: 'That ceiling expressed in cups of the strength you entered.', zh: '按所填单杯含量换算出的杯数。' },

  /* 심장·운동 */
  karvonenLow: { ko: '목표 구간의 아래쪽 비율. 여유 심박수에 곱합니다.', en: 'The lower percentage of the target zone, applied to heart-rate reserve.', zh: '目标区间的下限百分比，作用于心率储备。' },
  karvonenHigh: { ko: '목표 구간의 위쪽 비율.', en: 'The upper percentage of the target zone.', zh: '目标区间的上限百分比。' },
  peakHr: { ko: '운동을 멈춘 바로 그 순간의 심박수.', en: 'Your pulse at the instant you stopped.', zh: '停止运动瞬间的心率。' },
  hr1min: { ko: '멈춘 뒤 1분이 지났을 때의 심박수.', en: 'Your pulse one minute after stopping.', zh: '停止运动一分钟后的心率。' },
  hrDrop: { ko: '1분 동안 떨어진 심박수. 클수록 회복이 빠릅니다.', en: 'How far the pulse fell in that minute; larger is fitter.', zh: '一分钟内心率的下降幅度，越大恢复越快。' },
  metFromVo2: { ko: '낼 수 있는 최대 운동 강도를 MET로 나타낸 값.', en: 'Your top exercise intensity expressed in METs.', zh: '以MET表示的最大运动强度。' },
  wheelCm: { ko: '바퀴가 한 바퀴 돌 때 나아가는 거리.', en: 'How far the wheel travels in one full turn.', zh: '车轮转一圈前进的距离。' },
  cadence: { ko: '1분에 페달을 몇 바퀴 돌리는지.', en: 'Pedal revolutions per minute.', zh: '每分钟踏板转动的圈数。' },
  gearRatio: { ko: '앞 기어 잇수를 뒤 기어 잇수로 나눈 값.', en: 'Front chainring teeth divided by rear sprocket teeth.', zh: '前齿盘齿数除以后飞轮齿数。' },
  rowMeters: { ko: '노를 저어 간 거리. 실내 로잉머신의 표시 거리를 씁니다.', en: 'The distance rowed, as shown on the ergometer.', zh: '划行的距离，使用划船机显示的数值。' },
  rowSeconds: { ko: '그 거리를 가는 데 걸린 시간.', en: 'The time taken to cover it.', zh: '完成该距离所用的时间。' },
  split500: { ko: '500m를 가는 데 걸리는 시간. 작을수록 빠릅니다.', en: 'The time to cover 500 m; lower is faster.', zh: '完成500米所需时间，越小越快。' },
  sets: { ko: '같은 동작을 쉬어 가며 반복한 묶음의 수.', en: 'How many groups of reps you did, with rest between.', zh: '同一动作分组重复的组数。' },
  volumeKg: { ko: '무게 × 횟수 × 세트. 근육이 받은 일의 총량입니다.', en: 'Weight × reps × sets — the total work the muscle did.', zh: '重量×次数×组数，即肌肉完成的总功。' },
  rpe: { ko: '얼마나 힘들었는지 스스로 매긴 값. 10이 더는 못 드는 상태입니다.', en: 'How hard it felt, self-rated; 10 means nothing left.', zh: '自评的费力程度，10表示已无余力。' },
  rmPercent: { ko: '그 무게가 1RM의 몇 %인지.', en: 'What share of your one-rep max that weight is.', zh: '该重量占1RM的百分比。' },
  halfMin: { ko: '하프마라톤 21.0975km를 완주한 시간.', en: 'Your finish time over the 21.0975 km half marathon.', zh: '完成21.0975公里半马的时间。' },
  fullPredict: { ko: '같은 체력으로 42.195km를 달렸을 때의 예상 시간.', en: 'Predicted time over 42.195 km at the same fitness.', zh: '以同等体能完成42.195公里的预计时间。' },

  /* 아이·성장 */
  childWater: { ko: '아이가 하루에 필요한 수분. 음식에 든 물을 포함합니다.', en: 'A child’s daily fluid need, water in food included.', zh: '孩子每日所需水分，含食物中的水。' },
  fluidPerKg: { ko: '체중 1kg마다 필요한 수분. 작은 아이일수록 큽니다.', en: 'Fluid needed per kilogram; smaller children need more.', zh: '每公斤体重所需水分，孩子越小需求越高。' },
  fluidPerHour: { ko: '하루 요구량을 24로 나눈 시간당 양.', en: 'The daily need spread across 24 hours.', zh: '把每日需求量摊到24小时。' },
  childKcal: { ko: '아이가 하루에 필요한 열량. 자라면서 체중당 값이 줄어듭니다.', en: 'A child’s daily calories; the per-kilogram figure falls with age.', zh: '孩子每日所需热量，每公斤数值随年龄下降。' },
  heightBefore: { ko: '지난번에 잰 키. 성장 속도의 출발점이 됩니다.', en: 'The height measured last time — the starting point for velocity.', zh: '上次测得的身高，是计算生长速度的起点。' },
  heightNow: { ko: '이번에 잰 키. 같은 시간대에 재야 비교됩니다.', en: 'The height measured now; measure at the same time of day.', zh: '本次测得的身高；应在同一时段测量。' },
  monthsGap: { ko: '두 측정 사이에 지난 개월 수.', en: 'How many months passed between measurements.', zh: '两次测量之间经过的月数。' },
  growthVelocity: { ko: '1년에 자라는 키. 절대 키보다 이 속도가 중요합니다.', en: 'Centimetres a year; this speed matters more than absolute height.', zh: '每年生长的厘米数，比绝对身高更重要。' },
  formulaPerKg: { ko: '체중 1kg마다 하루에 먹이는 분유량.', en: 'Formula given per kilogram of body weight, per day.', zh: '每公斤体重每天喂哺的奶量。' },
  feverDose: { ko: '체중에 맞춘 1회 용량. 나이가 아니라 무게로 정합니다.', en: 'One dose scaled to weight — not to age.', zh: '按体重确定的单次剂量，而非按年龄。' },
  maxDaily: { ko: '하루에 넘지 않아야 하는 총량.', en: 'The total not to exceed in a day.', zh: '一天不应超过的总量。' },
  birthWeeks: { ko: '태어났을 때의 임신 주수. 40주를 만삭으로 봅니다.', en: 'Gestational age at birth; 40 weeks is full term.', zh: '出生时的孕周，40周为足月。' },
  ageWeeks: { ko: '태어난 뒤 지난 주 수.', en: 'How many weeks since birth.', zh: '出生后经过的周数。' },
  correctedAge: { ko: '이르게 태어난 만큼을 뺀 나이. 발달은 이 나이로 봅니다.', en: 'Age with the missed weeks removed; read development against this.', zh: '扣除提前周数后的年龄，发育按此评估。' },

  /* 건강 지표 */
  creatinine: { ko: '근육이 쓰고 남긴 물질. 신장이 걸러 내므로 신장 기능 지표가 됩니다.', en: 'A muscle waste product the kidneys clear, which makes it a kidney marker.', zh: '肌肉代谢产物，由肾脏清除，因而成为肾功能指标。' },
  egfr: { ko: '신장이 1분에 걸러 내는 양을 추정한 값. 90 이상이 정상입니다.', en: 'Estimated millilitres filtered per minute; 90 or above is normal.', zh: '估算每分钟的滤过量，90以上为正常。' },
  crcl: { ko: '체중을 반영한 신장 청소율. 약 용량을 정할 때 씁니다.', en: 'Kidney clearance including weight, used for drug dosing.', zh: '计入体重的肾脏清除率，用于药物剂量。' },
  tgHdl: { ko: '중성지방을 HDL로 나눈 값. 2 아래를 목표로 봅니다.', en: 'Triglycerides over HDL; under 2 is the target.', zh: '甘油三酯除以HDL，目标是低于2。' },
  quicki: { ko: '인슐린이 잘 듣는지 보는 지수. 클수록 좋습니다.', en: 'An index of insulin sensitivity; higher is better.', zh: '衡量胰岛素敏感性的指数，越高越好。' },
  tygIndex: { ko: '중성지방과 혈당만으로 인슐린 저항성을 가늠하는 지수.', en: 'Insulin resistance gauged from triglycerides and glucose alone.', zh: '仅用甘油三酯与血糖评估胰岛素抵抗的指数。' },
  ast: { ko: '간과 근육에 있는 효소. 세포가 상하면 피로 나옵니다.', en: 'An enzyme in liver and muscle; it leaks into blood when cells are damaged.', zh: '存在于肝与肌肉的酶，细胞受损时会进入血液。' },
  alt: { ko: '주로 간에 있는 효소. AST보다 간에 특이적입니다.', en: 'An enzyme mostly in the liver — more liver-specific than AST.', zh: '主要存在于肝脏的酶，比AST更具肝特异性。' },
  platelet: { ko: '피를 굳게 하는 세포. 간이 굳으면 수가 줄어듭니다.', en: 'The clotting cells; the count falls as the liver stiffens.', zh: '参与凝血的细胞，肝脏硬化时数量下降。' },
  fib4: { ko: '간 섬유화 가능성을 가리는 지수. 낮으면 진행된 섬유화가 드뭅니다.', en: 'A fibrosis screen; low values largely rule out advanced disease.', zh: '筛查肝纤维化的指数，数值低基本可排除进展性病变。' },
  remnantChol: { ko: '총콜레스테롤에서 HDL과 LDL을 뺀 나머지. LDL 검사에 안 나옵니다.', en: 'What is left after HDL and LDL — an LDL test does not see it.', zh: '总胆固醇减去HDL与LDL后的部分，LDL检测看不到。' },
  a1cIfcc: { ko: '당화혈색소를 mmol/mol로 나타낸 값. 유럽에서 씁니다.', en: 'HbA1c in mmol/mol, the unit used across Europe.', zh: '以mmol/mol表示的糖化血红蛋白，欧洲通用。' },
  crclPerKg: { ko: '청소율을 체중으로 나눈 값. 체격 차이를 지웁니다.', en: 'Clearance divided by weight, which removes body-size differences.', zh: '清除率除以体重，消除体格差异。' },

  /* 생활 대사 */
  sleepNeed: { ko: '개인에게 필요한 수면 시간. 성인은 대개 7~9시간입니다.', en: 'The sleep you personally need; most adults land at 7–9 hours.', zh: '个人所需的睡眠时长，多数成人为7至9小时。' },
  sleepActual: { ko: '실제로 잠든 시간. 눕는 시간과는 다릅니다.', en: 'Time actually asleep, not time in bed.', zh: '真正入睡的时长，与卧床时间不同。' },
  sleepDebt: { ko: '며칠 동안 쌓인 부족한 수면의 합.', en: 'The shortfall accumulated across those days.', zh: '这些天累积的睡眠不足总量。' },
  timezoneGap: { ko: '출발지와 도착지의 시각 차이.', en: 'The clock difference between departure and arrival.', zh: '出发地与目的地的时间差。' },
  goEast: { ko: '이동 방향. 동쪽 1, 서쪽 0으로 넣습니다.', en: 'Direction of travel — enter 1 for east, 0 for west.', zh: '飞行方向，向东填1，向西填0。' },
  adaptDays: { ko: '몸속 시계가 도착지 시각에 맞기까지 걸리는 날.', en: 'Days until the body clock lines up with local time.', zh: '生物钟与当地时间对齐所需的天数。' },
  standardDrinks: { ko: '순알코올 10g을 한 잔으로 세었을 때의 잔 수.', en: 'Drinks counted at 10 g of pure alcohol each.', zh: '以每杯10克纯酒精计的杯数。' },
  pureAlcoholG: { ko: '마신 술에 든 알코올의 무게. 부피에 0.789를 곱합니다.', en: 'The weight of alcohol you drank — volume times 0.789.', zh: '所饮酒中酒精的重量，体积乘0.789。' },
  cigsPerDay: { ko: '하루에 피우는 담배 개비 수. 한 갑은 20개비입니다.', en: 'Cigarettes smoked a day; a pack is twenty.', zh: '每天吸的支数，一包为20支。' },
  smokeYears: { ko: '그 양으로 피운 기간.', en: 'How many years you smoked at that rate.', zh: '按该量吸烟的年数。' },
  packYears: { ko: '하루 한 갑 1년을 1로 센 누적 흡연량.', en: 'Cumulative exposure, where one is a pack a day for a year.', zh: '累积吸烟量，每天一包一年记为1。' },
  weightLoss: { ko: '운동 전후 줄어든 체중. 거의 전부 물입니다.', en: 'Weight lost across the session — almost entirely water.', zh: '运动前后减少的体重，几乎全是水分。' },
  drankMl: { ko: '운동 중에 마신 물의 양.', en: 'Fluid you drank during the session.', zh: '运动过程中饮用的水量。' },
  sweatRate: { ko: '시간당 빠져나간 수분. 이 속도에 맞춰 마셔야 합니다.', en: 'Fluid lost per hour; drink to match this rate.', zh: '每小时流失的水分，应按此速率补水。' },
  alcoholKcal: { ko: '알코올에서 나오는 열량. 1g에 7kcal입니다.', en: 'Energy from the alcohol itself, at 7 kcal a gram.', zh: '来自酒精本身的热量，每克7千卡。' },
};

export const body2Desc = (key: string, lang: Lang): string | null => BODY2_DESC[key]?.[lang] ?? null;
