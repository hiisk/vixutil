import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';

export const metadata: Metadata = {
  title: '食品保存期限 — 冷藏与冷冻天数对照',
  description: '整理了肉、鱼、乳制品、熟食在冷藏和冷冻各能放几天，以及怎么放才更耐久。既少扔掉本来还好的，也少吃到已经不行的。',
  alternates: {
    canonical: '/zh/food/storage',
    languages: { 'en': '/en/food/storage', 'zh': '/zh/food/storage', 'ko': '/food/storage', 'x-default': '/en/food/storage' },
  },
};

export default function ZhFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="zh">
      <StorageTool lang="zh" />
    </FoodShellIntl>
  );
}
