import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('de', 'alarm');

export default function DeTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="de">
      <AlarmTool lang="de" />
    </TimeShellIntl>
  );
}
