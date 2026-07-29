import type { Metadata } from 'next';
import ImageShell from '@/components/ImageShell';
import ResizeTool from '@/components/image/ResizeTool';

export const metadata: Metadata = {
  title: '이미지 크기 조절 - 사진 가로세로 픽셀 변경',
  description: '가로·세로를 직접 입력하거나 비율(%)로 줄일 수 있고, 비율 고정을 켜두면 사진이 찌그러지지 않습니다. 인스타그램·유튜브 썸네일·프로필 사진 같은 자주 쓰는 크기는 버튼 하나로 맞춰집니다.',
  alternates: { canonical: '/image/resize' },
};

export default function Page() {
  return (
    <ImageShell slug="resize">
      <ResizeTool />
    </ImageShell>
  );
}
