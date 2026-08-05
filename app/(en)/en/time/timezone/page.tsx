import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('en', 'timezone');

export default function EnTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="en">
      <TimezoneTool lang="en" />
    </TimeShellIntl>
  );
}
