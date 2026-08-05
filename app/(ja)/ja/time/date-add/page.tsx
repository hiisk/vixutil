import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'date-add');

export default function JaTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="ja">
      <DateAddTool lang="ja" />
    </TimeShellIntl>
  );
}
