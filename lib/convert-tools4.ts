// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { ConvertTool } from './convert-tools.ts';
import type { ConvertL10n } from './convert-i18n.ts';

/**
 * 단위 변환 넷째 묶음 (12종).
 *
 * 앞의 126종이 비워 둔 자리 가운데 검색량이 큰 쪽을 골랐다. 각도 분류에 라디안이
 * 없어서 삼각함수를 쓰는 사람이 들어올 문이 아예 없었고, 분↔시간·일↔시간·주↔일은
 * 계산이 한 줄이라 안 만들었던 것들인데 바로 그래서 사람이 제일 많이 찾는다.
 *
 * 계수는 반올림한 소수를 적지 않고 정의에서 끌어온 식을 그대로 둔다. 0.0166666667로
 * 적어 두면 나중에 자릿수를 늘릴 때 어디까지가 참값인지 알 수 없다(mb-gb가 이미
 * `1 / 1024`로 그렇게 해 뒀다).
 *   rad→°   180 / Math.PI = 57.29577951…   (정의: 호의 길이 ÷ 반지름)
 *   ft·lb   4.4482216152605N × 0.3048m = 1.35581794833N·m — 둘 다 정의값이라 곱도 정확하다
 *   kgf     9.80665N (표준중력, 정의값)
 *   CFM     0.028316846592㎥ × 60 = 1.69901079552㎥/h — 흔히 1.699011로 적는 그 값이다
 *   mpg→L/100km  3.785411784L × 100 ÷ 1.609344km = 235.2145833… — 표에 235.215로 실린다
 *
 * mpg↔L/100km와 L/100km↔km/L은 reciprocal이다. 연비(거리÷연료)와 소비량(연료÷거리)은
 * 서로 역수라서 곱셈으로는 표현되지 않는다. 반비례는 자기 자신이 역변환이므로 왕복하면
 * 원래 값으로 돌아온다.
 *
 * N·m↔ft·lb는 /torque와 겹치지 않는다. 그쪽은 볼트 규격표가 정해진 값의 lb-ft를 같이
 * 보여주는 화면이고, 여기는 아무 값이나 넣는 변환기다. 문구도 볼트 규격 이야기를
 * 피하고 렌치 눈금과 in·lb 이야기로 갈랐다.
 *
 * 한글로 적은 단위(분·일·주·작은술·큰술)는 아래 CONVERT_EN4와 lib/convert-l10n/*에서
 * from·to로 갈아 끼운다 — 안 갈면 영어 페이지 입력칸에 한글이 박힌다.
 */
