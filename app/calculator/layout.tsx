import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "실생활 계산기", template: "%s | 실생활 계산기" },
  description: "세금·투자·대출·건강 계산기 모음 — 2026년 기준",
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
