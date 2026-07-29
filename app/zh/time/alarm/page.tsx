import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import AlarmTool from '@/components/time/AlarmTool';

export const metadata: Metadata = {
  title: "在线闹钟 — 免费，可设定任意时刻",
  description: "设定时与分，到点响铃，同时显示还要等多久。",
  alternates: {
    canonical: '/zh/time/alarm',
    languages: { 'en': '/en/time/alarm', 'zh': '/zh/time/alarm', 'ko': '/time/alarm', 'x-default': '/en/time/alarm' },
  },
};

export default function ZhAlarmPage() {
  return (
    <TimeShellIntl slug="alarm" lang="zh">
      <AlarmTool lang="zh" />
    </TimeShellIntl>
  );
}
