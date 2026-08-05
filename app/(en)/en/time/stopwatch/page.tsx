import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('en', 'stopwatch');

export default function EnTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="en">
      <StopwatchTool lang="en" />
    </TimeShellIntl>
  );
}
