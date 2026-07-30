import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'timezone');

export default function JaTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="ja">
      <TimezoneTool lang="ja" />
    </TimeShellIntl>
  );
}
