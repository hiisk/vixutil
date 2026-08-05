import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'pasta');

export default function EsFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="es">
      <PastaTool lang="es" />
    </FoodShellIntl>
  );
}
