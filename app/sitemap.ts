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
import { CHECKLISTS_EN } from "@/lib/checklist-en";
import { QUIZZES_EN } from "@/lib/quiz-en";
import { timeToolsIntl } from "@/lib/time-tools-intl";
import { colorToolsIntl } from "@/lib/color-tools-intl";
import { INTL_LOCALES } from "@/lib/locales";
import { imageToolsIntl } from "@/lib/image-tools-intl";
import { soundToolsIntl } from "@/lib/sound-tools-intl";
import { foodToolsIntl } from "@/lib/food-tools-intl";
import { gameToolsIntl } from "@/lib/game-tools-intl";
import { deviceToolsIntl } from "@/lib/device-tools-intl";
import { textToolsIntl } from "@/lib/text-tools-intl";
import { TESTS_EN } from "@/lib/test-en";
import { GAME_TOOLS } from "@/lib/game-tools";
import { COLOR_TOOLS } from "@/lib/color-tools";
import { TIME_TOOLS } from "@/lib/time-tools";
import { SOUND_TOOLS } from "@/lib/sound-tools";
import { FOOD_TOOLS } from "@/lib/food-tools";
import { CONVERT_TOOLS } from "@/lib/convert-tools";
import { RATE_TOOLS } from "@/lib/rate-tools";
import { BODY_TOOLS } from "@/lib/body-tools";
import { GEO_TOOLS } from "@/lib/geo-tools";
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
  "/calculator/electricity", "/calculator/gas-bill", "/calculator/water-bill", "/calculator/water",
  "/calculator/maintenance-fee",
  "/calculator/gas-cost", "/calculator/fuel-efficiency", "/calculator/ev-charge", "/calculator/car-tax",
  "/calculator/car-registration",
  "/calculator/bmi", "/calculator/bmr", "/calculator/calorie", "/calculator/sleep", "/calculator/ovulation",
  "/calculator/body-fat", "/calculator/blood-pressure", "/calculator/calories-burn",
  "/calculator/pregnancy", "/calculator/tip", "/calculator/dutch-pay", "/calculator/discount", "/calculator/gpa",
  "/calculator/age", "/calculator/birthday", "/calculator/dday", "/calculator/time-diff",
  "/calculator/unit-length", "/calculator/unit-weight", "/calculator/unit-temp", "/calculator/binary",
  "/calculator/loan-prepayment-fee", "/calculator/caffeine", "/calculator/wedding-gift",
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
export default function sitemap(): MetadataRoute.Sitemap {
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
    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/convert`, changeFrequency: weekly, priority: 0.9 },
      ...CONVERT_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/convert/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/rate`, changeFrequency: weekly, priority: 0.95 },
    ...RATE_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/rate/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    // 비율 계산도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/rate`, changeFrequency: weekly, priority: 0.9 },
      ...RATE_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/rate/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/body`, changeFrequency: weekly, priority: 0.95 },
    ...BODY_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/body/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    // 몸 수치도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/body`, changeFrequency: weekly, priority: 0.9 },
      ...BODY_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/body/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/geometry`, changeFrequency: weekly, priority: 0.95 },
    ...GEO_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/geometry/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/en/geometry`, changeFrequency: weekly, priority: 0.9 },
    ...GEO_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/en/geometry/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/country`, changeFrequency: weekly, priority: 0.95 },
    ...COUNTRIES.map((c: { slug: string }) => ({ url: `${BASE}/country/${c.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/en/country`, changeFrequency: weekly, priority: 0.9 },
    ...COUNTRIES.map((c: { slug: string }) => ({ url: `${BASE}/en/country/${c.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/hanja`, changeFrequency: weekly, priority: 0.95 },
    ...IDIOMS.map((i: { slug: string }) => ({ url: `${BASE}/hanja/${i.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/en/hanja`, changeFrequency: weekly, priority: 0.9 },
    ...IDIOMS.map((i: { slug: string }) => ({ url: `${BASE}/en/hanja/${i.slug}`, changeFrequency: monthly, priority: 0.8 })),
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
    // 원소 118장도 여덟 언어다 — 주기율표 자체가 목록이다
    ...METRO_LANGS.flatMap(({ prefix }: { prefix: string }) => [
      { url: `${BASE}${prefix}/element`, changeFrequency: weekly, priority: 0.85 },
      ...ELEMENTS.map((x: { z: number }) => ({
        url: `${BASE}${prefix}/element/${x.z}`,
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
    // 새로 쓰는 여섯 언어에는 색 이름 허브가 있다
    ...METRO_LANGS.filter(({ prefix }: { prefix: string }) => prefix !== '' && prefix !== '/en')
      .map(({ prefix }: { prefix: string }) => ({
        url: `${BASE}${prefix}/color`, changeFrequency: weekly, priority: 0.85,
      })),
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
    ...INTL_LOCALES.map((lang) => ({ url: `${BASE}/${lang}`, changeFrequency: weekly, priority: 0.95 })),
    { url: `${BASE}/en/generator`, changeFrequency: weekly, priority: 0.9 },
    ...GENERATORS_EN.map((g: { slug: string }) => ({ url: `${BASE}/en/generator/${g.slug}`, changeFrequency: monthly, priority: 0.8 })),
    // 랜덤 뽑기도 slug가 여덟 언어에서 같다
    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/random`, changeFrequency: weekly, priority: 0.9 },
      ...RANDOM_TOOLS.map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/random/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    { url: `${BASE}/en/fortune`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/en/fortune/zodiac`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/animal`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/blood-type`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/biorhythm`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/birth-stone`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/today-color`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/tarot`, changeFrequency: weekly, priority: 0.85 },
    { url: `${BASE}/en/fortune/lucky-numbers`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/star-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/zodiac-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/mbti-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/blood-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/daily`, changeFrequency: weekly, priority: 0.85 },
    { url: `${BASE}/en/fortune/daily-tarot`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/tarot-yesno`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/dream`, changeFrequency: weekly, priority: 0.85 },
    { url: `${BASE}/en/fortune/saju`, changeFrequency: weekly, priority: 0.85 },
    { url: `${BASE}/en/snap`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/en/snap/smile-score`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/face-symmetry`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/golden-ratio`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/photo-mood`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/expression`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/first-impression`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/handwriting`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/face-reading`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/animal-face`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/personal-color`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/snap/couple-match`, changeFrequency: monthly, priority: 0.8 },
    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/time`, changeFrequency: weekly, priority: 0.9 },
      ...timeToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/time/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    // 색상 도구는 번역 일곱 언어 전부 나간다 — 언어를 늘리면 INTL_LOCALES만 커지면 된다
    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/color`, changeFrequency: weekly, priority: 0.9 },
      ...colorToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/color/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/image`, changeFrequency: weekly, priority: 0.9 },
      ...imageToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/image/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/sound`, changeFrequency: weekly, priority: 0.9 },
      ...soundToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/sound/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/food`, changeFrequency: weekly, priority: 0.9 },
      ...foodToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/food/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/game`, changeFrequency: weekly, priority: 0.9 },
      ...gameToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/game/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/device`, changeFrequency: weekly, priority: 0.9 },
      ...deviceToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/device/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),

    ...INTL_LOCALES.flatMap((lang) => [
      { url: `${BASE}/${lang}/text`, changeFrequency: weekly, priority: 0.9 },
      ...textToolsIntl(lang).map((t: { slug: string }) => ({
        url: `${BASE}/${lang}/text/${t.slug}`, changeFrequency: monthly, priority: 0.8,
      })),
    ]),
    // 통합 검색은 번역 일곱 언어 모두 나간다
    ...INTL_LOCALES.map((lang) => ({ url: `${BASE}/${lang}/search`, changeFrequency: weekly, priority: 0.7 })),
    { url: `${BASE}/en/test`, changeFrequency: weekly, priority: 0.9 },
    ...TESTS_EN.map((t: { slug: string }) => ({ url: `${BASE}/en/test/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/quiz`, changeFrequency: weekly, priority: 0.9 },
    ...QUIZZES_EN.map((q: { slug: string }) => ({ url: `${BASE}/en/quiz/${q.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/checklist`, changeFrequency: weekly, priority: 0.9 },
    ...CHECKLISTS_EN.map((c: { slug: string }) => ({ url: `${BASE}/en/checklist/${c.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/fortune/mbti`, changeFrequency: weekly, priority: 0.8 },







    { url: `${BASE}/calculator/en`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/calculator/ja`, changeFrequency: weekly, priority: 0.9 },
    ...calculatorRoutes.map(r => ({ url: `${BASE}${r}`, changeFrequency: monthly, priority: 0.8 })),
    ...devRoutes.map(r => ({ url: `${BASE}${r}`, changeFrequency: monthly, priority: 0.7 })),
    ...TESTS.map((t: { slug: string }) => ({ url: `${BASE}/test/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ...QUIZZES.map((q: { slug: string }) => ({ url: `${BASE}/quiz/${q.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ...GENERATORS.map((g: { slug: string }) => ({ url: `${BASE}/generator/${g.slug}`, changeFrequency: monthly, priority: 0.8 })),
    ...CHECKLISTS.map((c: { slug: string }) => ({ url: `${BASE}/checklist/${c.slug}`, changeFrequency: monthly, priority: 0.8 })),
  ];
}
