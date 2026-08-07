import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import WatermarkTool from '@/components/image/WatermarkTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "워터마크 넣기 - 사진에 글자 워터마크 얹기",
  description: "사진에 글자 워터마크를 넣습니다. 자리·크기·투명도·색을 고를 수 있고, 사진 전체에 비스듬히 반복해 깔면 잘라내기 어렵게 만들 수 있습니다. 사진은 브라우저 안에서만 처리되고 서버로 올라가지 않습니다.",
  alternates: {
    canonical: '/image/watermark',
    languages: alternateLanguages10('/image/watermark'),
  },
});

export default function Page() {
  return (
    <ImageShell slug="watermark">
      <WatermarkTool />
    </ImageShell>
  );
}
