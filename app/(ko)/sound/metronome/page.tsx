import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import MetronomeTool from '@/components/sound/MetronomeTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '메트로놈 - 온라인 박자기 (BPM 조절)',
  description: 'BPM을 정하면 정확한 간격으로 박자를 내줍니다. 4분의 4박자처럼 박자표를 고르면 첫 박에 강세가 들어가 지금이 몇 박째인지 귀로 알 수 있습니다.',
  alternates: {
    canonical: '/sound/metronome',
    languages: alternateLanguages10('/sound/metronome'),
  },
});

export default function Page() {
  return (
    <SoundShell slug="metronome">
      <MetronomeTool />
    </SoundShell>
  );
}
