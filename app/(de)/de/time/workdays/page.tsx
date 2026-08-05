import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'workdays');

export default function DeTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="de">
      <WorkdaysTool lang="de" />
    </TimeShellIntl>
  );
}
