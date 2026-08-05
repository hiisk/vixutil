import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'worldclock');

export default function JaTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="ja">
      <WorldClockTool lang="ja" />
    </TimeShellIntl>
  );
}
