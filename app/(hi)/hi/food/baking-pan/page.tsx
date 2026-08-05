import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import BakingPanTool from '@/components/food/BakingPanTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'baking-pan');

export default function HiFoodBakingPanPage() {
  return (
    <FoodShellIntl slug="baking-pan" lang="hi">
      <BakingPanTool lang="hi" />
    </FoodShellIntl>
  );
}
