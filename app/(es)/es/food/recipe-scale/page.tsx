import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'recipe-scale');

export default function EsFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="es">
      <RecipeScaleTool lang="es" />
    </FoodShellIntl>
  );
}
