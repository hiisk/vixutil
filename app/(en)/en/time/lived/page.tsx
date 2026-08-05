import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('en', 'lived');

export default function EnTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="en">
      <LivedTool lang="en" />
    </TimeShellIntl>
  );
}
