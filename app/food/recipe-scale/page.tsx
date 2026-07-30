import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import FoodShell from '@/components/FoodShell';
import RecipeScaleTool from '@/components/food/RecipeScaleTool';

export const metadata: Metadata = {
  title: '레시피 배율 계산 - 인분 수에 맞춰 재료 늘리기',
  description: '레시피를 붙여 넣고 인분만 바꾸면 재료 양을 전부 다시 계산해 줍니다. 숫자와 단위를 알아서 찾아 바꾸므로 한 줄씩 곱하지 않아도 됩니다.',
  alternates: {
    canonical: '/food/recipe-scale',
    languages: alternateLanguages('/food/recipe-scale'),
  },
};

export default function Page() {
  return (
    <FoodShell slug="recipe-scale">
      <RecipeScaleTool />
    </FoodShell>
  );
}
