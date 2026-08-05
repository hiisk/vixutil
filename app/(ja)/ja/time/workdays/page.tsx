import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'workdays');

export default function JaTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="ja">
      <WorkdaysTool lang="ja" />
    </TimeShellIntl>
  );
}
