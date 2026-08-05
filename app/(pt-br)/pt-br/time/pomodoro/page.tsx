import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'pomodoro');

export default function PtBrTimePomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="pt-br">
      <PomodoroTool lang="pt-br" />
    </TimeShellIntl>
  );
}
