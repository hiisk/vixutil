import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'workdays');

export default function PtBrTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="pt-br">
      <WorkdaysTool lang="pt-br" />
    </TimeShellIntl>
  );
}
