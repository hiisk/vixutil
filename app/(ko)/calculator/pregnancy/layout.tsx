import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: '임신 예정일 계산기 - 네겔레 법칙 출산예정일·임신주수 계산',
  description: '마지막 생리 시작일과 생리 주기를 입력하면 출산예정일(네겔레 법칙), 현재 임신 주수, 분기별 시작일, 중요 검사 시기를 알 수 있습니다.',
  alternates: {
    canonical: '/calculator/pregnancy',
    languages: alternateLanguages10('/calculator/pregnancy'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
