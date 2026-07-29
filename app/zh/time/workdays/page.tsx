import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WorkdaysTool from '@/components/time/WorkdaysTool';

export const metadata: Metadata = {
  title: "工作日计算器 — 两个日期之间的工作日",
  description: "计算两个日期之间不含周末的工作日天数，也可以求出「n 个工作日之后」是哪一天。",
  alternates: {
    canonical: '/zh/time/workdays',
    languages: { 'en': '/en/time/workdays', 'zh': '/zh/time/workdays', 'ko': '/time/workdays', 'x-default': '/en/time/workdays' },
  },
};

export default function ZhWorkdaysPage() {
  return (
    <TimeShellIntl slug="workdays" lang="zh">
      <WorkdaysTool lang="zh" />
    </TimeShellIntl>
  );
}
