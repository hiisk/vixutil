import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import StopwatchTool from '@/components/time/StopwatchTool';

export const metadata: Metadata = {
  title: "在线秒表 — 免费，支持分段计时",
  description: "精确到百分之一秒，并可记录分段，方便比较每一段用了多久、哪一段最快。",
  alternates: {
    canonical: '/zh/time/stopwatch',
    languages: { 'en': '/en/time/stopwatch', 'zh': '/zh/time/stopwatch', 'ko': '/time/stopwatch', 'x-default': '/en/time/stopwatch' },
  },
};

export default function ZhStopwatchPage() {
  return (
    <TimeShellIntl slug="stopwatch" lang="zh">
      <StopwatchTool lang="zh" />
    </TimeShellIntl>
  );
}
