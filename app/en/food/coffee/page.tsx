import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';

export const metadata: Metadata = {
  title: 'Coffee to Water Ratio Calculator — Pour Over, French Press, Cold Brew',
  description: 'Works out the coffee-to-water ratio for pour over, French press and cold brew, which are all different. Decide how much you want to drink and it tells you how many grams to grind.',
  alternates: {
    canonical: '/en/food/coffee',
    languages: { 'en': '/en/food/coffee', 'zh': '/zh/food/coffee', 'ko': '/food/coffee', 'x-default': '/en/food/coffee' },
  },
};

export default function EnFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="en">
      <CoffeeTool lang="en" />
    </FoodShellIntl>
  );
}
