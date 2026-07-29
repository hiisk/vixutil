import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: '星座配对 — 12星座合盘免费查询',
  description: '按火、土、风、水四元素判定两个星座的相配程度，附契合度分数、恋爱解读与相处建议。免费查询。',
  alternates: {
    canonical: '/zh/fortune/star-match',
    languages: { 'zh': '/zh/fortune/star-match', 'en': '/en/fortune/star-match', 'ko': '/fortune/star-match', 'x-default': '/en/fortune/star-match' },
  },
};

export default function ZhStarMatchPage() {
  return <MatchFortune kind="star" lang="zh" />;
}
