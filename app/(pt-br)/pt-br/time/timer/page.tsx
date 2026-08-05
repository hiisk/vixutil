import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'timer');

export default function PtBrTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="pt-br">
      <TimerTool lang="pt-br" />
    </TimeShellIntl>
  );
}
