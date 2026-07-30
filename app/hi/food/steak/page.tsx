import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'steak');

export default function HiFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="hi">
      <SteakTool lang="hi" />
    </FoodShellIntl>
  );
}
