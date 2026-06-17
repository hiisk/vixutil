import type { MetadataRoute } from "next";

const BASE = "https://vixutil.com";

const calculatorRoutes = [
  // 직장인
  "/calculator/salary", "/calculator/parttime", "/calculator/minimum-wage", "/calculator/standard-wage", "/calculator/overtime",
  "/calculator/weekly-holiday", "/calculator/severance", "/calculator/annual-leave-pay", "/calculator/four-insurance",
  "/calculator/freelance", "/calculator/to-hourly", "/calculator/to-annual",
  // 세금
  "/calculator/loan", "/calculator/deposit", "/calculator/savings", "/calculator/compound", "/calculator/compound-goal",
  "/calculator/ltv", "/calculator/dsr", "/calculator/max-loan", "/calculator/car-installment",
  // 부동산 세금
  "/calculator/acquisition-tax", "/calculator/property-tax", "/calculator/holding-tax", "/calculator/capital-gains",
  "/calculator/gift-tax", "/calculator/inheritance-tax", "/calculator/comprehensive-tax", "/calculator/local-income-tax",
  "/calculator/business-income", "/calculator/dividend", "/calculator/vat", "/calculator/broker-fee", "/calculator/subscription-score",
  "/calculator/jeonwolse", "/calculator/pyeong",
  // 금융
  "/calculator/exchange", "/calculator/roi", "/calculator/avg-price", "/calculator/breakeven", "/calculator/percent",
  "/calculator/simple-interest", "/calculator/inflation", "/calculator/retirement",
  // 공과금
  "/calculator/electricity", "/calculator/gas-bill", "/calculator/water-bill", "/calculator/water",
  // 자동차
  "/calculator/gas-cost", "/calculator/fuel-efficiency", "/calculator/ev-charge", "/calculator/car-tax",
  // 생활·건강
  "/calculator/bmi", "/calculator/bmr", "/calculator/calorie", "/calculator/sleep", "/calculator/ovulation",
  "/calculator/body-fat", "/calculator/blood-pressure", "/calculator/calories-burn",
  "/calculator/pregnancy", "/calculator/tip", "/calculator/dutch-pay", "/calculator/discount", "/calculator/gpa",
  // 날짜·시간
  "/calculator/age", "/calculator/birthday", "/calculator/dday", "/calculator/time-diff",
  // 단위변환
  "/calculator/unit-length", "/calculator/unit-weight", "/calculator/unit-temp", "/calculator/binary",
];

const devRoutes = [
  "/calculator/dev/jwt", "/calculator/dev/hash", "/calculator/dev/salary", "/calculator/dev/color", "/calculator/dev/base64",
  "/calculator/dev/regex", "/calculator/dev/json", "/calculator/dev/url-encode", "/calculator/dev/timestamp",
  "/calculator/dev/uuid", "/calculator/dev/cron", "/calculator/dev/sql",
  "/calculator/dev/word-count", "/calculator/dev/diff",
];

const localeRoutes = ["/calculator/en", "/calculator/ja"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...localeRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...calculatorRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...devRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
