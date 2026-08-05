import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'stopwatch');

export default function JaTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="ja">
      <StopwatchTool lang="ja" />
    </TimeShellIntl>
  );
}
