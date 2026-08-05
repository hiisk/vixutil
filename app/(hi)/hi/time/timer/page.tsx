import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'timer');

export default function HiTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="hi">
      <TimerTool lang="hi" />
    </TimeShellIntl>
  );
}
