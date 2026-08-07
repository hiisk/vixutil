import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import SplitTool from '@/components/image/SplitTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "사진 분할 - 인스타 그리드용 격자 자르기",
  description: "사진을 격자로 잘라 여러 장으로 나눕니다. 인스타그램 프로필에 큰 그림을 걸 때 씁니다. 나누어떨어지지 않을 때 남는 픽셀을 앞쪽 조각에 한 픽셀씩 나눠 주므로, 도로 붙였을 때 원본과 크기가 같습니다.",
  alternates: {
    canonical: '/image/split',
    languages: alternateLanguages10('/image/split'),
  },
});

export default function Page() {
  return (
    <ImageShell slug="split">
      <SplitTool />
    </ImageShell>
  );
}
