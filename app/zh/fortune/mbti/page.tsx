import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: 'MBTI 今日运势 — 16型人格免费查询',
  description: '免费查看 16 型人格今日运势：总运、爱情、财运、事业、健康，附幸运色、幸运数字与幸运物。每日更新。',
  alternates: {
    canonical: '/zh/fortune/mbti',
    languages: { 'zh': '/zh/fortune/mbti', 'en': '/en/fortune/mbti', 'ko': '/fortune/mbti', 'x-default': '/en/fortune/mbti' },
  },
};

export default function ZhMbtiFortunePage() {
  return <SubjectFortune kind="mbti" lang="zh" />;
}
