import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'stopwatch');

export default function DeTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="de">
      <StopwatchTool lang="de" />
    </TimeShellIntl>
  );
}
