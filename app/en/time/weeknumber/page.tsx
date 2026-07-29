import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';

export const metadata: Metadata = {
  title: "Week Number Calculator — ISO 8601 Week and Quarter",
  description: "Gives the ISO 8601 week number for any date, along with the quarter, the day of the year and that week’s Monday to Sunday.",
  alternates: {
    canonical: '/en/time/weeknumber',
    languages: { 'en': '/en/time/weeknumber', 'zh': '/zh/time/weeknumber', 'ko': '/time/weeknumber', 'x-default': '/en/time/weeknumber' },
  },
};

export default function EnWeekNumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="en">
      <WeekNumberTool lang="en" />
    </TimeShellIntl>
  );
}
