import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'pomodoro');

export default function HiTimePomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="hi">
      <PomodoroTool lang="hi" />
    </TimeShellIntl>
  );
}
