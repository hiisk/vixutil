import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'rice');

export default function DeFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="de">
      <RiceTool lang="de" />
    </FoodShellIntl>
  );
}
