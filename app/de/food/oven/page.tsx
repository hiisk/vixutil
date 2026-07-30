import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'oven');

export default function DeFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="de">
      <OvenTool lang="de" />
    </FoodShellIntl>
  );
}
