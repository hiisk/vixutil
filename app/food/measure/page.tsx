import type { Metadata } from 'next';
import FoodShell from '@/components/FoodShell';
import MeasureTool from '@/components/food/MeasureTool';

export const metadata: Metadata = {
  title: '계량 변환 - 컵·큰술을 그램으로 바꾸기',
  description: '밀가루 1컵은 120g, 설탕 1컵은 200g입니다. 같은 부피라도 재료마다 무게가 다르므로 재료를 골라야 정확합니다. 저울이 없을 때는 반대로 그램을 컵·큰술로 바꿔 볼 수도 있습니다.',
  alternates: { canonical: '/food/measure' },
};

export default function Page() {
  return (
    <FoodShell slug="measure">
      <MeasureTool />
    </FoodShell>
  );
}
