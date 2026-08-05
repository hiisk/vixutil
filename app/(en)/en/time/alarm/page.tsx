import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('en', 'alarm');

export default function EnTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="en">
      <AlarmTool lang="en" />
    </TimeShellIntl>
  );
}
