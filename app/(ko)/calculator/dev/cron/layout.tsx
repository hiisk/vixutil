import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: 'Cron 표현식 생성기 - Cron 스케줄 파싱 및 설명',
  description: 'Cron 표현식을 입력하면 한국어로 스케줄 설명과 다음 실행 예정 시간을 보여줍니다. 반대로 원하는 주기를 선택해 Cron 식을 자동 생성합니다.',
  alternates: {
    canonical: '/calculator/dev/cron',
    languages: alternateLanguages10('/calculator/dev/cron'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
