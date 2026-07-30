import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';

export const metadata: Metadata = {
  title: 'Recipe Scaler — Adjust Ingredients by Servings',
  description: 'Paste a recipe, change the servings, and every ingredient amount is recalculated. It finds the numbers and units itself, so you are not multiplying line by line.',
  alternates: {
    canonical: '/en/food/recipe-scale',
    languages: { 'en': '/en/food/recipe-scale', 'ko': '/food/recipe-scale', 'x-default': '/en/food/recipe-scale' },
  },
};

export default function EnFoodRecipeScalePage() {
  return (
    <FoodShellIntl slug="recipe-scale" lang="en">
      <RecipeScaleTool lang="en" />
    </FoodShellIntl>
  );
}
