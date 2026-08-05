import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'timezone');

export default function EsTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="es">
      <TimezoneTool lang="es" />
    </TimeShellIntl>
  );
}
