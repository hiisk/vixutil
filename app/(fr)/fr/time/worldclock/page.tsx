import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'worldclock');

export default function FrTimeWorldclockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="fr">
      <WorldClockTool lang="fr" />
    </TimeShellIntl>
  );
}
