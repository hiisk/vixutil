import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'weeknumber');

export default function EnTimeWeeknumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="zh-hant">
      <WeekNumberTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
