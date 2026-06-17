import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '무게 단위 변환기 - g·kg·t·oz·lb·stone·근·냥 변환',
  description: 'mg, g, kg, t(톤), oz, lb, stone, 근, 돈, 냥 등 모든 무게 단위를 한 번에 변환합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
