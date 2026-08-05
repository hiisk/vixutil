import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('pt-br', 'lived');

export default function PtBrTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="pt-br">
      <LivedTool lang="pt-br" />
    </TimeShellIntl>
  );
}
