import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';

export const metadata: Metadata = {
  title: "Online Stopwatch — Free, With Lap Times",
  description: "Times to a hundredth of a second and records laps, so you can compare each split and see which was quickest.",
  alternates: {
    canonical: '/en/time/stopwatch',
    languages: { 'en': '/en/time/stopwatch', 'ko': '/time/stopwatch', 'x-default': '/en/time/stopwatch' },
  },
};

export default function EnStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="en">
      <StopwatchTool lang="en" />
    </TimeShellIntl>
  );
}
