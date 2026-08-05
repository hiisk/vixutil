import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'timer');

export default function EnTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="zh-hant">
      <TimerTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
