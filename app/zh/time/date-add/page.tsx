import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import DateAddTool from '@/components/time/DateAddTool';

export const metadata: Metadata = {
  title: "日期加减计算器 — 从任意日期加减",
  description: "在某个日期上加减日、周、月或年，正确处理月末情况，并显示结果是星期几。",
  alternates: {
    canonical: '/zh/time/date-add',
    languages: { 'en': '/en/time/date-add', 'zh': '/zh/time/date-add', 'ko': '/time/date-add', 'x-default': '/en/time/date-add' },
  },
};

export default function ZhDateAddPage() {
  return (
    <TimeShellIntl slug="date-add" lang="zh">
      <DateAddTool lang="zh" />
    </TimeShellIntl>
  );
}
