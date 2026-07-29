import type { Metadata } from 'next';
import TarotIntl from '@/components/fortune/TarotIntl';

export const metadata: Metadata = {
  title: "塔罗是与否 — 抽一张牌",
  description: "心里想着问题，抽一张塔罗牌得到「是」「否」或「尚未明朗」的答案。免费，附完整牌义解读。",
  alternates: {
    canonical: '/zh/fortune/tarot-yesno',
    languages: { 'en': '/en/fortune/tarot-yesno', 'zh': '/zh/fortune/tarot-yesno', 'ko': '/fortune/tarot-yesno', 'x-default': '/en/fortune/tarot-yesno' },
  },
};

export default function ZhTarotYesNoPage() {
  return <TarotIntl mode="yesno" lang="zh" />;
}
