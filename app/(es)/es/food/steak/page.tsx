import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('es', 'steak');

export default function EsFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="es">
      <SteakTool lang="es" />
    </FoodShellIntl>
  );
}
