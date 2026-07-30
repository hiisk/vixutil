import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import RiceTool from '@/components/food/RiceTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'rice');

export default function HiFoodRicePage() {
  return (
    <FoodShellIntl slug="rice" lang="hi">
      <RiceTool lang="hi" />
    </FoodShellIntl>
  );
}
