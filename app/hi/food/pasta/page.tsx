import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('hi', 'pasta');

export default function HiFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="hi">
      <PastaTool lang="hi" />
    </FoodShellIntl>
  );
}
