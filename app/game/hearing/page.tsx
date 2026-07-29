import type { Metadata } from 'next';
import GameShell from '@/components/GameShell';
import HearingGame from '@/components/game/HearingGame';

export const metadata: Metadata = {
  title: '가청 주파수 테스트 - 몇 Hz까지 들리는지 측정',
  description: '주파수를 조금씩 올려가며 어디까지 들리는지 확인합니다. 사람의 가청 상한은 나이가 들수록 낮아져서, 들리는 주파수로 대략적인 귀 나이를 가늠해 볼 수 있습니다.',
  alternates: {
    canonical: '/game/hearing',
    languages: { 'ko': '/game/hearing', 'en': '/en/game/hearing', 'zh': '/zh/game/hearing', 'x-default': '/en/game/hearing' },
  },
};

export default function Page() {
  return (
    <GameShell slug="hearing">
      <HearingGame />
    </GameShell>
  );
}
