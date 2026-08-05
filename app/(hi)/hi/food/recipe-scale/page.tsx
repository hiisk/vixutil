import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'recipe-scale');

export default function HiFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="hi">
      <RecipeScaleTool lang="hi" />
    </FoodShellIntl>
  );
}
