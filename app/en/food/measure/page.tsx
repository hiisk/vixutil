import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import MeasureTool from '@/components/food/MeasureTool';

export const metadata: Metadata = {
  title: 'Cups to Grams Converter — By Ingredient, Free',
  description: 'A cup of flour is 120g; a cup of sugar is 200g. The same volume weighs a different amount depending on what is in it, so you have to pick the ingredient to get this right. With no scale, you can also go the other way and turn grams into cups and spoons.',
  alternates: {
    canonical: '/en/food/measure',
    languages: { 'en': '/en/food/measure', 'zh': '/zh/food/measure', 'ko': '/food/measure', 'x-default': '/en/food/measure' },
  },
};

export default function EnFoodMeasurePage() {
  return (
    <FoodShellIntl slug="measure" lang="en">
      <MeasureTool lang="en" />
    </FoodShellIntl>
  );
}
