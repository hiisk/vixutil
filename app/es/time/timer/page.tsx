import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'timer');

export default function EsTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="es">
      <TimerTool lang="es" />
    </TimeShellIntl>
  );
}
