import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('de', 'pasta');

export default function DeFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="de">
      <PastaTool lang="de" />
    </FoodShellIntl>
  );
}
