import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';

export const metadata: Metadata = {
  title: '菜谱份量换算 — 按人数调整材料用量',
  description: '把菜谱贴进来，只改份数，所有材料用量都会重新算好。它会自己找出数字和单位，不用一行行去乘。',
  alternates: {
    canonical: '/zh/food/recipe-scale',
    languages: { 'en': '/en/food/recipe-scale', 'zh': '/zh/food/recipe-scale', 'ko': '/food/recipe-scale', 'x-default': '/en/food/recipe-scale' },
  },
};

export default function ZhFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="zh">
      <RecipeScaleTool lang="zh" />
    </FoodShellIntl>
  );
}
