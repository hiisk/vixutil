import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hans', 'baking-pan');

export default function EnFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="zh-hans">
      <BakingPanTool lang="zh-hans" />
    </FoodShellIntl>
  );
}
