import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';

export const metadata: Metadata = {
  title: 'Mental Maths Challenge — 30 Seconds of Arithmetic',
  description: 'Solve as many arithmetic problems as you can before the clock runs out. Pick the operations and difficulty, and it reports how many you got, your accuracy and the average time per problem.',
  alternates: {
    canonical: '/en/game/math',
    languages: { 'en': '/en/game/math', 'ko': '/game/math', 'x-default': '/en/game/math' },
  },
};

export default function EnGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="en">
      <MathGame lang="en" />
    </GameShellIntl>
  );
}
