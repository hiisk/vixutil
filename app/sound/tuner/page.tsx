import type { Metadata } from 'next';
import SoundShell from '@/components/SoundShell';
import TunerTool from '@/components/sound/TunerTool';

export const metadata: Metadata = {
  title: '악기 튜너 - 기타·우쿨렐레 온라인 조율',
  description: '악기 소리를 들려주면 어떤 음인지, 기준음보다 얼마나 높거나 낮은지 센트 단위로 알려줍니다. 기타·우쿨렐레·베이스의 개방현 기준음도 들어 볼 수 있습니다.',
  alternates: { canonical: '/sound/tuner' },
};

export default function Page() {
  return (
    <SoundShell slug="tuner">
      <TunerTool />
    </SoundShell>
  );
}
