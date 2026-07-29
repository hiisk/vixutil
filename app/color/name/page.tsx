import type { Metadata } from 'next';
import ColorShell from '@/components/ColorShell';
import NameTool from '@/components/color/NameTool';

export const metadata: Metadata = {
  title: '색 이름 찾기 - HEX와 가장 가까운 색 이름',
  description: '색 코드를 넣으면 가장 가까운 이름 있는 색(빨강·산호·청록 등)을 찾아 주고, HEX·RGB·HSL·CMYK 값을 한 번에 보여줍니다. 색을 말로 설명해야 할 때 씁니다.',
  alternates: { canonical: '/color/name' },
};

export default function Page() {
  return (
    <ColorShell slug="name">
      <NameTool />
    </ColorShell>
  );
}
