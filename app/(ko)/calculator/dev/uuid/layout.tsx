import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
export const metadata: Metadata = withCard({
  title: 'UUID 생성기 - UUID v4 랜덤 고유 식별자 생성',
  description: 'UUID v4 형식의 랜덤 고유 식별자를 즉시 생성합니다. 한 번에 여러 개 생성 및 복사 기능을 지원합니다.',
  alternates: {
    canonical: '/calculator/dev/uuid',
    languages: alternateLanguages10('/calculator/dev/uuid'),
  },
});
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
