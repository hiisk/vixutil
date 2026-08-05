import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TimeShell from '@/components/TimeShell';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '주차·분기 확인 - 오늘이 몇 주차인지',
  description: '날짜를 넣으면 그 해 몇 번째 주인지(ISO 기준), 몇 분기인지, 그 해의 며칠째인지 알려줍니다. 주차로 일정을 관리하는 회사에서 "몇 주차 회의"를 맞출 때 씁니다.',
  alternates: {
    canonical: '/time/weeknumber',
    languages: alternateLanguages10('/time/weeknumber'),
  },
});

export default function Page() {
  return (
    <TimeShell slug="weeknumber">
      <WeekNumberTool />
    </TimeShell>
  );
}
