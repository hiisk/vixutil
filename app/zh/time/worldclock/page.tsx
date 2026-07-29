import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorldClockTool from '@/components/time/WorldClockTool';

export const metadata: Metadata = {
  title: "世界时钟 — 主要城市当前时间",
  description: "一眼看清主要城市的当前时间，并标出日期不同的城市，以及哪些正处在工作时间。",
  alternates: {
    canonical: '/zh/time/worldclock',
    languages: { 'en': '/en/time/worldclock', 'zh': '/zh/time/worldclock', 'ko': '/time/worldclock', 'x-default': '/en/time/worldclock' },
  },
};

export default function ZhWorldClockPage() {
  return (
    <TimeShellIntl slug="worldclock" lang="zh">
      <WorldClockTool lang="zh" />
    </TimeShellIntl>
  );
}
