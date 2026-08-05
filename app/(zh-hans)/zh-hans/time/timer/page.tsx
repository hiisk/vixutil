import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hans', 'timer');

export default function EnTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="zh-hans">
      <TimerTool lang="zh-hans" />
    </TimeShellIntl>
  );
}
