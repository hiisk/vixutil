import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('hi', 'alarm');

export default function HiTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="hi">
      <AlarmTool lang="hi" />
    </TimeShellIntl>
  );
}
