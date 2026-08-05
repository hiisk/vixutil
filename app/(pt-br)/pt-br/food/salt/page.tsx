import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import SaltTool from '@/components/food/SaltTool';
import { foodMetaIntl } from '@/lib/food-tools-intl';

export const metadata: Metadata = foodMetaIntl('pt-br', 'salt');

export default function PtBrFoodSaltPage() {
  return (
    <FoodShellIntl slug="salt" lang="pt-br">
      <SaltTool lang="pt-br" />
    </FoodShellIntl>
  );
}
