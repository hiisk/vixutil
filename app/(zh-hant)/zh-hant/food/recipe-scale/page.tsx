import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hant', 'recipe-scale');

export default function EnFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="zh-hant">
      <RecipeScaleTool lang="zh-hant" />
    </FoodShellIntl>
  );
}
