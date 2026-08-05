import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'workdays');

export default function EsTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="es">
      <WorkdaysTool lang="es" />
    </TimeShellIntl>
  );
}
