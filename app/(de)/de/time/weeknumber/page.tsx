import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'weeknumber');

export default function DeTimeWeeknumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="de">
      <WeekNumberTool lang="de" />
    </TimeShellIntl>
  );
}
