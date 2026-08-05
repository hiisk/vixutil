import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'recipe-scale');

export default function PtBrFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="pt-br">
      <RecipeScaleTool lang="pt-br" />
    </FoodShellIntl>
  );
}
