import type { Metadata } from 'next';
import FoodShell from '@/components/FoodShell';
import SaltTool from '@/components/food/SaltTool';

export const metadata: Metadata = {
  title: '소금물 염도 계산 - 김장·장아찌 절임물',
  description: '원하는 염도(%)와 물의 양을 넣으면 소금이 몇 그램 필요한지 계산합니다. 배추 절이기·장아찌·피클처럼 염도가 결과를 좌우하는 요리에서 감으로 하지 않게 해줍니다.',
  alternates: { canonical: '/food/salt' },
};

export default function Page() {
  return (
    <FoodShell slug="salt">
      <SaltTool />
    </FoodShell>
  );
}
