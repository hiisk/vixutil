import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'weeknumber');

export default function JaTimeWeeknumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="ja">
      <WeekNumberTool lang="ja" />
    </TimeShellIntl>
  );
}
