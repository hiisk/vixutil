import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('en', 'workdays');

export default function EnTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="en">
      <WorkdaysTool lang="en" />
    </TimeShellIntl>
  );
}
