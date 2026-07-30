import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'weeknumber');

export default function PtBrTimeWeeknumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="pt-br">
      <WeekNumberTool lang="pt-br" />
    </TimeShellIntl>
  );
}
