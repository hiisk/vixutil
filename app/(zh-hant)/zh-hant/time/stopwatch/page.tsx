import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'stopwatch');

export default function EnTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="zh-hant">
      <StopwatchTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
