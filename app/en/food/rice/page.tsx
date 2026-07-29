import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';

export const metadata: Metadata = {
  title: 'Rice to Water Ratio Calculator — By Rice Type',
  description: 'Works out how much water to add based on how much rice you have and how soft you want it. White, brown and mixed grains all differ, and older rice needs more water — that is factored in too.',
  alternates: {
    canonical: '/en/food/rice',
    languages: { 'en': '/en/food/rice', 'zh': '/zh/food/rice', 'ko': '/food/rice', 'x-default': '/en/food/rice' },
  },
};

export default function EnFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="en">
      <RiceTool lang="en" />
    </FoodShellIntl>
  );
}
