import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'pomodoro');

export default function EnTimePomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="zh-hant">
      <PomodoroTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
