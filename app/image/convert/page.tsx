import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import ConvertTool from '@/components/image/ConvertTool';

export const metadata: Metadata = {
  title: '이미지 포맷 변환 - JPG PNG WebP 서로 바꾸기',
  description: 'WebP만 받아주지 않는 곳에 올릴 때, 반대로 용량을 줄이려고 WebP로 바꿀 때 쓰세요. 투명 배경이 있는 PNG를 JPG로 바꾸면 배경이 채워지므로 배경색도 함께 고를 수 있습니다.',
  alternates: {
    canonical: '/image/convert',
    languages: alternateLanguages('/image/convert'),
  },
};

export default function Page() {
  return (
    <ImageShell slug="convert">
      <ConvertTool />
    </ImageShell>
  );
}
