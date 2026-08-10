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
import { RATE_TOOLS } from "@/lib/rate-tools";
import { BODY_TOOLS } from "@/lib/body-tools";
import { GEO_TOOLS } from "@/lib/geo-tools";
import { CRAFT_TOOLS } from "@/lib/craft-tools";
import { COUNTRIES } from "@/lib/country-tools";
import { IDIOMS } from "@/lib/hanja-tools";
import { METRO_LINES } from "@/lib/metro-lines";
import { METRO_LANGS } from "@/lib/metro/lang";
import { MUSIC_ITEMS } from "@/lib/music/catalog";
import { NAMED_COLORS_8 } from "@/lib/color/named8";
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

const BASE = "https://vixutil.com";

export const dynamic = "force-static";

const calculatorRoutes = [
  "/calculator/salary", "/calculator/parttime", "/calculator/minimum-wage", "/calculator/standard-wage", "/calculator/overtime",
  "/calculator/weekly-holiday", "/calculator/severance", "/calculator/annual-leave-pay", "/calculator/four-insurance",
  "/calculator/unemployment", "/calculator/parental-leave",
  "/calculator/freelance", "/calculator/to-hourly", "/calculator/to-annual", "/calculator/target-salary",
  "/calculator/loan", "/calculator/deposit", "/calculator/savings", "/calculator/compound", "/calculator/compound-goal",
  "/calculator/ltv", "/calculator/dsr", "/calculator/max-loan", "/calculator/car-installment",
  "/calculator/acquisition-tax", "/calculator/property-tax", "/calculator/holding-tax", "/calculator/capital-gains",
  "/calculator/gift-tax", "/calculator/inheritance-tax", "/calculator/comprehensive-tax", "/calculator/local-income-tax",
  "/calculator/business-income", "/calculator/dividend", "/calculator/vat", "/calculator/broker-fee", "/calculator/subscription-score",
  "/calculator/retirement-income-tax", "/calculator/rental-yield",
  "/calculator/rental-income-tax", "/calculator/jeonse-wolse",
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
  "/calculator/pregnancy", "/calculator/tip", "/calculator/dutch-pay", "/calculator/discount", "/calculator/gpa",
  "/calculator/age", "/calculator/birthday", "/calculator/dday", "/calculator/discharge", "/calculator/time-diff",
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

  return [
    { url: BASE, changeFrequency: weekly, priority: 1 },
    { url: `${BASE}/search`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/calculator`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/test`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/quiz`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/generator`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/checklist`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/fortune`, changeFrequency: weekly, priority: 0.95 },
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
    // 단위 변환은 slug가 여덟 언어에서 같다 — 언어 목록만 돌리면 된다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/convert`, changeFrequency: weekly, priority: 0.9 },
      ...CONVERT_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/convert/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
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
    // 몸 수치도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
      { url: `${BASE}/${lang}/body`, changeFrequency: weekly, priority: 0.9 },
      ...BODY_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/body/${t.slug}`, changeFrequency: monthly, priority: 0.8,
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
    // 사자성어도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES10.flatMap((lang) => [
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
    // 혈액형 유전 512장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
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
    // 다다미 100장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
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
    // 일본 연호 163장도 열 언어다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
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
 * generateSitemaps로 /sitemap/0.xml … 꼴로 나눈다. 한 조각을 45,000으로
 * 잡은 것은 5만에 딱 붙이면 섹션 하나만 늘어도 다시 넘치기 때문이다.
 * 조각을 묶는 목록은 app/sitemap-index.xml/route.ts가 낸다.
 */
export const CHUNK_SIZE = 45_000;

export function sitemapChunkCount(): number {
  return Math.max(1, Math.ceil(allEntries().length / CHUNK_SIZE));
}

export async function generateSitemaps(): Promise<{ id: number }[]> {
  return Array.from({ length: sitemapChunkCount() }, (_, id) => ({ id }));
}

export default async function sitemap({ id }: { id: Promise<string> | string }): Promise<MetadataRoute.Sitemap> {
  const n = Number(await id) || 0;
  return allEntries().slice(n * CHUNK_SIZE, (n + 1) * CHUNK_SIZE);
}
