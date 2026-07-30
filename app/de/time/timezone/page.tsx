import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'timezone');

export default function DeTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="de">
      <TimezoneTool lang="de" />
    </TimeShellIntl>
  );
}
