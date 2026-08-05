import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'baking-pan');

export default function EnFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="en">
      <BakingPanTool lang="en" />
    </FoodShellIntl>
  );
}
