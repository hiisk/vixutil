import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'date-add');

export default function PtBrTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="pt-br">
      <DateAddTool lang="pt-br" />
    </TimeShellIntl>
  );
}
