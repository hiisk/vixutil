import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import FoodShell from '@/components/FoodShell';
import RiceTool from '@/components/food/RiceTool';

export const metadata: Metadata = {
  title: '밥물 계산 - 쌀 양에 맞는 물의 양',
  description: '쌀의 양과 원하는 밥의 질기에 따라 물을 얼마나 넣어야 하는지 계산합니다. 백미·현미·잡곡이 서로 다르고, 묵은쌀은 물을 더 넣어야 한다는 것까지 반영합니다.',
  alternates: {
    canonical: '/food/rice',
    languages: alternateLanguages10('/food/rice'),
  },
};

export default function Page() {
  return (
    <FoodShell slug="rice">
      <RiceTool />
    </FoodShell>
  );
}
