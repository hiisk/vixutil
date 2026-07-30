import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';

export const metadata: Metadata = {
  title: "Pomodoro Timer — Free 25/5 Focus Cycles",
  description: "Runs focus and break periods and switches between them for you, with a longer break every fourth round.",
  alternates: {
    canonical: '/en/time/pomodoro',
    languages: { 'en': '/en/time/pomodoro', 'ko': '/time/pomodoro', 'x-default': '/en/time/pomodoro' },
  },
};

export default function EnPomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="en">
      <PomodoroTool lang="en" />
    </TimeShellIntl>
  );
}
