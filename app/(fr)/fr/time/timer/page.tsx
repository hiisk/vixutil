import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';
import { timeMetaIntl } from '@/lib/time-tools-intl';

export const metadata: Metadata = timeMetaIntl('fr', 'timer');

export default function FrTimeTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="fr">
      <TimerTool lang="fr" />
    </TimeShellIntl>
  );
}
