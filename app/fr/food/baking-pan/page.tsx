import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'baking-pan');

export default function FrFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="fr">
      <BakingPanTool lang="fr" />
    </FoodShellIntl>
  );
}
