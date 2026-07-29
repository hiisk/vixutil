import type { Metadata } from 'next';
import TimeShellIntl from '@/components/TimeShellIntl';
import LivedTool from '@/components/time/LivedTool';

export const metadata: Metadata = {
  title: "已活时间计算器 — 出生至今的天数、小时与分钟",
  description: "把出生日期换算成年月日与总天数，再换算成小时、分钟、秒 —— 并给出下一个千日纪念日。",
  alternates: {
    canonical: '/zh/time/lived',
    languages: { 'en': '/en/time/lived', 'zh': '/zh/time/lived', 'ko': '/time/lived', 'x-default': '/en/time/lived' },
  },
};

export default function ZhLivedPage() {
  return (
    <TimeShellIntl slug="lived" lang="zh">
      <LivedTool lang="zh" />
    </TimeShellIntl>
  );
}
