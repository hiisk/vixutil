import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'worldclock');

export default function DeTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="de">
      <WorldClockTool lang="de" />
    </TimeShellIntl>
  );
}
