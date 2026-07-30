import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'date-add');

export default function EsTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="es">
      <DateAddTool lang="es" />
    </TimeShellIntl>
  );
}
