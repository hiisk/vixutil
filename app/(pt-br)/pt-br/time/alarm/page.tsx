import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'alarm');

export default function PtBrTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="pt-br">
      <AlarmTool lang="pt-br" />
    </TimeShellIntl>
  );
}
