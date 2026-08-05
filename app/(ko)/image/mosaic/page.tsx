import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import MosaicTool from '@/components/image/MosaicTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '모자이크 가리기 - 사진 속 얼굴·개인정보 지우기',
  description: '중고거래 인증샷의 주소, 단체 사진 속 남의 얼굴처럼 가려야 할 부분을 손가락이나 마우스로 문지르면 그 자리만 모자이크됩니다. 사진이 서버로 가지 않으니 개인정보가 담긴 화면도 안심하고 처리할 수 있습니다.',
  alternates: {
    canonical: '/image/mosaic',
    languages: alternateLanguages10('/image/mosaic'),
  },
});

export default function Page() {
  return (
    <ImageShell slug="mosaic">
      <MosaicTool />
    </ImageShell>
  );
}
