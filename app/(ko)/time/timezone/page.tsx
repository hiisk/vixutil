import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TimeShell from '@/components/TimeShell';
import TimezoneTool from '@/components/time/TimezoneTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '시차 계산 - 해외 회의 시간 변환',
  description: '한국 시각을 정하면 상대 도시에서는 몇 시인지, 반대로도 바꿔 줍니다. 하루 전체를 시간대별로 늘어놓아 양쪽 모두 업무 시간인 구간을 눈으로 찾을 수 있습니다.',
  alternates: {
    canonical: '/time/timezone',
    languages: alternateLanguages10('/time/timezone'),
  },
});

export default function Page() {
  return (
    <TimeShell slug="timezone">
      <TimezoneTool />
    </TimeShell>
  );
}
