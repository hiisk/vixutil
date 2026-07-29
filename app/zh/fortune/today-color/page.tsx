import type { Metadata } from 'next';
import TodayColor from '@/components/fortune/TodayColor';

export const metadata: Metadata = {
  title: '今日幸运色 — 免费每日幸运颜色查询',
  description: '查看今天的幸运色与要避开的颜色，附含义解释与当日小建议。免费、即时、每日更新。',
  alternates: {
    canonical: '/zh/fortune/today-color',
    languages: { 'zh': '/zh/fortune/today-color', 'en': '/en/fortune/today-color', 'ko': '/fortune/today-color', 'x-default': '/en/fortune/today-color' },
  },
};

export default function ZhTodayColorPage() {
  return <TodayColor lang="zh" />;
}
