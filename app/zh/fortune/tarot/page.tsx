import type { Metadata } from 'next';
import TarotSpreadIntl from '@/components/fortune/TarotSpreadIntl';

export const metadata: Metadata = {
  title: '在线塔罗占卜 — 免费 78 张全牌阵',
  description: '用完整的 78 张塔罗牌免费占卜：单张、过去现在未来、关系牌阵，或完整的凯尔特十字。每张牌都有正位与逆位解释。',
  alternates: {
    canonical: '/zh/fortune/tarot',
    languages: { 'en': '/en/fortune/tarot', 'zh': '/zh/fortune/tarot', 'ko': '/fortune/tarot', 'x-default': '/en/fortune/tarot' },
  },
};

export default function ZhTarotSpreadPage() {
  return <TarotSpreadIntl lang="zh" />;
}
