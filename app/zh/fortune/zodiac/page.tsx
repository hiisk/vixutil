import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: '今日星座运势 — 12星座免费查询',
  description: '免费查看 12 星座今日运势：总运、爱情、财运、事业、健康，附幸运色、幸运数字与幸运物。每日更新。',
  alternates: {
    canonical: '/zh/fortune/zodiac',
    languages: { 'zh': '/zh/fortune/zodiac', 'en': '/en/fortune/zodiac', 'ko': '/fortune/zodiac', 'x-default': '/en/fortune/zodiac' },
  },
};

export default function ZhZodiacPage() {
  return <SubjectFortune kind="zodiac" lang="zh" />;
}
