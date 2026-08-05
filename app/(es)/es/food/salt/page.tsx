import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'salt');

export default function EsFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="es">
      <SaltTool lang="es" />
    </FoodShellIntl>
  );
}
