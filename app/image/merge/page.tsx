import type { Metadata } from 'next';
import ImageShell from '@/components/ImageShell';
import MergeTool from '@/components/image/MergeTool';

export const metadata: Metadata = {
  title: '사진 이어붙이기 - 여러 장을 한 장으로 합치기',
  description: '대화 캡처를 한 장으로 잇거나 비포·애프터를 나란히 붙일 때 씁니다. 폭이 다른 사진도 자동으로 맞춰 정렬하고, 사진 사이 간격과 배경색을 고를 수 있습니다.',
  alternates: {
    canonical: '/image/merge',
    languages: { 'ko': '/image/merge', 'en': '/en/image/merge', 'x-default': '/en/image/merge' },
  },
};

export default function Page() {
  return (
    <ImageShell slug="merge">
      <MergeTool />
    </ImageShell>
  );
}
