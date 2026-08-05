import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'worldclock');

export default function EnTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="zh-hant">
      <WorldClockTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
