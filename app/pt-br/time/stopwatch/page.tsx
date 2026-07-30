import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'stopwatch');

export default function PtBrTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="pt-br">
      <StopwatchTool lang="pt-br" />
    </TimeShellIntl>
  );
}
