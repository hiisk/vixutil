import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'baking-pan');

export default function JaFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="ja">
      <BakingPanTool lang="ja" />
    </FoodShellIntl>
  );
}
