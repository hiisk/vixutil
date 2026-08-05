import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'pomodoro');

export default function FrTimePomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="fr">
      <PomodoroTool lang="fr" />
    </TimeShellIntl>
  );
}
