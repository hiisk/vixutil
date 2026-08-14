import type { MetadataRoute } from "next";
import { TESTS } from "@/lib/test-data";
import { QUIZZES } from "@/lib/quiz-data";
import { GENERATORS } from "@/lib/generator-data";
import { CHECKLISTS } from "@/lib/checklist-data";
import { RANDOM_TOOLS } from "@/lib/random-tools";
import { DEVICE_TOOLS } from "@/lib/device-tools";
import { IMAGE_TOOLS } from "@/lib/image-tools";
import { TEXT_TOOLS } from "@/lib/text-tools";
import { GENERATORS_EN } from "@/lib/generator-en";
import { GENERATORS_INTL } from "@/lib/generator-l10n";
import { CHECKLISTS_INTL } from "@/lib/checklist-l10n/index";
import { QUIZZES_INTL } from "@/lib/quiz-l10n/index";
import { timeToolsIntl } from "@/lib/time-tools-intl";
import { colorToolsIntl } from "@/lib/color-tools-intl";
import { INTL_LOCALES10 } from "@/lib/locales";
import { CALC_INTL_SLUGS } from "@/lib/calc-l10n";
import { SNAP_TOOLS } from "@/lib/snap-tools-intl";
import { NEW_SNAP_SLUGS } from "@/lib/snap/tool-text";
import { FORTUNE_TOOLS } from "@/lib/fortune-tools-intl";
import { imageToolsIntl } from "@/lib/image-tools-intl";
import { soundToolsIntl } from "@/lib/sound-tools-intl";
import { foodToolsIntl } from "@/lib/food-tools-intl";
import { gameToolsIntl } from "@/lib/game-tools-intl";
import { deviceToolsIntl } from "@/lib/device-tools-intl";
import { textToolsIntl } from "@/lib/text-tools-intl";
import { TESTS_INTL } from "@/lib/test-l10n/index";
import { GAME_TOOLS } from "@/lib/game-tools";
import { COLOR_TOOLS } from "@/lib/color-tools";
import { TIME_TOOLS } from "@/lib/time-tools";
import { SOUND_TOOLS } from "@/lib/sound-tools";
import { FOOD_TOOLS } from "@/lib/food-tools";
import { CONVERT_TOOLS } from "@/lib/convert-tools";
import { valuesFor, valueSlug } from "@/lib/convert/values";
import { allCells as bmiAllCells, cellSlug as bmiCellSlug } from "@/lib/body/bmi-grid";
import { EXERCISES } from "@/lib/body/exercise";
import { SALARIES } from "@/lib/salary-grid";
import { allSeveranceCells, severanceSlug } from "@/lib/severance-grid";
import { allLoanCells, loanSlug } from "@/lib/loan-grid";
import { allDays as birthdayDays, daySlug as birthdaySlug } from "@/lib/fortune/birthday-grid";
import { allDays as dateDays, daySlug as dateSlug } from "@/lib/date/day-grid";
import { RATE_TOOLS } from "@/lib/rate-tools";
import { BODY_TOOLS } from "@/lib/body-tools";
import { GEO_TOOLS } from "@/lib/geo-tools";
import { CRAFT_TOOLS } from "@/lib/craft-tools";
import { COUNTRIES } from "@/lib/country-tools";
import { IDIOMS } from "@/lib/hanja-tools";
import { METRO_LINES } from "@/lib/metro-lines";
import { METRO_LANGS } from "@/lib/metro/lang";
import { sectionHasLocale } from "@/lib/i18n/lang";
import { MUSIC_ITEMS } from "@/lib/music/catalog";
import { NAMED_COLORS_8 } from "@/lib/color/named8";
import { allHexShorts, hexSlug } from "@/lib/color/hex-grid";
import { allCityPairs, pairSlug } from "@/lib/time/pair-grid";
import { INGREDIENTS } from "@/lib/food/ingredients8";
import { TIME_CITIES } from "@/lib/time/cities8";
import { SCREENS } from "@/lib/device/screens";
import { LENSES } from "@/lib/lens/list";
import { ALGS } from "@/lib/cube/list";
import { ROLLS } from "@/lib/dice/list";
import { PATTERNS } from "@/lib/regex/list";
import { ELEMENTS } from "@/lib/element/list";
import { NUMBERS } from "@/lib/number/list";
import { CODES } from "@/lib/ascii/list";
import { PORTS } from "@/lib/port/list";
import { MODES as CHMOD_MODES } from "@/lib/chmod/list";
import { VALUES as RESISTOR_VALUES } from "@/lib/resistor/list";
import { FRACTIONS, slugOf as fractionSlug } from "@/lib/fraction/list";
import { KEYS, slugOf as keySlug } from "@/lib/keycode/list";
import { PREFIXES, slugOf as cidrSlug } from "@/lib/cidr/list";
import { CHARS as CODE_CHARS, CELLS as CODE_CELLS, charSlug, cellSlug } from "@/lib/code/list";
import { SCORES as DARTS_SCORES } from "@/lib/darts/list";
import { PRODUCTS as TIMES_PRODUCTS, slugOf as timesSlug } from "@/lib/times/list";
import { NUMBERS as SQRT_NUMBERS } from "@/lib/sqrt/list";
import { YEARS as ROMAN_YEARS } from "@/lib/roman/list";
import { TIRES, slugOf as tireSlug } from "@/lib/tire/list";
import { SCREWS, slugOf as screwSlug } from "@/lib/screw/list";
import { YEARS as CAL_YEARS } from "@/lib/year/list";
import { PACES, slugOf as paceSlug } from "@/lib/pace/list";
import { PIXELS } from "@/lib/rem/list";
import { SPEEDS } from "@/lib/stop/list";
import { ALTITUDES } from "@/lib/altitude/list";
import { CHANNELS, slugOf as wifiSlug } from "@/lib/wifi/list";
import { SPOTS, slugOf as fretSlug } from "@/lib/fret/list";
import { WEIGHTS } from "@/lib/gravity/list";
import { CELLS as WC_CELLS, slugOf as wcSlug } from "@/lib/windchill/list";
import { CELLS as DEW_CELLS, slugOf as dewSlug } from "@/lib/dew/list";
import { BITS, slugOf as drillSlug } from "@/lib/drill/list";
import { CELLS as BW_CELLS, slugOf as bwSlug } from "@/lib/bandwidth/list";
import { CELLS as BATT_CELLS, slugOf as battSlug } from "@/lib/battery/list";
import { CELLS as WIRE_CELLS, slugOf as wireSlug } from "@/lib/wire/list";
import { CELLS as PAPER_CELLS, slugOf as paperSlug } from "@/lib/paper/list";
import { CELLS as TORQUE_CELLS, slugOf as torqueSlug } from "@/lib/torque/list";
import { CELLS as LUMEN_CELLS, slugOf as lumenSlug } from "@/lib/lumen/list";
import { CELLS as AMP_CELLS, slugOf as ampSlug } from "@/lib/ampere/list";
import { CELLS as DOF_CELLS, slugOf as dofSlug } from "@/lib/dof/list";
import { CELLS as GEAR_CELLS, slugOf as gearSlug } from "@/lib/gear/list";
import { CELLS as FILAMENT_CELLS, slugOf as filamentSlug } from "@/lib/filament/list";
import { CELLS as RING_CELLS, slugOf as ringSlug } from "@/lib/ring/list";
import { CELLS as REBAR_CELLS, slugOf as rebarSlug } from "@/lib/rebar/list";
import { CELLS as MOTOR_CELLS, slugOf as motorSlug } from "@/lib/motor/list";
import { CELLS as STEEL_CELLS, slugOf as steelSlug } from "@/lib/steel/list";
import { CELLS as HARDNESS_CELLS, slugOf as hardnessSlug } from "@/lib/hardness/list";
import { CELLS as SUN_CELLS, slugOf as sunSlug } from "@/lib/sun/list";
import { CELLS as DPI_CELLS } from "@/lib/dpi/list";
import { CELLS as LAUNDRY_CELLS } from "@/lib/laundry/list";
import { LEGAL_KINDS, legalRoute } from "@/lib/legal/common";
import { CELLS as FERTILIZER_CELLS, slugOf as fertilizerSlug } from "@/lib/fertilizer/list";
import { CELLS as BPM_CELLS, slugOf as bpmSlug } from "@/lib/bpm/list";
import { CELLS as UV_CELLS, slugOf as uvSlug } from "@/lib/uv/list";
import { CELLS as HIKE_CELLS, slugOf as hikeSlug } from "@/lib/hike/list";
import { CELLS as INSUL_CELLS, slugOf as insulSlug } from "@/lib/insul/list";
import { CELLS as AIR_CELLS, slugOf as airSlug } from "@/lib/air/list";
import { CELLS as SIZE_CELLS, slugOf as sizeSlug } from "@/lib/size/list";
import { CELLS as BRA_CELLS, slugOf as braSlug } from "@/lib/bra/list";
import { CELLS as PET_CELLS, slugOf as petSlug } from "@/lib/petfood/list";
import { CELLS as PW_CELLS, slugOf as pwSlug } from "@/lib/password/list";
import { CELLS as VIEW_CELLS, slugOf as viewSlug } from "@/lib/viewing/list";
import { CELLS as BIG_CELLS, slugOf as bigSlug } from "@/lib/bignum/list";
import { CELLS as GENGO_CELLS, slugOf as gengoSlug } from "@/lib/gengo/list";
import { CELLS as CABLE_CELLS, slugOf as cableSlug } from "@/lib/cable/list";
import { CELLS as TATAMI_CELLS, slugOf as tatamiSlug } from "@/lib/tatami/list";
import { CELLS as LUMBER_CELLS, slugOf as lumberSlug } from "@/lib/lumber/list";
import { CELLS as PB_CELLS, slugOf as pbSlug } from "@/lib/powerbank/list";
import { CELLS as GOLF_CELLS, slugOf as golfSlug } from "@/lib/golf/list";
import { CELLS as MW_CELLS, slugOf as mwSlug } from "@/lib/microwave/list";
import { MAGNITUDES as QUAKE_MAGS, slugOf as quakeSlug } from "@/lib/quake/list";
import { CELLS as BED_CELLS, slugOf as bedSlug } from "@/lib/bed/list";
import { CELLS as WINE_CELLS, slugOf as wineSlug } from "@/lib/wine/list";
import { CELLS as BLOOD_CELLS, slugOf as bloodSlug } from "@/lib/blood/list";
import { CELLS as EXPOSURE_CELLS, slugOf as exposureSlug } from "@/lib/exposure/list";
import { CELLS as HEREDITY_CELLS, slugOf as heredSlug } from "@/lib/heredity/list";
import { CELLS as RAID_CELLS, slugOf as raidSlug } from "@/lib/raid/list";
import { CELLS as FLIGHT_CELLS, slugOf as flightSlug } from "@/lib/flight/list";
import { CELLS as PURIFIER_CELLS, slugOf as purifierSlug } from "@/lib/purifier/list";
import { CELLS as DRINK_CELLS, slugOf as drinkSlug } from "@/lib/drink/list";
import { OPENINGS } from "@/lib/chess/list";
import { HANDS } from "@/lib/poker/list";
import { LANGS } from "@/lib/i18n/lang";
import { FREQS, freqSlug } from "@/lib/sound/freqs";
import { EXTS } from "@/lib/ext/list";
import { CARDS } from "@/lib/tarot/deck";
import { GLYPHS } from "@/lib/glyph/list";
import { TAGS } from "@/lib/html/tags";
import { IMG_SIZES } from "@/lib/imgsize/list";
import { CSS_PROPS } from "@/lib/css/props";
import { HTTP_ITEMS } from "@/lib/http/list";
import { CMD_ITEMS } from "@/lib/cmd/list";
import { SC_ITEMS } from "@/lib/shortcut/list";
import { EM_ITEMS } from "@/lib/emoji/list";
import { ERR_ITEMS } from "@/lib/errmsg/list";

