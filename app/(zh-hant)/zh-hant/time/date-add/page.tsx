import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'date-add');

export default function EnTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="zh-hant">
      <DateAddTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
