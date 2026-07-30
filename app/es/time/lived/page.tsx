import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('es', 'lived');

export default function EsTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="es">
      <LivedTool lang="es" />
    </TimeShellIntl>
  );
}