const BASE = "https://vixutil.com";

/* 4,131칸을 열 언어가 함께 쓴다 — 언어마다 다시 만들면 같은 배열을 열 번 만든다 */
const BMI_CELLS = bmiAllCells();
/* 366일도 같은 이유로 한 번만 만든다 */
const BIRTHDAYS = birthdayDays();
const DATE_DAYS = dateDays();

export const dynamic = "force-static";

const calculatorRoutes = [
  "/calculator/salary", "/calculator/parttime", "/calculator/minimum-wage", "/calculator/standard-wage", "/calculator/overtime",
  "/calculator/weekly-holiday", "/calculator/severance", "/calculator/annual-leave-pay", "/calculator/four-insurance",
  "/calculator/unemployment", "/calculator/parental-leave", "/calculator/maternity-leave",
  "/calculator/freelance", "/calculator/to-hourly", "/calculator/to-annual", "/calculator/target-salary",
  "/calculator/loan", "/calculator/deposit", "/calculator/savings", "/calculator/compound", "/calculator/compound-goal",
  "/calculator/ltv", "/calculator/dsr", "/calculator/max-loan", "/calculator/car-installment",
  "/calculator/acquisition-tax", "/calculator/property-tax", "/calculator/holding-tax", "/calculator/capital-gains",
  "/calculator/gift-tax", "/calculator/inheritance-tax", "/calculator/comprehensive-tax", "/calculator/local-income-tax",
  "/calculator/business-income", "/calculator/dividend", "/calculator/vat", "/calculator/broker-fee", "/calculator/subscription-score",
  "/calculator/retirement-income-tax", "/calculator/rental-yield",
  "/calculator/rental-income-tax", "/calculator/jeonse-wolse",
  "/calculator/national-pension", "/calculator/basic-pension", "/calculator/pension-catchup",
  "/calculator/pension-tax",
  "/calculator/dti", "/calculator/home-buying-cost", "/calculator/car-excise-tax", "/calculator/ev-vs-gas",
  "/calculator/survivor-pension", "/calculator/pension-split", "/calculator/car-lease-vs-loan", "/calculator/year-end-tax",
  "/calculator/solar-payback", "/calculator/aircon-capacity", "/calculator/ltc-copay", "/calculator/jeonse-safety", "/calculator/card-deduction", "/calculator/monthly-rent-deduction", "/calculator/inheritance-share", "/calculator/severance-vs-pension", "/calculator/median-income", "/calculator/student-loan", "/calculator/eitc", "/calculator/health-insurance-local", "/calculator/youth-savings", "/calculator/new-year-money", "/calculator/moving-cost", "/calculator/traffic-fine", "/calculator/condolence-money",
  "/calculator/interest-tax", "/calculator/simple-vat", "/calculator/protein", "/calculator/sober-time",
  "/calculator/pension-credit", "/calculator/annual-leave", "/calculator/refinance",
  "/calculator/jeonwolse", "/calculator/pyeong", "/calculator/deposit-conversion",
  "/calculator/exchange", "/calculator/roi", "/calculator/avg-price", "/calculator/breakeven", "/calculator/percent",
  "/calculator/simple-interest", "/calculator/inflation", "/calculator/retirement",
  "/calculator/electricity", "/calculator/gas-bill", "/calculator/water-bill", "/calculator/work-hours-209", "/calculator/electricity-reverse", "/calculator/car-depreciation", "/calculator/loan-method", "/calculator/car-cost", "/calculator/volumetric-weight", "/calculator/lease-renewal", "/calculator/heating-bill", "/calculator/appliance-power", "/calculator/water",
  "/calculator/maintenance-fee",
  "/calculator/gas-cost", "/calculator/fuel-efficiency", "/calculator/ev-charge", "/calculator/car-tax",
  "/calculator/car-registration",
  "/calculator/bmi", "/calculator/bmr", "/calculator/calorie", "/calculator/sleep", "/calculator/ovulation",
  "/calculator/body-fat", "/calculator/blood-pressure", "/calculator/calories-burn",
  "/calculator/pregnancy", "/calculator/tip", "/calculator/dutch-pay", "/calculator/discount", "/calculator/gpa", "/calculator/school-rank",
  "/calculator/age", "/calculator/birthday", "/calculator/dday", "/calculator/discharge", "/calculator/military-pay", "/calculator/time-diff",
  "/calculator/unit-length", "/calculator/unit-weight", "/calculator/unit-temp", "/calculator/binary",
  "/calculator/loan-prepayment-fee", "/calculator/caffeine", "/calculator/wedding-gift",
  "/calculator/work-hours", "/calculator/average", "/calculator/pet-age", "/calculator/shoe-size",
  "/calculator/rice-water", "/calculator/coffee-ratio", "/calculator/data-usage", "/calculator/charge-time",
  "/calculator/unit-volume", "/calculator/speed-time",
];

