import type { Metadata } from 'next';
import FoodShell from '@/components/FoodShell';
import StorageTool from '@/components/food/StorageTool';

export const metadata: Metadata = {
  title: '식품 보관 기간 - 냉장·냉동 보관일 확인',
  description: '고기·생선·유제품·조리식품이 냉장과 냉동에서 각각 며칠까지 괜찮은지, 어떻게 두어야 오래 가는지 정리했습니다. 애매해서 버리거나, 애매한데 먹는 일을 줄여줍니다.',
  alternates: { canonical: '/food/storage' },
};

export default function Page() {
  return (
    <FoodShell slug="storage">
      <StorageTool />
    </FoodShell>
  );
}
