import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'oven');

export default function FrFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="fr">
      <OvenTool lang="fr" />
    </FoodShellIntl>
  );
}
