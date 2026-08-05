import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'workdays');

export default function HiTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="hi">
      <WorkdaysTool lang="hi" />
    </TimeShellIntl>
  );
}
