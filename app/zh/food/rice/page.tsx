import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';

export const metadata: Metadata = {
  title: '米水比例计算 — 按米种算加水量',
  description: '根据米量和你想要的软硬度，算出该加多少水。白米、糙米、杂粮各不相同，陈米要多加水这一点也考虑进去了。',
  alternates: {
    canonical: '/zh/food/rice',
    languages: { 'en': '/en/food/rice', 'zh': '/zh/food/rice', 'ko': '/food/rice', 'x-default': '/en/food/rice' },
  },
};

export default function ZhFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="zh">
      <RiceTool lang="zh" />
    </FoodShellIntl>
  );
}
