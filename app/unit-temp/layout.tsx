import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '온도 변환기 - 섭씨·화씨·켈빈·랭킨 온도 단위 계산',
  description: '섭씨(°C), 화씨(°F), 켈빈(K), 랭킨(°R) 온도 단위를 즉시 변환하고 체감 설명을 확인하세요.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
