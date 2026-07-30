import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'date-add');

export default function HiTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="hi">
      <DateAddTool lang="hi" />
    </TimeShellIntl>
  );
}
