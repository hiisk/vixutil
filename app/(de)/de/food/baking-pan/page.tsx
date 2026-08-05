import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'baking-pan');

export default function DeFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="de">
      <BakingPanTool lang="de" />
    </FoodShellIntl>
  );
}
