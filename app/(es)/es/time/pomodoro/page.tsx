import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'pomodoro');

export default function EsTimePomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="es">
      <PomodoroTool lang="es" />
    </TimeShellIntl>
  );
}
