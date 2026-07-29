import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';

export const metadata: Metadata = {
  title: 'Baking Pan Size Converter — Scale Batter Between Tins',
  description: 'The recipe says a 15cm round tin and all you own is an 18cm square one — this works out how much to scale the batter. It compares by area, so tins of a similar depth come out right as they are.',
  alternates: {
    canonical: '/en/food/baking-pan',
    languages: { 'en': '/en/food/baking-pan', 'zh': '/zh/food/baking-pan', 'ko': '/food/baking-pan', 'x-default': '/en/food/baking-pan' },
  },
};

export default function EnFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="en">
      <BakingPanTool lang="en" />
    </FoodShellIntl>
  );
}
