import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('zh-hans', 'alarm');

export default function EnTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="zh-hans">
      <AlarmTool lang="zh-hans" />
    </TimeShellIntl>
  );
}
