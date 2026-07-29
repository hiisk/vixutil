import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import TimezoneTool from '@/components/time/TimezoneTool';

export const metadata: Metadata = {
  title: "时区换算 — 两城市逐小时对照",
  description: "在两个城市之间双向换算时间，并把一整天并排列出，工作时间的重叠区间一目了然。",
  alternates: {
    canonical: '/zh/time/timezone',
    languages: { 'en': '/en/time/timezone', 'zh': '/zh/time/timezone', 'ko': '/time/timezone', 'x-default': '/en/time/timezone' },
  },
};

export default function ZhTimezonePage() {
  return (
    <TimeShellIntl slug="timezone" lang="zh">
      <TimezoneTool lang="zh" />
    </TimeShellIntl>
  );
}
