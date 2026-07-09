import type { MetadataRoute } from "next";
import { TESTS } from "@/lib/test-data";
import { QUIZZES } from "@/lib/quiz-data";
import { GENERATORS } from "@/lib/generator-data";
import { CHECKLISTS } from "@/lib/checklist-data";

const BASE = "https://vixutil.com";

export const dynamic = "force-static";

const calculatorRoutes = [
  "/calculator/salary", "/calculator/parttime", "/calculator/minimum-wage", "/calculator/standard-wage", "/calculator/overtime",
  "/calculator/weekly-holiday", "/calculator/severance", "/calculator/annual-leave-pay", "/calculator/four-insurance",
  "/calculator/unemployment", "/calculator/parental-leave",
  "/calculator/freelance", "/calculator/to-hourly", "/calculator/to-annual",
  "/calculator/loan", "/calculator/deposit", "/calculator/savings", "/calculator/compound", "/calculator/compound-goal",
  "/calculator/ltv", "/calculator/dsr", "/calculator/max-loan", "/calculator/car-installment",
  "/calculator/acquisition-tax", "/calculator/property-tax", "/calculator/holding-tax", "/calculator/capital-gains",
  "/calculator/gift-tax", "/calculator/inheritance-tax", "/calculator/comprehensive-tax", "/calculator/local-income-tax",
  "/calculator/business-income", "/calculator/dividend", "/calculator/vat", "/calculator/broker-fee", "/calculator/subscription-score",
  "/calculator/jeonwolse", "/calculator/pyeong",
  "/calculator/exchange", "/calculator/roi", "/calculator/avg-price", "/calculator/breakeven", "/calculator/percent",
  "/calculator/simple-interest", "/calculator/inflation", "/calculator/retirement",
  "/calculator/electricity", "/calculator/gas-bill", "/calculator/water-bill", "/calculator/water",
  "/calculator/gas-cost", "/calculator/fuel-efficiency", "/calculator/ev-charge", "/calculator/car-tax",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const monthly = "monthly" as const;
  const weekly = "weekly" as const;

  return [
    { url: BASE, lastModified: now, changeFrequency: weekly, priority: 1 },
    { url: `${BASE}/calculator`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/test`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/quiz`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/generator`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/checklist`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/fortune`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/fortune/zodiac`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/animal`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/tarot`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/dream`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/fortune/saju`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/fortune/mbti`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap`, lastModified: now, changeFrequency: weekly, priority: 0.95 },
    { url: `${BASE}/snap/face-reading`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/personal-color`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/photo-mood`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/face-symmetry`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/smile-score`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/animal-face`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/handwriting`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/expression`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/golden-ratio`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/snap/couple-match`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/signals`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/crypto/atr-tpsl`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/calculator/en`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${BASE}/calculator/ja`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    ...calculatorRoutes.map(r => ({ url: `${BASE}${r}`, lastModified: now, changeFrequency: monthly, priority: 0.8 })),
    ...devRoutes.map(r => ({ url: `${BASE}${r}`, lastModified: now, changeFrequency: monthly, priority: 0.7 })),
    ...TESTS.map((t: { slug: string }) => ({ url: `${BASE}/test/${t.slug}`, lastModified: now, changeFrequency: monthly, priority: 0.8 })),
    ...QUIZZES.map((q: { slug: string }) => ({ url: `${BASE}/quiz/${q.slug}`, lastModified: now, changeFrequency: monthly, priority: 0.8 })),
    ...GENERATORS.map((g: { slug: string }) => ({ url: `${BASE}/generator/${g.slug}`, lastModified: now, changeFrequency: monthly, priority: 0.8 })),
    ...CHECKLISTS.map((c: { slug: string }) => ({ url: `${BASE}/checklist/${c.slug}`, lastModified: now, changeFrequency: monthly, priority: 0.8 })),
  ];
}
