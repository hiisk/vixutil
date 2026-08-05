import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'baking-pan');

export default function PtBrFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="pt-br">
      <BakingPanTool lang="pt-br" />
    </FoodShellIntl>
  );
}
