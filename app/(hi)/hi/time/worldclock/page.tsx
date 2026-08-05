import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'worldclock');

export default function HiTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="hi">
      <WorldClockTool lang="hi" />
    </TimeShellIntl>
  );
}
