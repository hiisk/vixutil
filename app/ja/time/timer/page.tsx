import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'timer');

export default function JaTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="ja">
      <TimerTool lang="ja" />
    </TimeShellIntl>
  );
}
