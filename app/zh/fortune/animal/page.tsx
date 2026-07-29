import type { Metadata } from 'next';
import SubjectFortune from '@/components/fortune/SubjectFortune';

export const metadata: Metadata = {
  title: '今日生肖运势 — 十二生肖免费查询',
  description: '免费查看鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪十二生肖今日运势：总运、爱情、财运、事业、健康。每日更新。',
  alternates: {
    canonical: '/zh/fortune/animal',
    languages: { 'zh': '/zh/fortune/animal', 'en': '/en/fortune/animal', 'ko': '/fortune/animal', 'x-default': '/en/fortune/animal' },
  },
};

export default function ZhAnimalPage() {
  return <SubjectFortune kind="animal" lang="zh" />;
}
