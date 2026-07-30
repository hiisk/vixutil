import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import TimeShell from '@/components/TimeShell';
import WorkdaysTool from '@/components/time/WorkdaysTool';

export const metadata: Metadata = {
  title: '근무일 계산 - 주말 제외 영업일 수 계산',
  description: '두 날짜 사이의 근무일(주말 제외)을 셉니다. 공휴일을 직접 넣어 뺄 수 있고, "오늘부터 근무일 10일 뒤"처럼 반대 방향으로도 계산합니다.',
  alternates: {
    canonical: '/time/workdays',
    languages: alternateLanguages('/time/workdays'),
  },
};

export default function Page() {
  return (
    <TimeShell slug="workdays">
      <WorkdaysTool />
    </TimeShell>
  );
}
