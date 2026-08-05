import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ColorShell from '@/components/ColorShell';
import PaletteTool from '@/components/color/PaletteTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '팔레트 생성기 - 어울리는 색 조합 만들기',
  description: '색 하나를 고르면 보색·유사색·삼각 배색처럼 색상환 규칙에 따라 어울리는 색을 뽑아줍니다. 감으로 고르는 대신 규칙으로 고르면 조합이 크게 어긋나지 않습니다.',
  alternates: {
    canonical: '/color/palette',
    languages: alternateLanguages10('/color/palette'),
  },
});

export default function Page() {
  return (
    <ColorShell slug="palette">
      <PaletteTool />
    </ColorShell>
  );
}
