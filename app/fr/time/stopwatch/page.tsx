import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'stopwatch');

export default function FrTimeStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="fr">
      <StopwatchTool lang="fr" />
    </TimeShellIntl>
  );
}
