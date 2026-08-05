import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hans', 'workdays');

export default function EnTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="zh-hans">
      <WorkdaysTool lang="zh-hans" />
    </TimeShellIntl>
  );
}
