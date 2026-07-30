import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'storage');

export default function PtBrFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="pt-br">
      <StorageTool lang="pt-br" />
    </FoodShellIntl>
  );
}
