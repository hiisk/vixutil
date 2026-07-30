import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'recipe-scale');

export default function JaFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="ja">
      <RecipeScaleTool lang="ja" />
    </FoodShellIntl>
  );
}
