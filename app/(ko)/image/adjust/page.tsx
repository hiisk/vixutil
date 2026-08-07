import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import AdjustTool from '@/components/image/AdjustTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "사진 보정 - 밝기·대비·채도·흑백·세피아",
  description: "밝기·대비·채도를 조절하고 흑백이나 세피아로 바꿉니다. 미리 맞춰 둔 여섯 가지를 눌러 바로 적용하거나, 슬라이더로 직접 맞출 수 있습니다. 원본은 그대로 두고 결과만 새로 저장합니다.",
  alternates: {
    canonical: '/image/adjust',
    languages: alternateLanguages10('/image/adjust'),
  },
});

export default function Page() {
  return (
    <ImageShell slug="adjust">
      <AdjustTool />
    </ImageShell>
  );
}
