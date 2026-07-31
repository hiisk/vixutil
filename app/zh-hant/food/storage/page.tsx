import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('zh-hant', 'storage');

export default function EnFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="zh-hant">
      <StorageTool lang="zh-hant" />
    </FoodShellIntl>
  );
}
