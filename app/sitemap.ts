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
import { EXERCISES } from "@/lib/body/exercise";
import { SALARIES } from "@/lib/salary-grid";
import { allSeveranceCells, severanceSlug } from "@/lib/severance-grid";
import { allLoanCells, loanSlug } from "@/lib/loan-grid";
import { RATE_TOOLS } from "@/lib/rate-tools";
import { BODY_TOOLS } from "@/lib/body-tools";
import { GEO_TOOLS } from "@/lib/geo-tools";
import { CRAFT_TOOLS } from "@/lib/craft-tools";
import { IDIOMS } from "@/lib/hanja-tools";
import { TOPIC_SLUGS as SAJU_TOPIC_SLUGS } from "@/lib/saju-topics";
import { sectionHasLocale } from "@/lib/i18n/lang";
import { NAMED_COLORS_8 } from "@/lib/color/named8";
import { INGREDIENTS } from "@/lib/food/ingredients8";
import { TIME_CITIES } from "@/lib/time/cities8";
import { SCREENS } from "@/lib/device/screens";
import { LENSES } from "@/lib/lens/list";
import { ALGS } from "@/lib/cube/list";
import { PATTERNS } from "@/lib/regex/list";
import { PORTS } from "@/lib/port/list";
import { LEGAL_KINDS, legalRoute } from "@/lib/legal/common";
import { OPENINGS } from "@/lib/chess/list";
import { HANDS } from "@/lib/poker/list";
import { LANGS } from "@/lib/i18n/lang";
import { FREQS, freqSlug } from "@/lib/sound/freqs";
import { EXTS } from "@/lib/ext/list";
import { CARDS } from "@/lib/tarot/deck";
import { IMG_SIZES } from "@/lib/imgsize/list";
import { HTTP_ITEMS } from "@/lib/http/list";
import { CMD_ITEMS } from "@/lib/cmd/list";
import { SC_ITEMS } from "@/lib/shortcut/list";
import { EM_ITEMS } from "@/lib/emoji/list";

const BASE = "https://vixutil.com";

