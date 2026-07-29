import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';

export const metadata: Metadata = {
  title: "Time Lived Calculator — Days, Hours and Minutes Since Birth",
  description: "Converts your date of birth into years, months and days, then into total days, hours, minutes and seconds — with the next thousand-day milestone.",
  alternates: {
    canonical: '/en/time/lived',
    languages: { 'en': '/en/time/lived', 'zh': '/zh/time/lived', 'ko': '/time/lived', 'x-default': '/en/time/lived' },
  },
};

export default function EnLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="en">
      <LivedTool lang="en" />
    </TimeShellIntl>
  );
}
