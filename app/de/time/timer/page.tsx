import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'timer');

export default function DeTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="de">
      <TimerTool lang="de" />
    </TimeShellIntl>
  );
}
