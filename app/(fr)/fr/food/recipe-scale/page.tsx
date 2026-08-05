import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'recipe-scale');

export default function FrFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="fr">
      <RecipeScaleTool lang="fr" />
    </FoodShellIntl>
  );
}
