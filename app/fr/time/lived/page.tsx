import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'lived');

export default function FrTimeLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="fr">
      <LivedTool lang="fr" />
    </TimeShellIntl>
  );
}
