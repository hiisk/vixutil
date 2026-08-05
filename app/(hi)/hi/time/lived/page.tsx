import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'lived');

export default function HiTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="hi">
      <LivedTool lang="hi" />
    </TimeShellIntl>
  );
}
