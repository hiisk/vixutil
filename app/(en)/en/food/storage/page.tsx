import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('en', 'storage');

export default function EnFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="en">
      <StorageTool lang="en" />
    </FoodShellIntl>
  );
}
