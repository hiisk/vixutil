import type { MetadataRoute } from "next";

const BASE = "https://hiisk-calculator.vercel.app";

const calculatorRoutes = [
  "/salary", "/parttime", "/minimum-wage", "/standard-wage", "/overtime",
  "/weekly-holiday", "/severance", "/annual-leave-pay", "/four-insurance",
  "/freelance", "/to-hourly", "/to-annual",
  "/loan", "/deposit", "/savings", "/compound", "/compound-goal",
  "/ltv", "/dsr", "/max-loan", "/car-installment",
  "/acquisition-tax", "/property-tax", "/holding-tax", "/capital-gains",
  "/gift-tax", "/inheritance-tax", "/comprehensive-tax", "/local-income-tax",
  "/business-income", "/dividend", "/vat", "/broker-fee", "/subscription-score",
  "/jeonwolse", "/pyeong",
  "/exchange", "/roi", "/avg-price", "/breakeven", "/percent",
  "/electricity", "/gas-bill", "/water-bill", "/water",
  "/gas-cost", "/fuel-efficiency", "/ev-charge", "/car-tax",
  "/bmi", "/bmr", "/calorie", "/sleep", "/ovulation",
  "/age", "/birthday", "/dday",
];

const devRoutes = [
  "/dev/jwt", "/dev/hash", "/dev/salary", "/dev/color", "/dev/base64",
  "/dev/regex", "/dev/json", "/dev/url-encode", "/dev/timestamp",
  "/dev/uuid", "/dev/cron", "/dev/sql",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
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
