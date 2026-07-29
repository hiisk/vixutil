import type { Metadata } from 'next';
import SoundShell from '@/components/SoundShell';
import PitchTool from '@/components/sound/PitchTool';

export const metadata: Metadata = {
  title: '음정 듣기 훈련 - 상대음감 연습',
  description: '두 음을 차례로 들려주고 그 사이 간격(장3도·완전5도 등)을 맞히는 연습입니다. 절대음감이 없어도 음 사이의 거리를 익히면 화음과 멜로디가 훨씬 잘 들립니다.',
  alternates: { canonical: '/sound/pitch' },
};

export default function Page() {
  return (
    <SoundShell slug="pitch">
      <PitchTool />
    </SoundShell>
  );
}
