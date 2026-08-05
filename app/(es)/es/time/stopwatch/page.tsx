import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'stopwatch');

export default function EsTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="es">
      <StopwatchTool lang="es" />
    </TimeShellIntl>
  );
}
