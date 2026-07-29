import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import PomodoroTool from '@/components/time/PomodoroTool';

export const metadata: Metadata = {
  title: "番茄钟 — 免费 25／5 专注循环",
  description: "自动在专注与休息之间切换，每四轮安排一次较长的休息。",
  alternates: {
    canonical: '/zh/time/pomodoro',
    languages: { 'en': '/en/time/pomodoro', 'zh': '/zh/time/pomodoro', 'ko': '/time/pomodoro', 'x-default': '/en/time/pomodoro' },
  },
};

export default function ZhPomodoroPage() {
  return (
    <TimeShellIntl slug="pomodoro" lang="zh">
      <PomodoroTool lang="zh" />
    </TimeShellIntl>
  );
}
