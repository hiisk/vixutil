import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';

export const metadata: Metadata = {
  title: '意面水量计算 — 水与盐的黄金比例',
  description: '每 100g 面配 1L 水、10g 盐是基本比例。输入面的重量就能算出水和盐，还会给出各种面型的煮制时间。',
  alternates: {
    canonical: '/zh/food/pasta',
    languages: { 'en': '/en/food/pasta', 'zh': '/zh/food/pasta', 'ko': '/food/pasta', 'x-default': '/en/food/pasta' },
  },
};

export default function ZhFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="zh">
      <PastaTool lang="zh" />
    </FoodShellIntl>
  );
}
