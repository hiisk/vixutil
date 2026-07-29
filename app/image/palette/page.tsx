import type { Metadata } from 'next';
import ImageShell from '@/components/ImageShell';
import PaletteTool from '@/components/image/PaletteTool';

export const metadata: Metadata = {
  title: '이미지 색상 추출 - 사진에서 HEX 색상 코드 뽑기',
  description: '마음에 드는 사진의 분위기를 그대로 쓰고 싶을 때, 그 사진에서 가장 많이 쓰인 색들을 뽑아 HEX·RGB 코드로 보여줍니다. 사진 위 아무 지점이나 찍으면 그 자리의 색도 바로 알 수 있습니다.',
  alternates: {
    canonical: '/image/palette',
    languages: { 'ko': '/image/palette', 'en': '/en/image/palette', 'zh': '/zh/image/palette', 'x-default': '/en/image/palette' },
  },
};

export default function Page() {
  return (
    <ImageShell slug="palette">
      <PaletteTool />
    </ImageShell>
  );
}
