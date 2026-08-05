import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'storage');

export default function DeFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="de">
      <StorageTool lang="de" />
    </FoodShellIntl>
  );
}
