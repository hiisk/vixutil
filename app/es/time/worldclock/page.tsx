import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'worldclock');

export default function EsTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="es">
      <WorldClockTool lang="es" />
    </TimeShellIntl>
  );
}
