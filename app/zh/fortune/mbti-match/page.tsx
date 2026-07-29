import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: 'MBTI 配对 — 16型人格契合度免费查询',
  description: '查询 16 型人格中任意两个类型的契合度，看 E/I、N/S、T/F、J/P 四个维度如何相配，附分数与相处建议。免费查询。',
  alternates: {
    canonical: '/zh/fortune/mbti-match',
    languages: { 'zh': '/zh/fortune/mbti-match', 'en': '/en/fortune/mbti-match', 'ko': '/fortune/mbti-match', 'x-default': '/en/fortune/mbti-match' },
  },
};

export default function ZhMbtiMatchPage() {
  return <MatchFortune kind="mbti" lang="zh" />;
}
