import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimerTool from '@/components/time/TimerTool';

export const metadata: Metadata = {
  title: "在线计时器 — 免费倒计时闹铃",
  description: "设定分秒后，剩余时间会以大字显示，结束时用声音提醒。三分钟、十分钟这类常用时长按一下就能设好。",
  alternates: {
    canonical: '/zh/time/timer',
    languages: { 'en': '/en/time/timer', 'zh': '/zh/time/timer', 'ko': '/time/timer', 'x-default': '/en/time/timer' },
  },
};

export default function ZhTimerPage() {
  return (
    <TimeShellIntl slug="timer" lang="zh">
      <TimerTool lang="zh" />
    </TimeShellIntl>
  );
}
