import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('ja', 'alarm');

export default function JaTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="ja">
      <AlarmTool lang="ja" />
    </TimeShellIntl>
  );
}
