import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import CoffeeTool from '@/components/food/CoffeeTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'coffee');

export default function EsFoodCoffeePage() {
  return (
    <FoodShellIntl slug="coffee" lang="es">
      <CoffeeTool lang="es" />
    </FoodShellIntl>
  );
}
