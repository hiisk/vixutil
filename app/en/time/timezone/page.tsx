import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';

export const metadata: Metadata = {
  title: "Time Zone Converter — Compare Two Cities Hour by Hour",
  description: "Converts a time between two cities in both directions and lays the whole day out side by side, so the overlap in working hours is obvious.",
  alternates: {
    canonical: '/en/time/timezone',
    languages: { 'en': '/en/time/timezone', 'ko': '/time/timezone', 'x-default': '/en/time/timezone' },
  },
};

export default function EnTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="en">
      <TimezoneTool lang="en" />
    </TimeShellIntl>
  );
}
