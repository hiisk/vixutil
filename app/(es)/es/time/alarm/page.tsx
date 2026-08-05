import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'alarm');

export default function EsTimeAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="es">
      <AlarmTool lang="es" />
    </TimeShellIntl>
  );
}
