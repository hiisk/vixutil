import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'oven');

export default function EnFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="en">
      <OvenTool lang="en" />
    </FoodShellIntl>
  );
}
