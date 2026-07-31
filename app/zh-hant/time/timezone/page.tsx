import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hant', 'timezone');

export default function EnTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="zh-hant">
      <TimezoneTool lang="zh-hant" />
    </TimeShellIntl>
  );
}
