import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'lived');

export default function JaTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="ja">
      <LivedTool lang="ja" />
    </TimeShellIntl>
  );
}
