import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'weeknumber');

export default function EsTimeWeeknumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="es">
      <WeekNumberTool lang="es" />
    </TimeShellIntl>
  );
}
