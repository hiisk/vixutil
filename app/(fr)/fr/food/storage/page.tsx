import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('fr', 'storage');

export default function FrFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="fr">
      <StorageTool lang="fr" />
    </FoodShellIntl>
  );
}
