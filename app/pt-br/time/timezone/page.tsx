import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'timezone');

export default function PtBrTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="pt-br">
      <TimezoneTool lang="pt-br" />
    </TimeShellIntl>
  );
}
