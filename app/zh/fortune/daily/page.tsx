import type { Metadata } from 'next';
import DailyFortune from '@/components/fortune/DailyFortune';

export const metadata: Metadata = {
  title: '今日综合运势 — 按出生日期免费查询',
  description: '输入出生日期即可查看今日运势：总运、爱情、财运、事业、健康，附幸运色、幸运数字、幸运方位与幸运物。每日更新。',
  alternates: {
    canonical: '/zh/fortune/daily',
    languages: { 'zh': '/zh/fortune/daily', 'en': '/en/fortune/daily', 'ko': '/fortune/daily', 'x-default': '/en/fortune/daily' },
  },
};

export default function ZhDailyFortunePage() {
  return <DailyFortune lang="zh" />;
}
