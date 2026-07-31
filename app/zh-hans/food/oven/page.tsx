import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hans', 'oven');

export default function EnFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="zh-hans">
      <OvenTool lang="zh-hans" />
    </FoodShellIntl>
  );
}
