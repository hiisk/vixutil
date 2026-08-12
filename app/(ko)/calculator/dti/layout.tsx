import type { Metadata } from 'next';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: 'DTI 계산기 - 총부채상환비율과 한도별 대출 원금 역산',
  description: 'DTI(총부채상환비율)를 계산하고, 40%·50% 같은 한도에서 빌릴 수 있는 최대 원금을 거꾸로 구합니다. 기타 대출을 이자만 세는 점이 DSR과 다르고, 거치기간도 반영합니다.',
  alternates: { canonical: '/calculator/dti' },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
