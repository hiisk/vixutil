import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'date-add');

export default function FrTimeDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="fr">
      <DateAddTool lang="fr" />
    </TimeShellIntl>
  );
}
