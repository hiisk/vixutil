import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'salt');

export default function FrFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="fr">
      <SaltTool lang="fr" />
    </FoodShellIntl>
  );
}
