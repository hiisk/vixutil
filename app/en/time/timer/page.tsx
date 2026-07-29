import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';

export const metadata: Metadata = {
  title: "Online Timer — Free Countdown With Alarm",
  description: "Set minutes and seconds, watch the remaining time in large digits, and get a sound when it finishes. Common lengths like three minutes or ten are one button away.",
  alternates: {
    canonical: '/en/time/timer',
    languages: { 'en': '/en/time/timer', 'zh': '/zh/time/timer', 'ko': '/time/timer', 'x-default': '/en/time/timer' },
  },
};

export default function EnTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="en">
      <TimerTool lang="en" />
    </TimeShellIntl>
  );
}
