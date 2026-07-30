import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'pomodoro');

export default function DeTimePomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="de">
      <PomodoroTool lang="de" />
    </TimeShellIntl>
  );
}
