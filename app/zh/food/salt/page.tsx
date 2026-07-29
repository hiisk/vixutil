import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';

export const metadata: Metadata = {
  title: '盐水浓度计算 — 腌菜与泡菜的盐分比例',
  description: '输入想要的盐度（%）和水量，就能算出需要多少克盐。腌白菜、做酱菜、泡菜这类盐度直接决定成败的料理，不用再靠感觉。',
  alternates: {
    canonical: '/zh/food/salt',
    languages: { 'en': '/en/food/salt', 'zh': '/zh/food/salt', 'ko': '/food/salt', 'x-default': '/en/food/salt' },
  },
};

export default function ZhFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="zh">
      <SaltTool lang="zh" />
    </FoodShellIntl>
  );
}
