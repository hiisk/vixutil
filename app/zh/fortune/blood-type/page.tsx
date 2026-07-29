import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: '今日血型运势 — A、B、O、AB型免费查询',
  description: '免费查看 A 型、B 型、O 型、AB 型今日运势：总运、爱情、财运、事业、健康，附幸运色与幸运数字。每日更新。',
  alternates: {
    canonical: '/zh/fortune/blood-type',
    languages: { 'zh': '/zh/fortune/blood-type', 'en': '/en/fortune/blood-type', 'ko': '/fortune/blood-type', 'x-default': '/en/fortune/blood-type' },
  },
};

export default function ZhBloodTypePage() {
  return <SubjectFortune kind="blood" lang="zh" />;
}
