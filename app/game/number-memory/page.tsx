import type { Metadata } from 'next';
import GameShell from '@/components/GameShell';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';

export const metadata: Metadata = {
  title: '숫자 암기 테스트 - 몇 자리까지 외울 수 있나',
  description: '숫자가 잠깐 보였다가 사라지면 그대로 입력하세요. 맞히면 한 자리가 늘어납니다. 사람이 한 번에 외우는 숫자는 보통 일곱 자리 안팎이라 그 근처에서 갈립니다.',
  alternates: {
    canonical: '/game/number-memory',
    languages: { 'ko': '/game/number-memory', 'en': '/en/game/number-memory', 'x-default': '/en/game/number-memory' },
  },
};

export default function Page() {
  return (
    <GameShell slug="number-memory">
      <NumberMemoryGame />
    </GameShell>
  );
}