export const CONVERT_TOOLS4: ConvertTool[] = [
  /* ───────── 각도 ───────── */
  {
    slug: 'radian-degree', title: '라디안(rad) ↔ 도(°)', desc: '라디안을 도로 바꿉니다', icon: '📐',
    category: '각도', from: 'rad', to: '°', factor: 180 / Math.PI, digits: 3,
    quick: [0.5236, 0.7854, 1, 1.5708, 2, 3.1416],
    metaTitle: '라디안 ↔ 도 변환 - rad를 각도로',
    long: '라디안을 도로 바꿉니다. 수학·물리 계산과 프로그래밍의 삼각함수는 라디안을 기본으로 쓰는데, 사람이 각도를 말할 때는 도를 쓰기 때문에 두 표기를 계속 오갑니다.',
    note: '라디안은 호의 길이를 반지름으로 나눈 값이라 단위가 없습니다. 엑셀 SIN()이나 파이썬 math.sin()에 30을 넣으면 30도가 아니라 30라디안으로 계산되는 것이 이 때문이며, 삼각함수를 쓰는 계산에서 가장 흔한 실수입니다.',
  },

  /* ───────── 시간 ───────── */
  {
    slug: 'minute-hour', title: '분 ↔ 시간', desc: '분을 소수 시간으로 바꿉니다', icon: '⏳',
    category: '시간', from: '분', to: '시간', factor: 1 / 60, digits: 4,
    quick: [30, 45, 60, 90, 120, 480],
    metaTitle: '분 ↔ 시간 변환 - 90분은 몇 시간',
    long: '분을 시간으로 바꿉니다. 근무시간 정산, 시급 계산, 영상 길이, 주차·대여 요금처럼 시간 단위로 값을 매기는 곳에서 필요합니다.',
    note: '여기서 나오는 시간은 소수 시간입니다. 1시간 45분은 1.75시간이지 1.45시간이 아닙니다 — 근태표에 1.45로 적으면 18분이 사라지고, 시급 계산에서 이 실수가 가장 흔합니다.',
  },
  {
    slug: 'day-hour', title: '일 ↔ 시간', desc: '날짜를 시간으로 바꿉니다', icon: '📅',
    category: '시간', from: '일', to: '시간', factor: 24, digits: 2,
    quick: [1, 2, 3, 7, 14, 30],
    metaTitle: '일 ↔ 시간 변환 - 하루는 24시간',
    long: '일수를 시간으로 바꿉니다. 배송 리드타임, 투약 간격, 서버 가동시간, 장비 렌트처럼 "며칠"과 "몇 시간"을 섞어 쓰는 일정에서 필요합니다.',
    note: '하루가 늘 24시간인 것은 아닙니다. 서머타임을 시행하는 나라에서는 시작하는 날이 23시간, 끝나는 날이 25시간입니다. 항공권·회의 시간을 그 주에 계산하면 한 시간이 어긋납니다.',
  },
  {
    slug: 'week-day', title: '주 ↔ 일', desc: '주를 날짜로 바꿉니다', icon: '🗓️',
    category: '시간', from: '주', to: '일', factor: 7, digits: 2,
    quick: [1, 2, 4, 8, 12, 52],
    metaTitle: '주 ↔ 일 변환 - 몇 주는 며칠',
    long: '주를 일수로 바꿉니다. 임신 주수, 프로젝트 일정, 해지·통보 기간, 적금 만기처럼 주로 세는 기간을 날짜로 옮길 때 씁니다.',
    note: '계약서의 "2주 이내"는 달력 기준 14일이지만, 업무일로 세면 10일입니다. 어느 쪽인지 적혀 있지 않으면 달력 기준으로 보는 것이 원칙이고, 짧게 잡아 두는 편이 안전합니다.',
  },
  {
    slug: 'rpm-hz', title: 'rpm ↔ Hz', desc: '분당 회전수를 주파수로 바꿉니다', icon: '🔃',
    category: '시간', from: 'rpm', to: 'Hz', factor: 1 / 60, digits: 4,
    quick: [60, 600, 1500, 1800, 3000, 7200],
    metaTitle: 'rpm ↔ Hz 변환 - 회전수를 주파수로',
    long: '분당 회전수를 헤르츠로 바꿉니다. 모터·팬·드릴 사양은 rpm으로 적히는데 진동 분석과 인버터 설정은 Hz로 하기 때문에 두 표기를 맞춰야 합니다.',
    note: '모터의 전원 주파수와 축 회전수는 다릅니다. 4극 모터를 60Hz로 돌리면 동기 회전수가 1,800rpm입니다(120 × 주파수 ÷ 극수). 각속도 rad/s가 필요하면 여기서 나온 Hz에 2π를 곱하면 됩니다.',
  },

  /* ───────── 부피 ───────── */
  {
    slug: 'tsp-tbsp', title: '작은술 ↔ 큰술', desc: '조리법의 두 숟가락 단위', icon: '🍳',
    category: '부피', from: '작은술', to: '큰술', factor: 1 / 3, digits: 3,
    quick: [1, 2, 3, 4, 6, 12],
    metaTitle: '작은술 ↔ 큰술 변환 - 1큰술은 몇 작은술',
    long: '작은술과 큰술을 서로 바꿉니다. 계량스푼이 한 개만 있을 때, 또는 조리법의 분량을 절반이나 두 배로 늘릴 때 필요합니다.',
    note: '미국·한국 기준으로 1큰술이 정확히 3작은술입니다. 오스트레일리아의 큰술만 20mL여서 4작은술이므로, 오스트레일리아 조리법을 3 대 1로 환산하면 양이 25% 모자랍니다.',
  },

  /* ───────── 무게 ───────── */
  {
    slug: 'oz-lb', title: '온스 ↔ 파운드', desc: '온스를 파운드로 바꿉니다', icon: '⚖️',
    category: '무게', from: 'oz', to: 'lb', factor: 1 / 16, digits: 4,
    quick: [1, 4, 8, 12, 16, 32],
    metaTitle: '온스 ↔ 파운드 변환 - 1파운드는 16온스',
    long: '온스를 파운드로 바꿉니다. 미국 식료품 포장, 우편 요금표, 신생아 몸무게 표기("7 lb 6 oz")가 두 단위를 함께 씁니다.',
    note: '상용온스(avoirdupois)는 1파운드가 16온스입니다. 금·은에 쓰는 트로이온스는 31.10g으로 더 무겁고 1트로이파운드가 12트로이온스라, 귀금속 무게를 16으로 나누면 값이 틀어집니다.',
  },
  {
    slug: 'newton-kgf', title: 'N ↔ kgf', desc: '뉴턴을 킬로그램힘으로 바꿉니다', icon: '🏋️',
    category: '무게', from: 'N', to: 'kgf', factor: 1 / 9.80665, digits: 4,
    quick: [1, 10, 50, 100, 500, 1000],
    metaTitle: 'N ↔ kgf 변환 - 뉴턴을 킬로그램힘으로',
    long: '뉴턴을 킬로그램힘으로 바꿉니다. 국제 규격은 힘을 N으로 적지만 한국·일본 장비의 사양표와 스프링 저울, 인장 시험기 눈금에는 kgf가 아직 그대로 남아 있습니다.',
    note: 'kgf는 표준중력 9.80665m/s²를 못박아 정의한 값이라 장소에 따라 변하지 않습니다. 다만 kg(질량)과 kgf(힘)는 다른 양이므로, 같은 표에 섞어 적으면 하중 계산이 조용히 어긋납니다.',
  },

  /* ───────── 압력·기타 ───────── */
  {
    slug: 'mpg-l100km', title: 'mpg ↔ L/100km', desc: '미국 연비를 유럽식 소비량으로', icon: '⛽',
    category: '압력·기타', from: 'mpg', to: 'L/100km', factor: 378.5411784 / 1.609344, reciprocal: true, digits: 2,
    quick: [20, 25, 30, 35, 40, 50],
    metaTitle: 'mpg ↔ L/100km 변환 - 유럽식 연비 표기',
    long: '미국식 연비(mpg)를 유럽식 연료 소비량(L/100km)으로 바꿉니다. 두 숫자는 방향이 반대라서, 같은 mpg 차이가 늘 같은 연료 차이를 뜻하지 않습니다 — 20→25mpg는 2.35L/100km를 줄이는데 40→45mpg는 0.65L/100km밖에 줄이지 못합니다.',
    note: '235.215라는 상수는 미국 갤런 3.785411784L에 100을 곱하고 1마일 1.609344km로 나눈 값입니다. 영국 갤런 기준 mpg라면 상수가 282.481로 바뀌므로, 영국 잡지의 연비를 이 값으로 환산하면 20%쯤 낮게 나옵니다.',
  },
  {
    slug: 'l100km-kmpl', title: 'L/100km ↔ km/L', desc: '연료 소비량을 연비로 바꿉니다', icon: '🚗',
    category: '압력·기타', from: 'L/100km', to: 'km/L', factor: 100, reciprocal: true, digits: 2,
    quick: [4, 5, 6, 7, 8, 10],
    metaTitle: 'L/100km ↔ km/L 변환 - 소비량을 연비로',
    long: '유럽식 연료 소비량(L/100km)을 우리 기준 연비(km/L)로 바꿉니다. 둘 다 미터법이지만 분자와 분모가 뒤집혀 있어서, 유럽 차량 카탈로그의 숫자는 한 번 뒤집지 않으면 우리 연비와 견줄 수 없습니다.',
    note: '100을 나누는 것이 전부이므로 같은 계산이 양쪽 방향에 그대로 쓰입니다. 낮은 소비량 쪽에서 1L/100km 차이가 훨씬 큽니다 — 4에서 3으로 줄면 25에서 33km/L이 되지만, 9에서 8은 11에서 12.5km/L에 그칩니다.',
  },
  {
    slug: 'nm-ftlb', title: 'N·m ↔ ft·lb', desc: '토크 단위를 서로 바꿉니다', icon: '🔧',
    category: '압력·기타', from: 'N·m', to: 'ft·lb', factor: 1 / 1.35581794833, digits: 3,
    quick: [10, 20, 40, 100, 150, 200],
    metaTitle: 'N·m ↔ ft·lb 변환 - 토크 렌치 눈금 맞추기',
    long: '토크를 N·m와 ft·lb 사이에서 바꿉니다. 미국에서 산 토크 렌치의 눈금과 정비 매뉴얼은 ft·lb로 적혀 있고, 국제 규격과 국내 정비 지침은 N·m로 적혀 있어 둘을 맞춰야 합니다.',
    note: 'ft·lb와 lb·ft는 같은 토크를 가리키는 같은 단위입니다. 작은 토크는 대신 in·lb로 적는데 이것은 ft·lb의 12분의 1이라, 자전거·전자기기 나사 규격을 ft·lb로 잘못 읽으면 열두 배로 조이게 됩니다.',
  },
  {
    slug: 'cfm-m3h', title: 'CFM ↔ m³/h', desc: '환기 풍량 단위를 서로 바꿉니다', icon: '🌬️',
    category: '압력·기타', from: 'CFM', to: 'm³/h', factor: 0.028316846592 * 60, digits: 3,
    quick: [50, 100, 150, 200, 400, 1000],
    metaTitle: 'CFM ↔ m³/h 변환 - 환기 풍량 단위',
    long: '분당 세제곱피트(CFM)를 시간당 세제곱미터로 바꿉니다. 미국·대만 제조사의 환풍기·레인지후드·공기청정기·PC 팬은 CFM으로 적고, 국내 설비 도면과 유럽 사양서는 m³/h로 적습니다.',
    note: 'CFM은 부피 유량일 뿐이라 압력에 대해서는 아무 말도 하지 않습니다. 같은 CFM이라도 정압이 낮은 팬은 필터나 긴 덕트를 만나면 실제 풍량이 뚝 떨어지므로, 팬 사양은 CFM과 정압(mmH₂O)을 함께 봐야 합니다.',
  },
];

