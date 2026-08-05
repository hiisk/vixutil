import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'oven');

export default function HiFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="hi">
      <OvenTool lang="hi" />
    </FoodShellIntl>
  );
}
