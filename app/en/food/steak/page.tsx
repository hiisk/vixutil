import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';

export const metadata: Metadata = {
  title: 'Steak Doneness Chart — Internal Temperature and Timing',
  description: 'Internal temperature for each level of doneness, and when to pull it off the heat given how much carryover cooking will happen. Enter the thickness and it estimates roughly how long per side.',
  alternates: {
    canonical: '/en/food/steak',
    languages: { 'en': '/en/food/steak', 'zh': '/zh/food/steak', 'ko': '/food/steak', 'x-default': '/en/food/steak' },
  },
};

export default function EnFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="en">
      <SteakTool lang="en" />
    </FoodShellIntl>
  );
}
