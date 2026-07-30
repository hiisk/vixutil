import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'oven');

export default function JaFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="ja">
      <OvenTool lang="ja" />
    </FoodShellIntl>
  );
}
