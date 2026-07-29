import type { Metadata } from 'next';
import MatchFortune from '@/components/fortune/MatchFortune';

export const metadata: Metadata = {
  title: '血型配对 — A、B、O、AB 型契合度查询',
  description: '查询 A、B、O、AB 四种血型中任意两者的配对结果，附契合度分数、原因解读、恋爱相处与建议。免费查询。',
  alternates: {
    canonical: '/zh/fortune/blood-match',
    languages: { 'zh': '/zh/fortune/blood-match', 'en': '/en/fortune/blood-match', 'ko': '/fortune/blood-match', 'x-default': '/en/fortune/blood-match' },
  },
};

export default function ZhBloodMatchPage() {
  return <MatchFortune kind="blood" lang="zh" />;
}
