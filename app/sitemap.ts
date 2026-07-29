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
import { imageToolsIntl } from "@/lib/image-tools-intl";
import { soundToolsIntl } from "@/lib/sound-tools-intl";
import { foodToolsIntl } from "@/lib/food-tools-intl";
import { TESTS_EN } from "@/lib/test-en";
import { TESTS_ZH } from "@/lib/test-zh";
import { QUIZZES_ZH } from "@/lib/quiz-zh";
import { CHECKLISTS_ZH } from "@/lib/checklist-zh";
import { GENERATORS_ZH } from "@/lib/generator-zh";
import { GAME_TOOLS } from "@/lib/game-tools";
import { COLOR_TOOLS } from "@/lib/color-tools";
import { TIME_TOOLS } from "@/lib/time-tools";
import { SOUND_TOOLS } from "@/lib/sound-tools";
import { FOOD_TOOLS } from "@/lib/food-tools";
import { CONVERT_TOOLS } from "@/lib/convert-tools";
import { RATE_TOOLS } from "@/lib/rate-tools";
import { BODY_TOOLS } from "@/lib/body-tools";

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
    { url: `${BASE}/en/convert`, changeFrequency: weekly, priority: 0.9 },
    ...CONVERT_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/en/convert/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/convert`, changeFrequency: weekly, priority: 0.9 },
    ...CONVERT_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/zh/convert/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/rate`, changeFrequency: weekly, priority: 0.95 },
    ...RATE_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/rate/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/en/rate`, changeFrequency: weekly, priority: 0.9 },
    ...RATE_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/en/rate/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/rate`, changeFrequency: weekly, priority: 0.9 },
    ...RATE_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/zh/rate/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/body`, changeFrequency: weekly, priority: 0.95 },
    ...BODY_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/body/${t.slug}`, changeFrequency: weekly, priority: 0.9 })),
    { url: `${BASE}/en/body`, changeFrequency: weekly, priority: 0.9 },
    ...BODY_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/en/body/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/body`, changeFrequency: weekly, priority: 0.9 },
    ...BODY_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/zh/body/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/crypto`, changeFrequency: weekly, priority: 0.9 },
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
    // 코인별 price-prediction 페이지는 noindex 처리했으므로 사이트맵에서 제외한다.
    // (noindex인 URL을 사이트맵에 남겨두면 색인 요청과 모순되는 신호가 된다.)
    { url: `${BASE}/en`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/zh`, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/en/generator`, changeFrequency: weekly, priority: 0.9 },
    ...GENERATORS_EN.map((g: { slug: string }) => ({ url: `${BASE}/en/generator/${g.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/random`, changeFrequency: weekly, priority: 0.9 },
    ...RANDOM_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/en/random/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/generator`, changeFrequency: weekly, priority: 0.9 },
    ...GENERATORS_ZH.map((g: { slug: string }) => ({ url: `${BASE}/zh/generator/${g.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/random`, changeFrequency: weekly, priority: 0.9 },
    ...RANDOM_TOOLS.map((t: { slug: string }) => ({ url: `${BASE}/zh/random/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/fortune`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/en/fortune/zodiac`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/animal`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/blood-type`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/biorhythm`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/birth-stone`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/en/fortune/today-color`, changeFrequency: weekly, priority: 0.8 },
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
    { url: `${BASE}/zh/snap`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/zh/snap/smile-score`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/face-symmetry`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/golden-ratio`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/photo-mood`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/expression`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/first-impression`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/handwriting`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/face-reading`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/animal-face`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/personal-color`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/zh/snap/couple-match`, changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/en/time`, changeFrequency: weekly, priority: 0.9 },
    ...timeToolsIntl("en").map((t: { slug: string }) => ({ url: `${BASE}/en/time/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/en/color`, changeFrequency: weekly, priority: 0.9 },
    ...colorToolsIntl("en").map((t: { slug: string }) => ({ url: `${BASE}/en/color/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/en/image`, changeFrequency: weekly, priority: 0.9 },
    ...imageToolsIntl("en").map((t: { slug: string }) => ({ url: `${BASE}/en/image/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/en/sound`, changeFrequency: weekly, priority: 0.9 },
    ...soundToolsIntl("en").map((t: { slug: string }) => ({ url: `${BASE}/en/sound/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/en/food`, changeFrequency: weekly, priority: 0.9 },
    ...foodToolsIntl("en").map((t: { slug: string }) => ({ url: `${BASE}/en/food/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/test`, changeFrequency: weekly, priority: 0.9 },
    ...TESTS_EN.map((t: { slug: string }) => ({ url: `${BASE}/en/test/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/quiz`, changeFrequency: weekly, priority: 0.9 },
    ...QUIZZES_EN.map((q: { slug: string }) => ({ url: `${BASE}/en/quiz/${q.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/checklist`, changeFrequency: weekly, priority: 0.9 },
    ...CHECKLISTS_EN.map((c: { slug: string }) => ({ url: `${BASE}/en/checklist/${c.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/en/fortune/mbti`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune`, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/zh/fortune/zodiac`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/animal`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/blood-type`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/biorhythm`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/birth-stone`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/today-color`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/lucky-numbers`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/star-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/zodiac-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/mbti-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/blood-match`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/daily`, changeFrequency: weekly, priority: 0.85 },
    { url: `${BASE}/zh/fortune/daily-tarot`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/tarot-yesno`, changeFrequency: weekly, priority: 0.8 },
    { url: `${BASE}/zh/fortune/dream`, changeFrequency: weekly, priority: 0.85 },
    { url: `${BASE}/zh/fortune/saju`, changeFrequency: weekly, priority: 0.85 },
    { url: `${BASE}/zh/time`, changeFrequency: weekly, priority: 0.9 },
    ...timeToolsIntl("zh").map((t: { slug: string }) => ({ url: `${BASE}/zh/time/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/zh/color`, changeFrequency: weekly, priority: 0.9 },
    ...colorToolsIntl("zh").map((t: { slug: string }) => ({ url: `${BASE}/zh/color/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/zh/image`, changeFrequency: weekly, priority: 0.9 },
    ...imageToolsIntl("zh").map((t: { slug: string }) => ({ url: `${BASE}/zh/image/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/zh/sound`, changeFrequency: weekly, priority: 0.9 },
    ...soundToolsIntl("zh").map((t: { slug: string }) => ({ url: `${BASE}/zh/sound/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),

    { url: `${BASE}/zh/food`, changeFrequency: weekly, priority: 0.9 },
    ...foodToolsIntl("zh").map((t: { slug: string }) => ({ url: `${BASE}/zh/food/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/test`, changeFrequency: weekly, priority: 0.9 },
    ...TESTS_ZH.map((t: { slug: string }) => ({ url: `${BASE}/zh/test/${t.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/quiz`, changeFrequency: weekly, priority: 0.9 },
    ...QUIZZES_ZH.map((q: { slug: string }) => ({ url: `${BASE}/zh/quiz/${q.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/checklist`, changeFrequency: weekly, priority: 0.9 },
    ...CHECKLISTS_ZH.map((c: { slug: string }) => ({ url: `${BASE}/zh/checklist/${c.slug}`, changeFrequency: monthly, priority: 0.8 })),
    { url: `${BASE}/zh/fortune/mbti`, changeFrequency: weekly, priority: 0.8 },
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
