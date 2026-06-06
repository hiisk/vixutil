import type { MetadataRoute } from "next";

const BASE = "https://hiisk-calculator.vercel.app";

const calculatorRoutes = [
  // 직장인
  "/salary", "/parttime", "/minimum-wage", "/standard-wage", "/overtime",
  "/weekly-holiday", "/severance", "/annual-leave-pay", "/four-insurance",
  "/freelance", "/to-hourly", "/to-annual",
  // 세금
  "/loan", "/deposit", "/savings", "/compound", "/compound-goal",
  "/ltv", "/dsr", "/max-loan", "/car-installment",
  // 부동산 세금
  "/acquisition-tax", "/property-tax", "/holding-tax", "/capital-gains",
  "/gift-tax", "/inheritance-tax", "/comprehensive-tax", "/local-income-tax",
  "/business-income", "/dividend", "/vat", "/broker-fee", "/subscription-score",
  "/jeonwolse", "/pyeong",
  // 금융
  "/exchange", "/roi", "/avg-price", "/breakeven", "/percent",
  "/simple-interest", "/inflation", "/retirement",
  // 공과금
  "/electricity", "/gas-bill", "/water-bill", "/water",
  // 자동차
  "/gas-cost", "/fuel-efficiency", "/ev-charge", "/car-tax",
  // 생활·건강
  "/bmi", "/bmr", "/calorie", "/sleep", "/ovulation",
  "/body-fat", "/blood-pressure", "/calories-burn",
  "/pregnancy", "/tip", "/dutch-pay", "/discount", "/gpa",
  // 날짜·시간
  "/age", "/birthday", "/dday", "/time-diff",
  // 단위변환
  "/unit-length", "/unit-weight", "/unit-temp", "/binary",
];

const devRoutes = [
  "/dev/jwt", "/dev/hash", "/dev/salary", "/dev/color", "/dev/base64",
  "/dev/regex", "/dev/json", "/dev/url-encode", "/dev/timestamp",
  "/dev/uuid", "/dev/cron", "/dev/sql",
  "/dev/word-count", "/dev/diff",
];

const localeRoutes = ["/en", "/ja"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // 언어별 홈페이지
    ...localeRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // 계산기 페이지
    ...calculatorRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // 개발자 도구
    ...devRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
