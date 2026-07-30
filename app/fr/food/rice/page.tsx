import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'rice');

export default function FrFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="fr">
      <RiceTool lang="fr" />
    </FoodShellIntl>
  );
}
