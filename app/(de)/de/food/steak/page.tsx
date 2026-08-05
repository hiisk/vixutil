import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SteakTool from '@/components/food/SteakTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'steak');

export default function DeFoodSteakPage() {
  return (
    <FoodShellIntl slug="steak" lang="de">
      <SteakTool lang="de" />
    </FoodShellIntl>
  );
}
