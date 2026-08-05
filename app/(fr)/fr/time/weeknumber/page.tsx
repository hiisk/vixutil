import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'weeknumber');

export default function FrTimeWeeknumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="fr">
      <WeekNumberTool lang="fr" />
    </TimeShellIntl>
  );
}
