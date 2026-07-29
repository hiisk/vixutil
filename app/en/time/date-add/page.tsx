import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';

export const metadata: Metadata = {
  title: "Date Calculator — Add or Subtract From Any Date",
  description: "Adds or subtracts days, weeks, months or years from a date, handling month-end properly and showing the resulting weekday.",
  alternates: {
    canonical: '/en/time/date-add',
    languages: { 'en': '/en/time/date-add', 'zh': '/zh/time/date-add', 'ko': '/time/date-add', 'x-default': '/en/time/date-add' },
  },
};

export default function EnDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="en">
      <DateAddTool lang="en" />
    </TimeShellIntl>
  );
}
