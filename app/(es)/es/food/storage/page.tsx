import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'storage');

export default function EsFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="es">
      <StorageTool lang="es" />
    </FoodShellIntl>
  );
}
