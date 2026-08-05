import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'stopwatch');

export default function HiTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="hi">
      <StopwatchTool lang="hi" />
    </TimeShellIntl>
  );
}
