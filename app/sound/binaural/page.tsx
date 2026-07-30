import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import BinauralTool from '@/components/sound/BinauralTool';

export const metadata: Metadata = {
  title: '바이노럴 비트 - 좌우 주파수 차이로 만드는 맥놀이',
  description: '왼쪽과 오른쪽 귀에 조금 다른 주파수를 들려주면 그 차이만큼의 느린 맥놀이가 느껴집니다. 반드시 이어폰이 필요하고, 효과에 대한 과학적 근거는 아직 분명하지 않습니다.',
  alternates: {
    canonical: '/sound/binaural',
    languages: alternateLanguages('/sound/binaural'),
  },
};

export default function Page() {
  return (
    <SoundShell slug="binaural">
      <BinauralTool />
    </SoundShell>
  );
}
