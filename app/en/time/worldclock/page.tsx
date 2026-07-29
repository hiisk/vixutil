import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';

export const metadata: Metadata = {
  title: "World Clock — Current Time in Major Cities",
  description: "Shows the current time in major cities at a glance, marking which are on a different date and which are inside working hours.",
  alternates: {
    canonical: '/en/time/worldclock',
    languages: { 'en': '/en/time/worldclock', 'zh': '/zh/time/worldclock', 'ko': '/time/worldclock', 'x-default': '/en/time/worldclock' },
  },
};

export default function EnWorldClockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="en">
      <WorldClockTool lang="en" />
    </TimeShellIntl>
  );
}
