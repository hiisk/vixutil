import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';

export const metadata: Metadata = {
  title: '烤模尺寸换算 — 换模具时的面糊倍数',
  description: '菜谱写的是 15cm 圆模，家里只有 18cm 方模时，这里算出面糊要做几倍。按面积比例计算，所以高度接近的模具直接照着用就行。',
  alternates: {
    canonical: '/zh/food/baking-pan',
    languages: { 'en': '/en/food/baking-pan', 'zh': '/zh/food/baking-pan', 'ko': '/food/baking-pan', 'x-default': '/en/food/baking-pan' },
  },
};

export default function ZhFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="zh">
      <BakingPanTool lang="zh" />
    </FoodShellIntl>
  );
}
