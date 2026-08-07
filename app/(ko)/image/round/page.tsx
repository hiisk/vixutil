import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ImageShell from '@/components/ImageShell';
import RoundTool from '@/components/image/RoundTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "모서리 둥글게 - 프로필 사진 원형으로 자르기",
  description: "사진 모서리를 둥글립니다. 100%로 두면 완전한 원이 되어 프로필 사진에 바로 쓸 수 있습니다. 둥글린 바깥은 투명해야 하므로 결과는 항상 PNG로 저장됩니다.",
  alternates: {
    canonical: '/image/round',
    languages: alternateLanguages10('/image/round'),
  },
});

export default function Page() {
  return (
    <ImageShell slug="round">
      <RoundTool />
    </ImageShell>
  );
}
