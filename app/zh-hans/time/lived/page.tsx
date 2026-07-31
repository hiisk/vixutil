import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hans', 'lived');

export default function EnTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="zh-hans">
      <LivedTool lang="zh-hans" />
    </TimeShellIntl>
  );
}
