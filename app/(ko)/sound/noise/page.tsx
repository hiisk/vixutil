import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import NoiseTool from '@/components/sound/NoiseTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '백색소음 - 화이트·핑크·브라운 노이즈 재생',
  description: '화이트·핑크·브라운 세 가지 잡음을 만들어 재생합니다. 주변 소리를 덮어 집중이나 수면을 돕는데, 낮은 대역이 강한 브라운 노이즈가 파도 소리에 가깝고 귀에 덜 피곤합니다.',
  alternates: {
    canonical: '/sound/noise',
    languages: alternateLanguages10('/sound/noise'),
  },
});

export default function Page() {
  return (
    <SoundShell slug="noise">
      <NoiseTool />
    </SoundShell>
  );
}
