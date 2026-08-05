import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'pasta');

export default function FrFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="fr">
      <PastaTool lang="fr" />
    </FoodShellIntl>
  );
}
