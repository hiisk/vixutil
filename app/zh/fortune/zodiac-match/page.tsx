import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: '生肖配对 — 十二生肖合婚免费查询',
  description: '按六合、三合、相冲等传统相性判定两个生肖的配对，附契合度分数、恋爱解读与相处建议。免费查询。',
  alternates: {
    canonical: '/zh/fortune/zodiac-match',
    languages: { 'zh': '/zh/fortune/zodiac-match', 'en': '/en/fortune/zodiac-match', 'ko': '/fortune/zodiac-match', 'x-default': '/en/fortune/zodiac-match' },
  },
};

export default function ZhZodiacMatchPage() {
  return <MatchFortune kind="zodiac" lang="zh" />;
}
