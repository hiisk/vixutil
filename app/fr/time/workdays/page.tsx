import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'workdays');

export default function FrTimeWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="fr">
      <WorkdaysTool lang="fr" />
    </TimeShellIntl>
  );
}
