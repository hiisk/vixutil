import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'weeknumber');

export default function HiTimeWeeknumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="hi">
      <WeekNumberTool lang="hi" />
    </TimeShellIntl>
  );
}
