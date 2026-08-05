import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'date-add');

export default function DeTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="de">
      <DateAddTool lang="de" />
    </TimeShellIntl>
  );
}
