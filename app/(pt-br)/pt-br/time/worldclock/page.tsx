import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'worldclock');

export default function PtBrTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="pt-br">
      <WorldClockTool lang="pt-br" />
    </TimeShellIntl>
  );
}
