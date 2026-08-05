import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'pomodoro');

export default function JaTimePomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="ja">
      <PomodoroTool lang="ja" />
    </TimeShellIntl>
  );
}
