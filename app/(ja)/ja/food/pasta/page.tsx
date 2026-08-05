import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('ja', 'pasta');

export default function JaFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="ja">
      <PastaTool lang="ja" />
    </FoodShellIntl>
  );
}
