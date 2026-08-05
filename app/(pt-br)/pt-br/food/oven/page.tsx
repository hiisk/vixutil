import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'oven');

export default function PtBrFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="pt-br">
      <OvenTool lang="pt-br" />
    </FoodShellIntl>
  );
}
