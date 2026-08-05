import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
export const metadata: Metadata = {
  title: '무게 단위 변환기 - g·kg·t·oz·lb·stone·근·냥 변환',
  description: 'mg, g, kg, t(톤), oz, lb, stone, 근, 돈, 냥 등 모든 무게 단위를 한 번에 변환합니다.',
  // 아홉 언어에 같은 슬러그가 있다 — lib/calc-l10n/index.ts의 목록과 짝이다
  alternates: {
    canonical: '/calculator/unit-weight',
    languages: alternateLanguages10('/calculator/unit-weight'),
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
