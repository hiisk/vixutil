import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import FrameTool from '@/components/image/FrameTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "테두리 넣기 - 인스타 정사각·세로 비율 맞추기",
  description: "사진 둘레에 여백을 둘러 정사각형이나 4:5 같은 비율에 맞춥니다. 세로로 긴 사진을 인스타그램에 올릴 때 잘리지 않게 하는 데 씁니다. 사진을 늘리지 않고 여백만 더하므로 화질이 나빠지지 않습니다.",
  alternates: {
    canonical: '/image/frame',
    languages: alternateLanguages10('/image/frame'),
  },
});

export default function Page() {
  return (
    <ImageShell slug="frame">
      <FrameTool />
    </ImageShell>
  );
}
