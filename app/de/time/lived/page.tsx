import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'lived');

export default function DeTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="de">
      <LivedTool lang="de" />
    </TimeShellIntl>
  );
}
