import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hans', 'storage');

export default function EnFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="zh-hans">
      <StorageTool lang="zh-hans" />
    </FoodShellIntl>
  );
}
