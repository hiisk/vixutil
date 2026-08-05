import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'alarm');

export default function FrTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="fr">
      <AlarmTool lang="fr" />
    </TimeShellIntl>
  );
}
