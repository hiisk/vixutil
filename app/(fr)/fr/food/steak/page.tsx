import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'steak');

export default function FrFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="fr">
      <SteakTool lang="fr" />
    </FoodShellIntl>
  );
}
