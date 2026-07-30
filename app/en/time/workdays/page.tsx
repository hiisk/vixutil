import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';

export const metadata: Metadata = {
  title: "Working Days Calculator — Business Days Between Dates",
  description: "Counts working days between two dates with weekends excluded, and can also give the date a set number of working days ahead.",
  alternates: {
    canonical: '/en/time/workdays',
    languages: { 'en': '/en/time/workdays', 'ko': '/time/workdays', 'x-default': '/en/time/workdays' },
  },
};

export default function EnWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="en">
      <WorkdaysTool lang="en" />
    </TimeShellIntl>
  );
}
