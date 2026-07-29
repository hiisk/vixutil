import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import WeekNumberTool from '@/components/time/WeekNumberTool';

export const metadata: Metadata = {
  title: "周数计算器 — ISO 8601 周数与季度",
  description: "给出任意日期的 ISO 8601 周数，以及所属季度、年内第几天，还有那一周的周一到周日。",
  alternates: {
    canonical: '/zh/time/weeknumber',
    languages: { 'en': '/en/time/weeknumber', 'zh': '/zh/time/weeknumber', 'ko': '/time/weeknumber', 'x-default': '/en/time/weeknumber' },
  },
};

export default function ZhWeekNumberPage() {
  return (
    <TimeShellIntl slug="weeknumber" lang="zh">
      <WeekNumberTool lang="zh" />
    </TimeShellIntl>
  );
}
