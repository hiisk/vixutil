import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';

export const metadata: Metadata = {
  title: 'Brine Calculator — Salt Percentage for Pickles and Kimchi',
  description: 'Enter the salinity you want and the amount of water, and it works out how many grams of salt you need. For salting cabbage, pickling and fermenting — anything where the salinity decides the outcome — it stops you guessing.',
  alternates: {
    canonical: '/en/food/salt',
    languages: { 'en': '/en/food/salt', 'zh': '/zh/food/salt', 'ko': '/food/salt', 'x-default': '/en/food/salt' },
  },
};

export default function EnFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="en">
      <SaltTool lang="en" />
    </FoodShellIntl>
  );
}
