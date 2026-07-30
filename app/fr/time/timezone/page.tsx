import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'timezone');

export default function FrTimeTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="fr">
      <TimezoneTool lang="fr" />
    </TimeShellIntl>
  );
}
