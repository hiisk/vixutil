import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'timezone');

export default function HiTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="hi">
      <TimezoneTool lang="hi" />
    </TimeShellIntl>
  );
}
