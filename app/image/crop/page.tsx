import type { Metadata } from 'next';
import ImageShell from '@/components/ImageShell';
import CropTool from '@/components/image/CropTool';

export const metadata: Metadata = {
  title: '이미지 자르기 - 사진 원하는 부분만 잘라내기',
  description: '사진 위에서 영역을 끌어 원하는 부분만 남깁니다. 1:1·16:9·프로필 같은 비율로 고정하면 규격에 맞춰 잘리고, 자유 비율로 두면 원하는 대로 잡을 수 있습니다.',
  alternates: { canonical: '/image/crop' },
};

export default function Page() {
  return (
    <ImageShell slug="crop">
      <CropTool />
    </ImageShell>
  );
}
