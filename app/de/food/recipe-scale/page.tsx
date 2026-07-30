import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'recipe-scale');

export default function DeFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="de">
      <RecipeScaleTool lang="de" />
    </FoodShellIntl>
  );
}