/* 4,131칸을 열 언어가 함께 쓴다 — 언어마다 다시 만들면 같은 배열을 열 번 만든다 */
/* 366일도 같은 이유로 한 번만 만든다 */

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
    ...LANGS.flatMap(({ prefix }: { prefix: string }) =>
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
    // 나라 정보도 slug가 여덟 언어에서 같다
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
    ...LANGS.flatMap(({ prefix }: { prefix: string }) =>
      TIME_CITIES.map((c: { slug: string }) => ({
        url: `${BASE}${prefix}/time/${c.slug}`,
        changeFrequency: weekly,
        priority: 0.8,
      })),
    ),
    // 오류 문구도 열 언어다 — 뜻과 대처만 옮기고 문구는 그대로 둔다
    // 키보드 단축키도 열 언어다 — 목록과 낱장을 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/shortcut`, changeFrequency: weekly, priority: 0.9 },
      ...SC_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/shortcut/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 이모지 뜻도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/emoji`, changeFrequency: weekly, priority: 0.9 },
      ...EM_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/emoji/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 터미널 명령어도 열 언어다 — 목록과 낱장을 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/cmd`, changeFrequency: weekly, priority: 0.9 },
      ...CMD_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/cmd/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // HTTP 상태 코드와 헤더 132가지도 여덟 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/http`, changeFrequency: weekly, priority: 0.9 },
      ...HTTP_ITEMS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/http/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // CSS 속성 154개도 여덟 언어다 — 목록과 상세를 함께 싣는다
    // 이미지 크기 116가지도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/image/size`, changeFrequency: weekly, priority: 0.9 },
      ...IMG_SIZES.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/image/size/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // HTML 태그 126개도 여덟 언어다 — 목록과 상세를 함께 싣는다
    // 특수문자 168자도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/text/char`, changeFrequency: weekly, priority: 0.9 },
    ]),
    // 타로 78장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/fortune/card`, changeFrequency: weekly, priority: 0.85 },
      ...CARDS.map((c: { slug: string }) => ({
        url: `${BASE}${prefix}/fortune/card/${c.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    /* 사주 주제 일곱 장 × 열 언어. 통합 페이지(/fortune/saju)는 위쪽 운세 블록에
       이미 실려 있으므로 여기서는 주제만 싣는다 — 두 번 실으면 sitemap-chunks
       검사가 중복 <loc>으로 잡는다. */
    ...LANGS.flatMap(({ prefix }: { prefix: string }) =>
      SAJU_TOPIC_SLUGS.map((t: string) => ({
        url: `${BASE}${prefix}/fortune/saju/${t}`,
        changeFrequency: weekly,
        priority: 0.85,
      })),
    ),
    // 확장자 140장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/ext`, changeFrequency: weekly, priority: 0.9 },
      ...EXTS.map((x: { ext: string }) => ({
        url: `${BASE}${prefix}/ext/${x.ext}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 주파수 113장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/sound/hz`, changeFrequency: weekly, priority: 0.85 },
      ...FREQS.map((f: { hz: number }) => ({
        url: `${BASE}${prefix}/sound/hz/${freqSlug(f.hz)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 화면 규격 108장도 여덟 언어다 — 목록과 상세를 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
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
    // 수 209장도 열 언어다 — 격자가 곧 목록이다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/number`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // ASCII 128장도 열 언어다 — 코드표가 곧 목록이다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/ascii`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 포트 127장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/port`, changeFrequency: weekly, priority: 0.85 },
      ...PORTS.map((x: { port: number }) => ({
        url: `${BASE}${prefix}/port/${x.port}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 권한 모드 125장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/chmod`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 분수 127장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/fraction`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 키 코드 120장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/keycode`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 프리픽스 162장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/cidr`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 부호 116장도 열 언어다 — 글자 쉰둘과 점자 셀 예순넷
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/code`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 곱셈 210장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/times`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 제곱근 200장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/percent`, changeFrequency: weekly, priority: 0.9 },
      { url: `${BASE}${prefix}/sqrt`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 로마 숫자 연도 201장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/roman`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 연도 201장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/year`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // CSS 단위 120장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/rem`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 도시 사이 342장도 열 언어다
    // 비밀번호 세기 100장도 열 언어다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/password`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 정규식 133장도 여덟 언어다 — 표기법과 검사식을 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/text/regex`, changeFrequency: weekly, priority: 0.85 },
      ...PATTERNS.map((x: { slug: string }) => ({
        url: `${BASE}${prefix}/text/regex/${x.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 주사위 확률 111장도 여덟 언어다 — 한 개부터 여섯 개까지의 모든 합
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/random/dice`, changeFrequency: weekly, priority: 0.85 },
    ]),
    // 큐브 공식 119장도 여덟 언어다 — F2L·OLL·PLL을 함께 싣는다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/game/cube`, changeFrequency: weekly, priority: 0.85 },
      ...ALGS.map((a: { slug: string }) => ({
        url: `${BASE}${prefix}/game/cube/${a.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 렌즈 화각 104장도 여덟 언어다 — 초점거리 스물여섯에 센서 넷
    ...LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/snap/lens`, changeFrequency: weekly, priority: 0.85 },
      ...LENSES.map((l: { slug: string }) => ({
        url: `${BASE}${prefix}/snap/lens/${l.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ]),
    // 재료 무게 125장도 여덟 언어다 — 도구는 따로 실려 있고 이건 이름 페이지다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) =>
      INGREDIENTS.map((i: { slug: string }) => ({
        url: `${BASE}${prefix}/food/${i.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ),
    // 색 이름 110장도 여덟 언어다 — 도구는 ko·en뿐이지만 이름 페이지는 전부 있다
    ...LANGS.flatMap(({ prefix }: { prefix: string }) =>
      NAMED_COLORS_8.map((c: { slug: string }) => ({
        url: `${BASE}${prefix}/color/${c.slug}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
    ),
    // 색 허브는 아래 INTL_LOCALES10 묶음이 열 언어를 모두 낸다 — 여기서 또 내면 여덟 개가 두 번 실린다
    // 음악 이론도 여덟 언어다 — 지하철과 같은 목록을 돈다
    // 지하철은 여덟 언어다. 언어를 손으로 적으면 하나를 빼먹으니 목록에서 돈다
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
 * 그래서 파일을 나눴다. 5만에 딱 붙이면 섹션 하나만 늘어도 다시 넘치므로 여유를
 * 둔다 — 언어 하나가 이 수를 넘길 때만 그 언어가 두 파일이 된다.
 * 파일을 묶는 목록은 app/sitemap-index.xml/route.ts가 낸다.
 *
 * ── 45,000 → 48,000 (2026-08-15) ───────────────────────────
 * 한국어가 39,202까지 올라와 45,000의 87%였다. 90%를 넘으면 검사가 "라우트 파일을
 * 늘려 두라"고 말하는데, **한국어는 늘릴 수가 없다** — /sitemap.xml 하나에 한국어가
 * 다 들어가는 것이 이 구조의 약속이라(그래야 구글이 첫 조각만 읽어도 안 빠진다)
 * 두 조각으로 쪼개는 순간 그 약속이 깨진다.
 *
 * 그래서 여유를 규약 한도 쪽으로 밀었다. 5만까지 2,000을 남긴다. 이 수를 올려도
 * **언어와 파일 번호의 대응은 한 칸도 안 움직인다** — 언어가 쪼개질 때만 쓰이는
 * 값이기 때문이다. 그 대응이 이 구조에서 유일하게 건드리면 안 되는 것이다.
 */
export const CHUNK_SIZE = 48_000;

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
 * "한국어는 몇 % 색인됐고 번역판은 몇 %인가"를 바로 읽을 수 있다. 45,000개씩
 * 기계적으로 자르면 파일마다 언어가 섞여 그 수치가 아무것도 말해 주지 않는다.
 * 그리고 한국어가 /sitemap.xml 하나에 다 들어가므로, 구글이 그 주소만 읽어도
 * 유입이 오는 언어는 한 장도 빠지지 않는다.
 *
 * ── 앞자리를 바꾸려다 되돌렸다 (2026-08-15) ────────────────
 * 국외 유입이 우선이 되었으니 en을 첫 조각으로 올리자고 판단해 한 번 바꿨다.
 * **되돌렸다.** 파일 번호는 언어에 고정돼 있어야 한다 — 번호가 밀리면 서치
 * 콘솔이 파일별로 쌓아 둔 색인 이력이 다른 언어를 가리키고, 언어별로 자른
 * 보람이 그 순간 사라진다. 우선순위는 사이트맵 차례가 아니라 **어떤 페이지를
 * 만드느냐**로 정한다.
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
const SITEMAP_LANG_ORDER = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 주소의 언어 — 한국어는 접두어가 없으므로 아홉 개에 없으면 ko다 */
function langOfUrl(url: string): string {
  const first = url.replace(`${BASE}/`, '').replace(BASE, '').split('/')[0];
  return SITEMAP_LANG_ORDER.includes(first) && first !== 'ko' ? first : 'ko';
}

/** 0번이 /sitemap.xml, 1번이 /sitemap2.xml … 자리는 언어에 고정돼 있다 */
export function sitemapParts(): MetadataRoute.Sitemap[] {
  const byLang = new Map<string, MetadataRoute.Sitemap>();
  for (const e of allEntries()) {
    const k = langOfUrl(String(e.url));
    const arr = byLang.get(k);
    if (arr) arr.push(e);
    else byLang.set(k, [e]);
  }
  /* 언어 자리 — 앞 45,000개까지가 그 언어의 제 번호를 쓴다 */
  const base = SITEMAP_LANG_ORDER
    .map(l => (byLang.get(l) ?? []).slice(0, CHUNK_SIZE))
    .filter(c => c.length);

  /* 넘친 몫과 목록에 없는 언어는 뒤에 붙는다 — 앞 번호를 건드리지 않는다 */
  const overflow: MetadataRoute.Sitemap[] = [];
  for (const l of SITEMAP_LANG_ORDER) {
    const g = byLang.get(l) ?? [];
    for (let i = CHUNK_SIZE; i < g.length; i += CHUNK_SIZE) overflow.push(g.slice(i, i + CHUNK_SIZE));
  }
  for (const [l, g] of byLang) {
    if (SITEMAP_LANG_ORDER.includes(l)) continue;
    for (let i = 0; i < g.length; i += CHUNK_SIZE) overflow.push(g.slice(i, i + CHUNK_SIZE));
  }
  return [...base, ...overflow];
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
