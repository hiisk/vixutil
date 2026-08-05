import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'pasta');

export default function PtBrFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="pt-br">
      <PastaTool lang="pt-br" />
    </FoodShellIntl>
  );
}