const devRoutes = [
  "/calculator/dev/jwt", "/calculator/dev/hash", "/calculator/dev/salary", "/calculator/dev/color", "/calculator/dev/base64",
  "/calculator/dev/regex", "/calculator/dev/json", "/calculator/dev/url-encode", "/calculator/dev/timestamp",
  "/calculator/dev/uuid", "/calculator/dev/cron", "/calculator/dev/sql",
  "/calculator/dev/word-count", "/calculator/dev/diff",
];

/*
  lastModified는 일부러 넣지 않는다.

  전에는 모든 URL에 빌드 시각을 넣었는데, 그러면 오탈자 하나만 고쳐 배포해도
  954개 페이지가 전부 "오늘 갱신됨"이라고 주장하게 된다. 실제로 바뀐 건 한
  페이지뿐이니 이건 거짓 신호이고, 크롤러는 이런 사이트맵의 날짜를 아예
  신뢰하지 않게 된다 — 정작 진짜로 크게 고쳤을 때 알릴 수단이 사라진다.

  콘텐츠별 수정일을 따로 관리하지 않는 이상, 날짜를 빼고 크롤러가 자체
  크롤 이력으로 판단하게 두는 편이 낫다.
*/
function allEntries(): MetadataRoute.Sitemap {
  const monthly = "monthly" as const;
  const weekly = "weekly" as const;
  /* 정책·소개 페이지는 해가 바뀌어도 거의 그대로다 */
  const yearly = "yearly" as const;

  return [
    { url: BASE, changeFrequency: weekly, priority: 1 },
    { url: `${BASE}/search`, changeFrequency: weekly, priority: 0.9 },
    /*
     * 정책·소개 네 장 × 열 언어 = 40장.
     *
     * 애드센스가 "가치 없는 콘텐츠"로 거절한 뒤 2026-08-12에 만들었다. 심사자가
     * 사람이 직접 찾아 읽는 자리이므로 푸터에서도 닿고 사이트맵에도 실어야 한다.
     * 자주 바뀌지 않으므로 changeFrequency는 yearly, 우선순위는 도구보다 낮게 둔다 —
     * 크롤 예산을 이쪽으로 끌어오려는 것이 아니라 있다는 것만 알리려는 것이다.
     */
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) =>
      LEGAL_KINDS.map(k => ({
        url: `${BASE}${prefix}${legalRoute(k)}`,
        changeFrequency: yearly,
        priority: 0.3,
      })),
    ),
    { url: `${BASE}/calculator`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/test`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/quiz`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/generator`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/checklist`, changeFrequency: weekly, priority: 0.95 },
    /*
     * 날짜 낱장 — /date/<MM-DD>. "3월 15일 무슨 요일"에 답한다.
     * 생일 낱장(/fortune/birthday)과 다루는 것이 다르다 — 그쪽은 그 날 태어난 사람,
     * 여기는 날짜 자체(요일·주차·기념일)다. 겹치지 않는지는 검사가 본다.
     */
    ...DATE_DAYS.map((d) => ({
      url: `${BASE}/date/${dateSlug(d.month, d.day)}`, changeFrequency: yearly, priority: 0.7,
    })),
    ...INTL_LOCALES10.flatMap((lang) =>
      DATE_DAYS.map((d) => ({
        url: `${BASE}/${lang}/date/${dateSlug(d.month, d.day)}`, changeFrequency: yearly, priority: 0.6,
      })),
    ),
    { url: `${BASE}/fortune`, changeFrequency: weekly, priority: 0.95 },
    /*
     * 생일 낱장 — /fortune/birthday/<MM-DD>. 366일이 언어마다 붙는다(윤일 포함).
     * "3월 15일 생일 별자리"는 해마다 되돌아오는 검색이고 자료가 안 바뀐다.
     * 셈은 lib/fortune/birthday-grid.ts.
     */
    ...BIRTHDAYS.map((d) => ({
      url: `${BASE}/fortune/birthday/${birthdaySlug(d.month, d.day)}`, changeFrequency: yearly, priority: 0.7,
    })),
    ...INTL_LOCALES10.flatMap((lang) =>
      BIRTHDAYS.map((d) => ({
        url: `${BASE}/${lang}/fortune/birthday/${birthdaySlug(d.month, d.day)}`, changeFrequency: yearly, priority: 0.6,
      })),
    ),
    { url: `${BASE}/fortune/zodiac`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/animal`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/tarot`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/dream`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/fortune/saju`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/mbti`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/blood-type`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/biorhythm`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/name-match`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/zodiac-match`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/star-match`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/blood-match`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/mbti-match`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/daily`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/fortune/daily-tarot`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/tarot-yesno`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/lucky-lotto`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/birth-stone`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/today-color`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/random`, changeFrequency: weekly, priority: 0.95 },
    ...RANDOM_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/random/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/snap`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/snap/first-impression`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/face-reading`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/personal-color`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/photo-mood`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/face-symmetry`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/smile-score`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/id-photo`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/head-pose`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/real-smile`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/eye-open`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/framing`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/lighting`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/sharpness`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/white-balance`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/distance`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/mirror`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/animal-face`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/handwriting`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/expression`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/golden-ratio`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/couple-match`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/device`, changeFrequency: weekly, priority: 0.95 },
    ...DEVICE_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/device/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/image`, changeFrequency: weekly, priority: 0.95 },
    ...IMAGE_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/image/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/text`, changeFrequency: weekly, priority: 0.95 },
    ...TEXT_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/text/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/game`, changeFrequency: weekly, priority: 0.95 },
    ...GAME_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/game/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/color`, changeFrequency: weekly, priority: 0.95 },
    ...COLOR_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/color/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/time`, changeFrequency: weekly, priority: 0.95 },
    ...TIME_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/time/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/sound`, changeFrequency: weekly, priority: 0.95 },
    ...SOUND_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/sound/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/food`, changeFrequency: weekly, priority: 0.95 },
    ...FOOD_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/food/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/convert`, changeFrequency: weekly, priority: 0.95 },
    ...CONVERT_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/convert/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    /*
     * 값 낱장 — /convert/<쌍>/<값>. 138쌍 × 24값 = 3,312장이 언어마다 붙는다.
     * "70kg 파운드"처럼 **값까지 넣어 검색하는 말**을 받는 자리라, 쌍 페이지보다
     * 이쪽이 실제 유입에 가깝다. 셈과 대표값은 lib/convert/values.ts.
     */
    ...CONVERT_TOOLS.flatMap((t: { slug: string }) =>
      valuesFor(t.slug).map((v) => ({
        url: `${BASE}/convert/${t.slug}/${valueSlug(v)}`, changeFrequency: monthly, priority: 0.7,
      })),
    ),
    // 단위 변환은 slug가 여덟 언어에서 같다 — 언어 목록만 돌리면 된다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/convert`, changeFrequency: weekly, priority: 0.9 },
      ...CONVERT_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/convert/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
      ...CONVERT_TOOLS.flatMap((t: { slug: string }) =>
        valuesFor(t.slug).map((v) => ({
          url: `${BASE}/${lang}/convert/${t.slug}/${valueSlug(v)}`, changeFrequency: monthly, priority: 0.6,
        })),
      ),
    ]),
    { url: `${BASE}/rate`, changeFrequency: weekly, priority: 0.95 },
    ...RATE_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/rate/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    // 비율 계산도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/rate`, changeFrequency: weekly, priority: 0.9 },
      ...RATE_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/rate/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/body`, changeFrequency: weekly, priority: 0.95 },
    ...BODY_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/body/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    /*
     * BMI 격자 — /body/bmi/<키>-<몸무게>. 키 51 × 몸무게 81 = 4,131칸이 언어마다 붙는다.
     * "키 170 몸무게 70"은 실제로 치는 말이라 BMI 계산기 페이지보다 이쪽이 검색에 가깝다.
     * 격자와 기준선은 lib/body/bmi-grid.ts.
     */
    ...BMI_CELLS.map((c) => ({
      url: `${BASE}/body/bmi/${bmiCellSlug(c.height, c.weight)}`, changeFrequency: monthly, priority: 0.7,
    })),
    /* 운동별 칼로리 — MET 계산기는 이미 있고 여기는 "수영이 몇 MET인가"를 받는다 */
    ...EXERCISES.map((x) => ({
      url: `${BASE}/body/exercise/${x.slug}`, changeFrequency: monthly, priority: 0.8,
    })),
    /* 연봉 실수령 값 낱장 — 한국어 전용(4대보험·소득세는 한국 제도다) */
    ...SALARIES.map((v) => ({
      url: `${BASE}/calculator/salary/${v}`, changeFrequency: yearly, priority: 0.8,
    })),
    /* 대출 상환방식 값 낱장 — 요율이 안 들어가는 순수 계산이라 안 낡는다 */
    ...allLoanCells().map((c) => ({
      url: `${BASE}/calculator/loan-method/${loanSlug(c.principal, c.rate, c.term)}`,
      changeFrequency: yearly, priority: 0.8,
    })),
    /* 퇴직금 값 낱장 — 한국어 전용(근로자퇴직급여 보장법은 한국 제도다) */
    ...allSeveranceCells().map((c) => ({
      url: `${BASE}/calculator/severance/${severanceSlug(c.wage, c.years)}`,
      changeFrequency: yearly, priority: 0.8,
    })),
    // 몸 수치도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/body`, changeFrequency: weekly, priority: 0.9 },
      ...BODY_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/body/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
      ...BMI_CELLS.map((c) => ({
        url: `${BASE}/${lang}/body/bmi/${bmiCellSlug(c.height, c.weight)}`, changeFrequency: monthly, priority: 0.6,
      })),
      ...EXERCISES.map((x) => ({
        url: `${BASE}/${lang}/body/exercise/${x.slug}`, changeFrequency: monthly, priority: 0.7,
      })),
    ]),
    { url: `${BASE}/craft`, changeFrequency: weekly, priority: 0.95 },
    ...CRAFT_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/craft/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    // 공예 계산도 slug가 아홉 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/craft`, changeFrequency: weekly, priority: 0.9 },
      ...CRAFT_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/craft/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/geometry`, changeFrequency: weekly, priority: 0.95 },
    ...GEO_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/geometry/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    // 도형 계산도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/geometry`, changeFrequency: weekly, priority: 0.9 },
      ...GEO_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/geometry/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/country`, changeFrequency: weekly, priority: 0.95 },
    ...COUNTRIES.map((c: { slug: string }) => ({ url: `${BASE}/country/${c.slug}`, changeFrequency: weekly, priority: 0.9 })),
    // 나라 정보도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/country`, changeFrequency: weekly, priority: 0.9 },
      ...COUNTRIES.map((c: { slug: string }) => ({
        url: `${BASE}/${lang}/country/${c.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/hanja`, changeFrequency: weekly, priority: 0.95 },
    ...IDIOMS.map((i: { slug: string }) => ({ url: `${BASE}/hanja/${i.slug}`, changeFrequency: weekly, priority: 0.9 })),
    /* 한자는 한자 문화권에서만 낸다 — 스페인어 훈음은 아무도 안 친다.
       목록은 lib/i18n/lang.ts의 SECTION_LOCALES 하나뿐이다 */
    ...INTL_LOCALES10.filter((lang) => sectionHasLocale('hanja', lang)).flatMap((lang) => [
      { url: `${BASE}/${lang}/hanja`, changeFrequency: weekly, priority: 0.9 },
      ...IDIOMS.map((i: { slug: string }) => ({
        url: `${BASE}/${lang}/hanja/${i.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/crypto`, changeFrequency: weekly, priority: 0.9 },
    // 도시 시계 116장도 여덟 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) =>
      TIME_CITIES.map((c: { slug: string }) => ({
        url: `${BASE}${prefix}/time/${c.slug}`,
        changeFrequency: weekly,
        priority: 0.8,
      })),
    ),
    // 오류 문구도 열 언어다 — 뜻과 대처만 옮기고 문구는 그대로 둔다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/error`, changeFrequency: weekly, priority: 0.9 },
      ...ERR_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/error/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 키보드 단축키도 열 언어다 — 목록과 낱장을 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/shortcut`, changeFrequency: weekly, priority: 0.9 },
      ...SC_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/shortcut/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 이모지 뜻도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/emoji`, changeFrequency: weekly, priority: 0.9 },
      ...EM_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/emoji/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 터미널 명령어도 열 언어다 — 목록과 낱장을 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/cmd`, changeFrequency: weekly, priority: 0.9 },
      ...CMD_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/cmd/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // HTTP 상태 코드와 헤더 132가지도 여덟 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/http`, changeFrequency: weekly, priority: 0.9 },
      ...HTTP_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/http/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // CSS 속성 154개도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/css`, changeFrequency: weekly, priority: 0.9 },
      ...CSS_PROPS.map((p: { name: string }) => ({
        url: `${BASE}${prefix}/css/${p.name}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 이미지 크기 116가지도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/image/size`, changeFrequency: weekly, priority: 0.9 },
      ...IMG_SIZES.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/image/size/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // HTML 태그 126개도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/html`, changeFrequency: weekly, priority: 0.9 },
      ...TAGS.map((t: { name: string }) => ({
        url: `${BASE}${prefix}/html/${t.name}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 특수문자 168자도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/text/char`, changeFrequency: weekly, priority: 0.9 },
      ...GLYPHS.map((g: { slug: string }) => ({
        url: `${BASE}${prefix}/text/char/${g.slug}`,
        changeFrequency: monthly,
        priority: 0.75,
      })),
    ]),
    // 타로 78장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/fortune/card`, changeFrequency: weekly, priority: 0.85 },
      ...CARDS.map((c: { slug: string }) => ({
        url: `${BASE}${prefix}/fortune/card/${c.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 확장자 140장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/ext`, changeFrequency: weekly, priority: 0.9 },
      ...EXTS.map((x: { ext: string }) => ({
        url: `${BASE}${prefix}/ext/${x.ext}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 주파수 113장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/sound/hz`, changeFrequency: weekly, priority: 0.85 },
      ...FREQS.map((f: { hz: number }) => ({
        url: `${BASE}${prefix}/sound/hz/${freqSlug(f.hz)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 화면 규격 108장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/device/screen`, changeFrequency: weekly, priority: 0.85 },
      ...SCREENS.map((sc: { slug: string }) => ({
        url: `${BASE}${prefix}/device/screen/${sc.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 홀덤 시작 핸드 169장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/game/poker`, changeFrequency: weekly, priority: 0.9 },
      ...HANDS.map((h: { slug: string }) => ({
        url: `${BASE}${prefix}/game/poker/${h.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 체스 오프닝 174장은 열 언어다 — 중국어 간체·번체가 여기서 처음 들어간다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/game/chess`, changeFrequency: weekly, priority: 0.9 },
      ...OPENINGS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/game/chess/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 원소 118장도 여덟 언어다 — 주기율표 자체가 목록이다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/element`, changeFrequency: weekly, priority: 0.85 },
      ...ELEMENTS.map((x: { z: number }) => ({
        url: `${BASE}${prefix}/element/${x.z}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 수 209장도 열 언어다 — 격자가 곧 목록이다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/number`, changeFrequency: weekly, priority: 0.85 },
      ...NUMBERS.map((n: number) => ({
        url: `${BASE}${prefix}/number/${n}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // ASCII 128장도 열 언어다 — 코드표가 곧 목록이다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/ascii`, changeFrequency: weekly, priority: 0.85 },
      ...CODES.map((code: number) => ({
        url: `${BASE}${prefix}/ascii/${code}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 포트 127장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/port`, changeFrequency: weekly, priority: 0.85 },
      ...PORTS.map((x: { port: number }) => ({
        url: `${BASE}${prefix}/port/${x.port}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 권한 모드 125장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/chmod`, changeFrequency: weekly, priority: 0.85 },
      ...CHMOD_MODES.map((mode: string) => ({
        url: `${BASE}${prefix}/chmod/${mode}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 저항 144장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/resistor`, changeFrequency: weekly, priority: 0.85 },
      ...RESISTOR_VALUES.map((ohms: number) => ({
        url: `${BASE}${prefix}/resistor/${ohms}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 분수 127장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/fraction`, changeFrequency: weekly, priority: 0.85 },
      ...FRACTIONS.map((f: { n: number; d: number }) => ({
        url: `${BASE}${prefix}/fraction/${fractionSlug(f)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 키 코드 120장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/keycode`, changeFrequency: weekly, priority: 0.85 },
      ...KEYS.map((x: { code: string }) => ({
        url: `${BASE}${prefix}/keycode/${keySlug(x as never)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 프리픽스 162장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/cidr`, changeFrequency: weekly, priority: 0.85 },
      ...PREFIXES.map((p: { family: 'v4' | 'v6'; bits: number }) => ({
        url: `${BASE}${prefix}/cidr/${cidrSlug(p)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 부호 116장도 열 언어다 — 글자 쉰둘과 점자 셀 예순넷
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/code`, changeFrequency: weekly, priority: 0.85 },
      ...CODE_CHARS.map((x: { name: string }) => ({
        url: `${BASE}${prefix}/code/${charSlug(x as never)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
      ...CODE_CELLS.map((m: number) => ({
        url: `${BASE}${prefix}/code/${cellSlug(m)}`,
        changeFrequency: monthly,
        priority: 0.75,
      })),
    ]),
    // 다트 마무리 169장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/darts`, changeFrequency: weekly, priority: 0.85 },
      ...DARTS_SCORES.map((score: number) => ({
        url: `${BASE}${prefix}/darts/${score}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 곱셈 210장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/times`, changeFrequency: weekly, priority: 0.85 },
      ...TIMES_PRODUCTS.map((p: { a: number; b: number }) => ({
        url: `${BASE}${prefix}/times/${timesSlug(p)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 제곱근 200장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/sqrt`, changeFrequency: weekly, priority: 0.85 },
      ...SQRT_NUMBERS.map((n: number) => ({
        url: `${BASE}${prefix}/sqrt/${n}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 로마 숫자 연도 201장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/roman`, changeFrequency: weekly, priority: 0.85 },
      ...ROMAN_YEARS.map((y: number) => ({
        url: `${BASE}${prefix}/roman/${y}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 타이어 규격 204장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/tire`, changeFrequency: weekly, priority: 0.85 },
      ...TIRES.map((t: { width: number; aspect: number; rim: number }) => ({
        url: `${BASE}${prefix}/tire/${tireSlug(t)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 나사 규격 114장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/screw`, changeFrequency: weekly, priority: 0.85 },
      ...SCREWS.map((w: { d: number; p: number; coarse: boolean }) => ({
        url: `${BASE}${prefix}/screw/${screwSlug(w)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 연도 201장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/year`, changeFrequency: weekly, priority: 0.85 },
      ...CAL_YEARS.map((y: number) => ({
        url: `${BASE}${prefix}/year/${y}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 러닝 페이스 241장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/pace`, changeFrequency: weekly, priority: 0.85 },
      ...PACES.map((p: number) => ({
        url: `${BASE}${prefix}/pace/${paceSlug(p)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // CSS 단위 120장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/rem`, changeFrequency: weekly, priority: 0.85 },
      ...PIXELS.map((px: number) => ({
        url: `${BASE}${prefix}/rem/${px}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 정지거리 141장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/stop`, changeFrequency: weekly, priority: 0.85 },
      ...SPEEDS.map((v: number) => ({
        url: `${BASE}${prefix}/stop/${v}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 고도 101장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/altitude`, changeFrequency: weekly, priority: 0.85 },
      ...ALTITUDES.map((m: number) => ({
        url: `${BASE}${prefix}/altitude/${m}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 와이파이 채널 101장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/wifi`, changeFrequency: weekly, priority: 0.85 },
      ...CHANNELS.map(c => ({
        url: `${BASE}${prefix}/wifi/${wifiSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 기타 지판 144장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/fret`, changeFrequency: weekly, priority: 0.85 },
      ...SPOTS.map(p => ({
        url: `${BASE}${prefix}/fret/${fretSlug(p)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 천체별 몸무게 101장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/gravity`, changeFrequency: weekly, priority: 0.85 },
      ...WEIGHTS.map((w: number) => ({
        url: `${BASE}${prefix}/gravity/${w}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 체감온도 210장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/windchill`, changeFrequency: weekly, priority: 0.85 },
      ...WC_CELLS.map(c => ({
        url: `${BASE}${prefix}/windchill/${wcSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 이슬점 189장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/dew`, changeFrequency: weekly, priority: 0.85 },
      ...DEW_CELLS.map(c => ({
        url: `${BASE}${prefix}/dew/${dewSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 와인 병 126장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/wine`, changeFrequency: weekly, priority: 0.85 },
      ...WINE_CELLS.map(c => ({
        url: `${BASE}${prefix}/wine/${wineSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 술 224장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/drink`, changeFrequency: weekly, priority: 0.85 },
      ...DRINK_CELLS.map(c => ({
        url: `${BASE}${prefix}/drink/${drinkSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 공기청정기 224장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/purifier`, changeFrequency: weekly, priority: 0.85 },
      ...PURIFIER_CELLS.map(c => ({
        url: `${BASE}${prefix}/purifier/${purifierSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 도시 사이 342장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/flight`, changeFrequency: weekly, priority: 0.85 },
      ...FLIGHT_CELLS.map(c => ({
        url: `${BASE}${prefix}/flight/${flightSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // RAID 192장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/raid`, changeFrequency: weekly, priority: 0.85 },
      ...RAID_CELLS.map(c => ({
        url: `${BASE}${prefix}/raid/${raidSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    /* 혈액형 유전 512장은 한자 문화권 넷에만 낸다 — SECTION_LOCALES */
    ...METRO_LANGS.filter((l) => sectionHasLocale('heredity', l.locale)).flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/heredity`, changeFrequency: weekly, priority: 0.85 },
      ...HEREDITY_CELLS.map(c => ({
        url: `${BASE}${prefix}/heredity/${heredSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 노출값 209장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/exposure`, changeFrequency: weekly, priority: 0.85 },
      ...EXPOSURE_CELLS.map(c => ({
        url: `${BASE}${prefix}/exposure/${exposureSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 수혈 적합 192장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/blood`, changeFrequency: weekly, priority: 0.85 },
      ...BLOOD_CELLS.map(c => ({
        url: `${BASE}${prefix}/blood/${bloodSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 침대 144장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/bed`, changeFrequency: weekly, priority: 0.85 },
      ...BED_CELLS.map(c => ({
        url: `${BASE}${prefix}/bed/${bedSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 지진 규모 111장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/quake`, changeFrequency: weekly, priority: 0.85 },
      ...QUAKE_MAGS.map((m: number) => ({
        url: `${BASE}${prefix}/quake/${quakeSlug(m)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 전자레인지 144장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/microwave`, changeFrequency: weekly, priority: 0.85 },
      ...MW_CELLS.map(c => ({
        url: `${BASE}${prefix}/microwave/${mwSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 골프 핸디캡 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/golf`, changeFrequency: weekly, priority: 0.85 },
      ...GOLF_CELLS.map(c => ({
        url: `${BASE}${prefix}/golf/${golfSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 보조배터리 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/powerbank`, changeFrequency: weekly, priority: 0.85 },
      ...PB_CELLS.map(c => ({
        url: `${BASE}${prefix}/powerbank/${pbSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 목재 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/lumber`, changeFrequency: weekly, priority: 0.85 },
      ...LUMBER_CELLS.map(c => ({
        url: `${BASE}${prefix}/lumber/${lumberSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    /* 다다미 100장은 한자 문화권 넷에만 낸다 — SECTION_LOCALES */
    ...METRO_LANGS.filter((l) => sectionHasLocale('tatami', l.locale)).flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/tatami`, changeFrequency: weekly, priority: 0.85 },
      ...TATAMI_CELLS.map(c => ({
        url: `${BASE}${prefix}/tatami/${tatamiSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 케이블 대역폭 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/cable`, changeFrequency: weekly, priority: 0.85 },
      ...CABLE_CELLS.map(c => ({
        url: `${BASE}${prefix}/cable/${cableSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    /* 일본 연호 163장은 한자 문화권 넷에만 낸다 — SECTION_LOCALES */
    ...METRO_LANGS.filter((l) => sectionHasLocale('gengo', l.locale)).flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/gengo`, changeFrequency: weekly, priority: 0.85 },
      ...GENGO_CELLS.map(c => ({
        url: `${BASE}${prefix}/gengo/${gengoSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 큰 수 단위 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/bignum`, changeFrequency: weekly, priority: 0.85 },
      ...BIG_CELLS.map(c => ({
        url: `${BASE}${prefix}/bignum/${bigSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // TV 시청거리 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/viewing`, changeFrequency: weekly, priority: 0.85 },
      ...VIEW_CELLS.map(c => ({
        url: `${BASE}${prefix}/viewing/${viewSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 비밀번호 세기 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/password`, changeFrequency: weekly, priority: 0.85 },
      ...PW_CELLS.map(c => ({
        url: `${BASE}${prefix}/password/${pwSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 반려동물 사료량 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/petfood`, changeFrequency: weekly, priority: 0.85 },
      ...PET_CELLS.map(c => ({
        url: `${BASE}${prefix}/petfood/${petSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 브래지어 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/bra`, changeFrequency: weekly, priority: 0.85 },
      ...BRA_CELLS.map(c => ({
        url: `${BASE}${prefix}/bra/${braSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 옷 사이즈 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/size`, changeFrequency: weekly, priority: 0.85 },
      ...SIZE_CELLS.map(c => ({
        url: `${BASE}${prefix}/size/${sizeSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 대기질 108장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/air`, changeFrequency: weekly, priority: 0.85 },
      ...AIR_CELLS.map(c => ({
        url: `${BASE}${prefix}/air/${airSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 단열 144장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/insul`, changeFrequency: weekly, priority: 0.85 },
      ...INSUL_CELLS.map(c => ({
        url: `${BASE}${prefix}/insul/${insulSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 등산 150장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/hike`, changeFrequency: weekly, priority: 0.85 },
      ...HIKE_CELLS.map(c => ({
        url: `${BASE}${prefix}/hike/${hikeSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 자외선 126장도 열 언어다
    // 피사계 심도 120칸도 열 언어다 — 초점거리 12가지 × 조리개 10가지
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/dof`, changeFrequency: weekly, priority: 0.85 },
      ...DOF_CELLS.map(c => ({
        url: `${BASE}${prefix}/dof/${dofSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 자전거 기어 168칸도 열 언어다 — 체인링 12가지 × 스프라켓 14가지
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/gear`, changeFrequency: weekly, priority: 0.85 },
      ...GEAR_CELLS.map(c => ({
        url: `${BASE}${prefix}/gear/${gearSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 반지 사이즈 101칸도 열 언어다 — 내주 40.0~90.0mm를 0.5mm씩
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/ring`, changeFrequency: weekly, priority: 0.85 },
      ...RING_CELLS.map(mm => ({
        url: `${BASE}${prefix}/ring/${ringSlug(mm)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 세탁 기호 86칸도 열 언어다 — 갈래 다섯 × 요소 조합(칸이 자기 slug를 든다)
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/laundry`, changeFrequency: weekly, priority: 0.85 },
      ...LAUNDRY_CELLS.map(c => ({
        url: `${BASE}${prefix}/laundry/${c.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 마우스 감도 128칸도 열 언어다 — 게임 쌍 56 + 게임×DPI 72
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/dpi`, changeFrequency: weekly, priority: 0.85 },
      ...DPI_CELLS.map(c => ({
        url: `${BASE}${prefix}/dpi/${c.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 태양 고도 224칸도 열 언어다 — 위도 14가지 × 날짜 16가지
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/sun`, changeFrequency: weekly, priority: 0.85 },
      ...SUN_CELLS.map(c => ({
        url: `${BASE}${prefix}/sun/${sunSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 물 경도 120칸도 열 언어다 — ppm 눈금 5~500은 5씩, 525~1000은 25씩
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/hardness`, changeFrequency: weekly, priority: 0.85 },
      ...HARDNESS_CELLS.map(ppm => ({
        url: `${BASE}${prefix}/hardness/${hardnessSlug(ppm)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 강재 149칸도 열 언어다 — 형상 7가지 × 유통 치수
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/steel`, changeFrequency: weekly, priority: 0.85 },
      ...STEEL_CELLS.map(c => ({
        url: `${BASE}${prefix}/steel/${steelSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 모터 136칸도 열 언어다 — 출력 17가지 × 회전수 8가지(50Hz·60Hz)
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/motor`, changeFrequency: weekly, priority: 0.85 },
      ...MOTOR_CELLS.map(c => ({
        url: `${BASE}${prefix}/motor/${motorSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 철근 117칸도 열 언어다 — 규격 13가지 × 길이 9가지
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/rebar`, changeFrequency: weekly, priority: 0.85 },
      ...REBAR_CELLS.map(c => ({
        url: `${BASE}${prefix}/rebar/${rebarSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 비료 135칸도 열 언어다 — 비료 15가지 × 면적 9가지
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/fertilizer`, changeFrequency: weekly, priority: 0.85 },
      ...FERTILIZER_CELLS.map(c => ({
        url: `${BASE}${prefix}/fertilizer/${fertilizerSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 필라멘트 48칸도 열 언어다 — 재료 8가지 × 스풀 무게 6가지
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/filament`, changeFrequency: weekly, priority: 0.85 },
      ...FILAMENT_CELLS.map(c => ({
        url: `${BASE}${prefix}/filament/${filamentSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 딜레이 타임 288칸도 열 언어다 — 템포 24가지 × 음표 12가지
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/bpm`, changeFrequency: weekly, priority: 0.85 },
      ...BPM_CELLS.map(c => ({
        url: `${BASE}${prefix}/bpm/${bpmSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/uv`, changeFrequency: weekly, priority: 0.85 },
      ...UV_CELLS.map(c => ({
        url: `${BASE}${prefix}/uv/${uvSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 가전 전류 160장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/ampere`, changeFrequency: weekly, priority: 0.85 },
      ...AMP_CELLS.map(c => ({
        url: `${BASE}${prefix}/ampere/${ampSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 방 밝기 160장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/lumen`, changeFrequency: weekly, priority: 0.85 },
      ...LUMEN_CELLS.map(c => ({
        url: `${BASE}${prefix}/lumen/${lumenSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 조임 토크 152장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/torque`, changeFrequency: weekly, priority: 0.85 },
      ...TORQUE_CELLS.map(c => ({
        url: `${BASE}${prefix}/torque/${torqueSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 종이 280장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/paper`, changeFrequency: weekly, priority: 0.85 },
      ...PAPER_CELLS.map(c => ({
        url: `${BASE}${prefix}/paper/${paperSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 전선 200장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/wire`, changeFrequency: weekly, priority: 0.85 },
      ...WIRE_CELLS.map(c => ({
        url: `${BASE}${prefix}/wire/${wireSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 배터리 충전 200장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/battery`, changeFrequency: weekly, priority: 0.85 },
      ...BATT_CELLS.map(c => ({
        url: `${BASE}${prefix}/battery/${battSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 다운로드 240장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/bandwidth`, changeFrequency: weekly, priority: 0.85 },
      ...BW_CELLS.map(c => ({
        url: `${BASE}${prefix}/bandwidth/${bwSlug(c)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 드릴 비트 187장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/drill`, changeFrequency: weekly, priority: 0.85 },
      ...BITS.map(b => ({
        url: `${BASE}${prefix}/drill/${drillSlug(b)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 정규식 133장도 여덟 언어다 — 표기법과 검사식을 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/text/regex`, changeFrequency: weekly, priority: 0.85 },
      ...PATTERNS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/text/regex/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 주사위 확률 111장도 여덟 언어다 — 한 개부터 여섯 개까지의 모든 합
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/random/dice`, changeFrequency: weekly, priority: 0.85 },
      ...ROLLS.map((r: { slug: string }) => ({
        url: `${BASE}${prefix}/random/dice/${r.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 큐브 공식 119장도 여덟 언어다 — F2L·OLL·PLL을 함께 싣는다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/game/cube`, changeFrequency: weekly, priority: 0.85 },
      ...ALGS.map((a: { slug: string }) => ({
        url: `${BASE}${prefix}/game/cube/${a.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 렌즈 화각 104장도 여덟 언어다 — 초점거리 스물여섯에 센서 넷
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/snap/lens`, changeFrequency: weekly, priority: 0.85 },
      ...LENSES.map((l: { slug: string }) => ({
        url: `${BASE}${prefix}/snap/lens/${l.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 재료 무게 125장도 여덟 언어다 — 도구는 따로 실려 있고 이건 이름 페이지다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) =>
      INGREDIENTS.map((i: { slug: string }) => ({
        url: `${BASE}${prefix}/food/${i.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ),
    // 색 이름 110장도 여덟 언어다 — 도구는 ko·en뿐이지만 이름 페이지는 전부 있다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) =>
      NAMED_COLORS_8.map((c: { slug: string }) => ({
        url: `${BASE}${prefix}/color/${c.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ),
    /* 도시 쌍 시차 낱장 × 열 언어 — 한쪽이 그 나라 대표 도시인 쌍만 낸다.
       까닭은 lib/time/pair-grid.ts 머리말 */
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) =>
      allCityPairs().map((p) => ({
        url: `${BASE}${prefix}/time/${pairSlug(p.a, p.b)}`,
        changeFrequency: yearly,
        priority: 0.7,
      })),
    ),
    /* hex 낱장 4,096색 × 열 언어 — 세 자리 줄임 표기를 빠짐없이 낸다.
       목록에 규칙이 있어 구멍이 없다. 까닭은 lib/color/hex-grid.ts 머리말 */
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) =>
      allHexShorts().map((h) => ({
        url: `${BASE}${prefix}/color/${hexSlug(h)}`,
        changeFrequency: yearly,
        priority: 0.6,
      })),
    ),
    // 색 허브는 아래 INTL_LOCALES10 묶음이 열 언어를 모두 낸다 — 여기서 또 내면 여덟 개가 두 번 실린다
    // 음악 이론도 여덟 언어다 — 지하철과 같은 목록을 돈다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/music`, changeFrequency: weekly, priority: prefix === '' ? 0.9 : 0.85 },
      ...MUSIC_ITEMS.map((i: { slug: string }) => ({
        url: `${BASE}${prefix}/music/${i.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 지하철은 여덟 언어다. 언어를 손으로 적으면 하나를 빼먹으니 목록에서 돈다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/metro`, changeFrequency: weekly, priority: prefix === '' ? 0.95 : 0.9 },
      ...METRO_LINES.map((l: { slug: string }) => ({
        url: `${BASE}${prefix}/metro/${l.slug}`,
        changeFrequency: weekly,
        priority: prefix === '' ? 0.9 : 0.85,
      })),
    ]),
    { url: `${BASE}/crypto/signals`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/atr-tpsl`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/kimchi-premium`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/liquidation-calculator`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/dca-calculator`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/funding-rates`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/position-size-calculator`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/altseason-index`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/all-time-high`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/profit-calculator`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/halving-countdown`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/fear-greed-index`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/long-short-ratio`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/seasonality`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/correlation`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/compare`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/compound-calculator`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/risk-adjusted`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/risk-of-ruin`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/stablecoin-depeg`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/drawdown`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/volatility`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/rebalancing`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/day-of-week`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/kelly-criterion`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/sold-at-top`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/bitcoin-vs-gold`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/impermanent-loss`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/slippage`, changeFrequency: weekly, priority: 0.9 },
    // 코인별 price-prediction 페이지는 noindex 처리했으므로 사이트맵에서 제외한다.
    // (noindex인 URL을 사이트맵에 남겨두면 색인 요청과 모순되는 신호가 된다.)
    // 언어별 첫 화면. 레지스트리에서 만들어야 언어를 늘렸을 때 여기가 안 빠진다
    ...INTL_LOCALES10.map((lang) => ({ url: `${BASE}/${lang}`, changeFrequency: weekly, priority: 0.95 })),
    // 중국어 첫 화면은 위의 INTL_LOCALES10이 이미 낸다 — 따로 적으면 사이트맵에 두 번 실린다
    // 생성기는 영어 + 여덟 언어가 같은 스무 종을 가진다
    { url: `${BASE}/en/generator`, changeFrequency: weekly, priority: 0.9 },
    ...GENERATORS_EN.map((g: { slug: string }) => ({ url: `${BASE}/en/generator/${g.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ...(Object.entries(GENERATORS_INTL) as [string, { slug: string }[]][]).flatMap(([lang, gens]) => [
      { url: `${BASE}/${lang}/generator`, changeFrequency: weekly, priority: 0.9 },
      ...gens.map(g => ({ url: `${BASE}/${lang}/generator/${g.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ]),
    // 랜덤 뽑기도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/random`, changeFrequency: weekly, priority: 0.9 },
      ...RANDOM_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/random/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    // 운세 열아홉 장 × 아홉 언어. 한국어는 위쪽 블록에 따로 실려 있다.
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/fortune`, changeFrequency: weekly, priority: 0.9 },
      ...FORTUNE_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/fortune/${t.slug}`,
        changeFrequency: weekly,
        priority: 0.8,
      })),
    ]),
    // 스냅테스트 열두 장 × 아홉 언어. 한국어는 위쪽 블록에 따로 실려 있다.
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/snap`, changeFrequency: weekly, priority: 0.9 },
      ...SNAP_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/snap/${t.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
      // 새 스냅테스트는 SNAP_TOOLS(아홉 언어 표)가 아니라 열 언어짜리 표에 있다
      ...NEW_SNAP_SLUGS.map(slug => ({
        url: `${BASE}/${lang}/snap/${slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/time`, changeFrequency: weekly, priority: 0.9 },
      ...timeToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/time/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    // 색상 도구는 번역 열 언어 전부 나간다 — 언어를 늘리면 INTL_LOCALES10만 커지면 된다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/color`, changeFrequency: weekly, priority: 0.9 },
      ...colorToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/color/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/image`, changeFrequency: weekly, priority: 0.9 },
      ...imageToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/image/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/sound`, changeFrequency: weekly, priority: 0.9 },
      ...soundToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/sound/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/food`, changeFrequency: weekly, priority: 0.9 },
      ...foodToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/food/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/game`, changeFrequency: weekly, priority: 0.9 },
      ...gameToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/game/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/device`, changeFrequency: weekly, priority: 0.9 },
      ...deviceToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/device/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/text`, changeFrequency: weekly, priority: 0.9 },
      ...textToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/text/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    // 통합 검색은 번역 일곱 언어 모두 나간다
    ...INTL_LOCALES10.map((lang) => ({ url: `${BASE}/${lang}/search`, changeFrequency: weekly, priority: 0.7 })),
    // 심리테스트는 한국어를 뺀 아홉 언어가 같은 다섯 종을 가진다
    ...(Object.entries(TESTS_INTL) as [string, { slug: string }[]][]).flatMap(([lang, tests]) => [
      { url: `${BASE}/${lang}/test`, changeFrequency: weekly, priority: 0.9 },
      ...tests.map(t => ({ url: `${BASE}/${lang}/test/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ]),
    // 퀴즈도 한국어를 뺀 아홉 언어가 같은 여섯 종을 가진다
    ...(Object.entries(QUIZZES_INTL) as [string, { slug: string }[]][]).flatMap(([lang, quizzes]) => [
      { url: `${BASE}/${lang}/quiz`, changeFrequency: weekly, priority: 0.9 },
      ...quizzes.map(q => ({ url: `${BASE}/${lang}/quiz/${q.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ]),
    // 체크리스트도 한국어를 뺀 아홉 언어가 같은 12종을 가진다
    ...(Object.entries(CHECKLISTS_INTL) as [string, { slug: string }[]][]).flatMap(([lang, lists]) => [
      { url: `${BASE}/${lang}/checklist`, changeFrequency: weekly, priority: 0.9 },
      ...lists.map(c => ({ url: `${BASE}/${lang}/checklist/${c.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ]),







    { url: `${BASE}/calculator/en`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/calculator/ja`, changeFrequency: weekly, priority: 0.9 },
    ...calculatorRoutes.map(r => ({ url: `${BASE}${r}`, changeFrequency: monthly, priority: 0.8 })),
    /*
     * 계산기 다국어판 — 백일곱 개 중 나라를 타지 않는 것만 온다. 목록을 여기
     * 다시 적지 않고 CALC_INTL_SLUGS를 돌린다. 적어 두면 번역을 더했을 때
     * 사이트맵만 옛날 것으로 남고, 그 페이지는 아무도 못 찾는다.
     */
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/calculator`, changeFrequency: weekly, priority: 0.9 },
      ...CALC_INTL_SLUGS.map((slug) => ({
        url: `${BASE}/${lang}/calculator/${slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    ...devRoutes.map(r => ({ url: `${BASE}${r}`, changeFrequency: monthly, priority: 0.7 })),
    ...TESTS.map((t: { slug: string }) => ({ url: `${BASE}/test/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ...QUIZZES.map((q: { slug: string }) => ({ url: `${BASE}/quiz/${q.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ...GENERATORS.map((g: { slug: string }) => ({ url: `${BASE}/generator/${g.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ...CHECKLISTS.map((c: { slug: string }) => ({ url: `${BASE}/checklist/${c.slug}`, changeFrequency: monthly, priority: 0.8 })),
  ];
}

/**
 * ── 사이트맵을 쪼개는 이유 (2026-08-10) ────────────────────────
 * 사이트맵 규약은 파일 하나에 **주소 5만 개, 압축 전 50MB**까지만 허용한다.
 * 그런데 이 사이트는 주소가 16만 개가 넘어 한 파일이 19MB에 164,000줄이었다.
 * 크기는 안에 들었지만 **개수가 세 배 넘게 넘쳐** 규약을 어긴 파일이었고,
 * 구글과 빙은 그런 사이트맵을 앞부분만 읽거나 통째로 버린다. 즉 주소의
 * 3분의 2가 검색엔진에 안 보이고 있었다.
 *
 * 그래서 파일을 나눴다. 45,000으로 잡은 것은 5만에 딱 붙이면 섹션 하나만 늘어도
 * 다시 넘치기 때문이다 — 언어 하나가 이 수를 넘길 때만 그 언어가 두 파일이 된다.
 * 파일을 묶는 목록은 app/sitemap-index.xml/route.ts가 낸다.
 */
export const CHUNK_SIZE = 45_000;

/**
 * ── 언어마다 파일 하나, 주소는 /sitemap.xml 의 형제 (2026-08-12) ──────
 *
 *   /sitemap.xml     ko        19,903   ← 구글이 이미 등록해 둔 주소다
 *   /sitemap2.xml    en        18,995
 *   /sitemap3.xml    es
 *   …
 *   /sitemap10.xml   zh-hant
 *
 * 서치 콘솔이 알려 준 것: `/sitemap.xml` 발견된 페이지 **50,000**, 마지막 읽음
 * 8월 8일. 구글은 사이트맵을 앞에서부터 읽고 제 예산에서 끊는다. 그때 읽힌 5만
 * 개를 세어 보니 열 언어에 얇게 퍼져 한국어는 19,903개 중 5,218개(26%)뿐이었고,
 * 끊긴 자리는 `fr/game/poker/k9s`처럼 값만 바꿔 찍은 표였다.
 *
 * ── 왜 언어마다 하나인가 ───────────────────────────────────
 * 서치 콘솔은 **사이트맵 파일별로** 색인 현황을 보여 준다. 파일이 언어별이면
 * "영어는 몇 % 색인됐고 다른 언어는 몇 %인가"를 바로 읽을 수 있다. 45,000개씩
 * 기계적으로 자르면 파일마다 언어가 섞여 그 수치가 아무것도 말해 주지 않는다.
 *
 * ── 앞자리를 영어로 돌렸다 (2026-08-14) ────────────────────
 * 처음에는 한국어가 /sitemap.xml이었다. 유입이 한국어에서 온다고 봤기 때문이다.
 * 목표가 바뀌었다 — **국외 유입, 특히 구글이 먼저다.** 구글은 사이트맵을 앞에서
 * 부터 읽고 제 예산에서 끊으므로, 앞자리에 두는 언어가 곧 우선순위다.
 * 그래서 en을 첫 조각으로 올리고 ko를 맨 뒤로 내렸다.
 *
 * 파일 번호가 한 번 밀리는 값을 치른다(서치 콘솔의 파일별 이력이 한 번 끊긴다).
 * 지금 하지 않으면 늘어난 뒤에 더 크게 치르므로 여기서 끝낸다.
 *
 * ── 한 언어가 여러 조각을 가질 수 있다 ────────────────────
 * 예전에는 넘친 몫을 **목록 맨 뒤**에 붙였다. 그러면 그 언어가 앞뒤로 찢어져
 * 앞자리에 두는 뜻이 사라진다. 지금은 한 언어의 조각이 늘 붙어 있고 언어 순서도
 * 지켜진다 — ko가 두 조각이 되면 en은 그만큼 뒤로 밀린다.
 *
 * ── 왜 /sitemap/0.xml 이 아닌가 ────────────────────────────
 * Next의 generateSitemaps는 반드시 `/sitemap/<id>.xml` 밑에 만든다. 그러면 이미
 * 등록된 /sitemap.xml이 목록 파일이 되고 실제 주소는 한 칸 밑으로 내려간다.
 * 그래서 generateSitemaps를 쓰지 않고 형제 라우트로 낸다 —
 * app/sitemap2.xml/route.ts … 가 각각 이 표의 한 칸을 낸다.
 *
 * 자리는 언어에 고정한다. 어느 언어가 45,000을 넘겨도 **뒤 번호를 밀지 않고**
 * 11번부터 뒤에 붙인다 — 1~10은 배포와 무관하게 늘 같은 언어를 가리킨다.
 * 밀리면 서치 콘솔이 파일별로 쌓아 둔 이력이 다른 언어를 가리키게 된다.
 */
/* 앞자리가 곧 우선순위다 — 국외 유입이 먼저라 en이 첫 조각, ko가 마지막이다 */
const SITEMAP_LANG_ORDER = ['en', 'es', 'pt-br', 'de', 'fr', 'ja', 'zh-hans', 'zh-hant', 'hi', 'ko'];

/** 주소의 언어 — 한국어는 접두어가 없으므로 아홉 개에 없으면 ko다 */
function langOfUrl(url: string): string {
  const first = url.replace(`${BASE}/`, '').replace(BASE, '').split('/')[0];
  return SITEMAP_LANG_ORDER.includes(first) && first !== 'ko' ? first : 'ko';
}

/**
 * 0번이 /sitemap.xml, 1번이 /sitemap2.xml … 언어 순서대로, 한 언어의 조각은 붙어 있다.
 *
 * 한 언어가 CHUNK_SIZE를 넘으면 그 언어가 **연달아** 여러 조각을 갖는다. 넘친 몫을
 * 목록 맨 뒤로 보내면 그 언어가 앞뒤로 찢어져, 앞자리에 두는 뜻이 사라진다.
 */
export function sitemapParts(): MetadataRoute.Sitemap[] {
  const byLang = new Map<string, MetadataRoute.Sitemap>();
  for (const e of allEntries()) {
    const k = langOfUrl(String(e.url));
    const arr = byLang.get(k);
    if (arr) arr.push(e);
    else byLang.set(k, [e]);
  }

  const parts: MetadataRoute.Sitemap[] = [];
  const push = (g: MetadataRoute.Sitemap) => {
    for (let i = 0; i < g.length; i += CHUNK_SIZE) parts.push(g.slice(i, i + CHUNK_SIZE));
  };
  for (const l of SITEMAP_LANG_ORDER) push(byLang.get(l) ?? []);
  /* 목록에 없는 언어가 생기면 뒤에 붙는다 — 조용히 사라지지는 않는다 */
  for (const [l, g] of byLang) if (!SITEMAP_LANG_ORDER.includes(l)) push(g);
  return parts;
}

export function sitemapPartCount(): number {
  return Math.max(1, sitemapParts().length);
}

/** n번째(0부터) 파일의 주소 — 0은 /sitemap.xml, 그 뒤는 /sitemap2.xml … */
export function sitemapPartPath(n: number): string {
  return n === 0 ? '/sitemap.xml' : `/sitemap${n + 1}.xml`;
}

/**
 * 형제 라우트가 낼 XML.
 *
 * Next의 sitemap 규약이 만드는 것과 같은 꼴로 적는다 — 형제 라우트에서는 그
 * 직렬화를 쓸 수 없어 여기서 손으로 쓴다.
 */
export function sitemapXml(entries: MetadataRoute.Sitemap): string {
  const body = entries.map(e => {
    const parts = [`<loc>${e.url}</loc>`];
    if (e.changeFrequency) parts.push(`<changefreq>${e.changeFrequency}</changefreq>`);
    if (e.priority !== undefined) parts.push(`<priority>${e.priority}</priority>`);
    return `<url>${parts.join('')}</url>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

/**
 * 형제 라우트가 같은 꼴로 응답하게 한다.
 *
 * ── s-maxage를 한 시간에서 하루로 늘렸다 (2026-08-13) ──────────
 * 이 파일들은 force-static이라 **배포 때 구워지고 배포 사이에는 안 바뀐다.**
 * 그런데 한 시간짜리 캐시를 달고 있었다 — CDN이 한 시간마다 원본에서 다시
 * 받아 온다는 뜻이고, 그것이 Fast Origin Transfer(Hobby 30일 10GB)에 그대로
 * 얹힌다. 사이트맵은 이 사이트에서 가장 큰 파일 묶음이라(주소 이십만 개)
 * 이 한 줄이 낱장 수천 장 몫이다.
 *
 * 하루로 잡은 까닭: 새 페이지가 색인되려면 사이트맵이 크롤러에게 보여야 하므로
 * 무기한은 위험하다(배포가 CDN을 비우는지 확인되지 않았다 — 확인되면 더 늘릴 수
 * 있다). 배포가 주 1회쯤이니 하루면 새 주소가 늦어도 하루 뒤에는 보인다.
 */
export function sitemapResponse(n: number): Response {
  return new Response(sitemapXml(sitemapParts()[n] ?? []), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, must-revalidate',
    },
  });
}

/** /sitemap.xml — 한국어. 유입이 오는 언어를 이미 등록된 주소에 둔다 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return sitemapParts()[0] ?? [];
}
