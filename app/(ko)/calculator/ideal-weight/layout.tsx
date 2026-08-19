import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '표준체중 계산기 - 키·성별로 표준체중과 정상 체중 범위',
  description: '디바인·로빈슨·밀러·햄위 네 공식의 표준체중을 나란히 보여주고, 실제 판단에 쓰이는 BMI 18.5~24.9 체중 범위도 함께 계산합니다. 현재 체중을 넣으면 지금 BMI와 차이도 나옵니다.',
  alternates: {
    canonical: '/calculator/ideal-weight',
    languages: alternateLanguages10('/calculator/ideal-weight'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
