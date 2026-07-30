import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'storage');

export default function JaFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="ja">
      <StorageTool lang="ja" />
    </FoodShellIntl>
  );
}
