import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hans', 'date-add');

export default function EnTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="zh-hans">
      <DateAddTool lang="zh-hans" />
    </TimeShellIntl>
  );
}
