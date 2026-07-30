import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('en', 'worldclock');

export default function EnTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="en">
      <WorldClockTool lang="en" />
    </TimeShellIntl>
  );
}
