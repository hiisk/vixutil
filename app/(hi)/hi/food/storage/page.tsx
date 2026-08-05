import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'storage');

export default function HiFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="hi">
      <StorageTool lang="hi" />
    </FoodShellIntl>
  );
}
