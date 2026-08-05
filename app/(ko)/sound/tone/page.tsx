import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import ToneTool from '@/components/sound/ToneTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '주파수 생성기 - 원하는 Hz 사인파 재생',
  description: '20Hz부터 20kHz까지 원하는 주파수의 소리를 만듭니다. 사인파·사각파·톱니파를 고를 수 있어 스피커 점검이나 악기 기준음, 간단한 실험에 쓸 수 있습니다.',
  alternates: {
    canonical: '/sound/tone',
    languages: alternateLanguages10('/sound/tone'),
  },
});

export default function Page() {
  return (
    <SoundShell slug="tone">
      <ToneTool />
    </SoundShell>
  );
}