/**
 * 넷째 묶음의 영어 문구.
 *
 * 계수는 위에만 있다 — 여기에는 문구와, 한글 단위를 갈아 끼우는 from·to만 둔다.
 * lib/convert-i18n.ts의 CONVERT_EN에 이 표를 합치는 것은 그쪽에서 한다.
 */
export const CONVERT_EN4: Record<string, ConvertL10n> = {
  'radian-degree': {
    title: 'Radians to Degrees',
    desc: 'Convert radians to degrees and back',
    long: 'Convert radians to degrees and back. Mathematics, physics and every programming language do trigonometry in radians, while people describe angles in degrees, so you cross between the two constantly.',
    note: 'A radian is an arc length divided by a radius, so it carries no unit. That is why SIN() in a spreadsheet and math.sin() in Python read 30 as 30 radians, not 30 degrees — the most common mistake in any sheet that uses trigonometry.',
  },
  'minute-hour': {
    title: 'Minutes to Hours',
    desc: 'Convert minutes into decimal hours',
    long: 'Convert minutes to hours and back. Needed wherever time is billed or logged: timesheets, hourly pay, video length, parking and rental charges.',
    note: 'The result is a decimal hour. One hour forty-five minutes is 1.75 hours, not 1.45 — writing 1.45 on a timesheet quietly loses eighteen minutes, and that is the classic payroll error.',
    from: 'min', to: 'h',
  },
  'day-hour': {
    title: 'Days to Hours',
    desc: 'Convert a number of days into hours',
    long: 'Convert days to hours and back. Useful for shipping lead times, dosing intervals, server uptime and equipment rental, where days and hours get mixed in the same schedule.',
    note: 'A day is not always 24 hours. Where daylight saving applies, the day it starts is 23 hours and the day it ends is 25, so a flight or meeting counted across that weekend lands an hour off.',
    from: 'days', to: 'hours',
  },
  'week-day': {
    title: 'Weeks to Days',
    desc: 'Convert weeks into a number of days',
    long: 'Convert weeks to days and back. Pregnancy weeks, project schedules, notice periods and savings terms are all counted in weeks but have to be placed on a calendar.',
    note: '"Within two weeks" in a contract is 14 calendar days, but only 10 working days. When the wording does not say which, calendar days are the default reading and the safer one to plan against.',
    from: 'weeks', to: 'days',
  },
  'rpm-hz': {
    title: 'RPM to Hertz',
    desc: 'Convert revolutions per minute to frequency',
    long: 'Convert revolutions per minute to hertz and back. Motors, fans and drills are specified in rpm, while vibration analysis and variable-frequency drives are set in hertz.',
    note: 'Supply frequency and shaft speed are not the same thing. A four-pole motor on 60 Hz turns at a synchronous 1,800 rpm — 120 × frequency ÷ poles. For angular velocity in rad/s, multiply the hertz here by 2π.',
  },
  'tsp-tbsp': {
    title: 'Teaspoons to Tablespoons',
    desc: 'The two spoon measures in recipes',
    long: 'Convert teaspoons to tablespoons and back. For when only one measuring spoon is at hand, or when a recipe is being halved or doubled.',
    note: 'In US and Korean measures a tablespoon is exactly three teaspoons. The Australian tablespoon alone is 20 mL, which is four teaspoons, so converting an Australian recipe at 3:1 leaves you 25% short.',
    from: 'tsp', to: 'tbsp',
  },
  'oz-lb': {
    title: 'Ounces to Pounds',
    desc: 'Convert ounces to pounds and back',
    long: 'Convert ounces to pounds and back. American grocery packaging, postage tables and newborn weights ("7 lb 6 oz") use the two units side by side.',
    note: 'The avoirdupois pound holds 16 ounces. A troy ounce, used for gold and silver, is heavier at 31.10 g and a troy pound holds only 12 of them, so dividing bullion weights by 16 gives the wrong answer.',
  },
  'newton-kgf': {
    title: 'Newtons to Kilogram-force',
    desc: 'Convert newtons to kilogram-force',
    long: 'Convert newtons to kilogram-force and back. International standards state force in newtons, but Korean and Japanese equipment plates, spring scales and tensile testers still read in kgf.',
    note: 'One kgf is fixed to standard gravity, 9.80665 m/s², so it does not drift with location. But kg is a mass and kgf is a force: mixing them in one table makes a load calculation wrong without looking wrong.',
  },
  'mpg-l100km': {
    title: 'mpg to L/100 km',
    desc: 'US fuel economy as European consumption',
    long: 'Convert US miles per gallon into litres per 100 km. The two run in opposite directions, so equal steps in mpg are not equal steps in fuel: 20→25 mpg saves 2.35 L/100 km, while 40→45 mpg saves only 0.65.',
    note: 'The constant 235.215 is the US gallon, 3.785411784 L, times 100 and divided by the 1.609344 km in a mile. Imperial-gallon mpg needs 282.481 instead, so British magazine figures come out about 20% too low here.',
  },
  'l100km-kmpl': {
    title: 'L/100 km to km/L',
    desc: 'Convert fuel consumption into fuel economy',
    long: 'Convert litres per 100 km into kilometres per litre. Both are metric, but the numerator and denominator are swapped, so a European brochure figure has to be inverted before it can sit next to a km/L rating.',
    note: 'The whole calculation is 100 divided by the value, which is why the same step works in both directions. One litre matters far more at the efficient end: 4 to 3 goes from 25 to 33 km/L, while 9 to 8 moves only 11 to 12.5.',
  },
  'nm-ftlb': {
    title: 'N·m to ft·lb',
    desc: 'Convert between torque units',
    long: 'Convert torque between newton-metres and foot-pounds. Torque wrenches and service manuals bought in the United States are scaled in ft·lb, while international specifications and metric tooling are written in N·m.',
    note: 'ft·lb and lb·ft are the same unit written two ways. Small torques are given in in·lb instead, one twelfth of a ft·lb — reading a bicycle or electronics spec as ft·lb tightens the screw twelve times too hard.',
  },
  'cfm-m3h': {
    title: 'CFM to m³/h',
    desc: 'Convert airflow units both ways',
    long: 'Convert cubic feet per minute into cubic metres per hour. American and Taiwanese makers rate extractor fans, range hoods, air purifiers and PC fans in CFM, while ventilation drawings and European datasheets use m³/h.',
    note: 'CFM is a volume flow and says nothing about pressure. Two fans with the same CFM behave differently once a filter or a long duct is in the way, so read the airflow together with the static pressure rating.',
  },
};
