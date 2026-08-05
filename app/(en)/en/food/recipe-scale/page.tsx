import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'recipe-scale');

export default function EnFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="en">
      <RecipeScaleTool lang="en" />
    </FoodShellIntl>
  );
}
