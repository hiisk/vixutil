import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'lived');

export default function EnTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="zh-hant">
      <LivedTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
