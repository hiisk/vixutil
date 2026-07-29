import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';

export const metadata: Metadata = {
  title: 'Number Memory Test — How Many Digits Can You Hold',
  description: 'A number appears briefly, disappears, and you type it back. Get it right and it gains a digit. Most people hold around seven digits at once, so that is where it usually starts to break down.',
  alternates: {
    canonical: '/en/game/number-memory',
    languages: { 'en': '/en/game/number-memory', 'zh': '/zh/game/number-memory', 'ko': '/game/number-memory', 'x-default': '/en/game/number-memory' },
  },
};

export default function EnGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="en">
      <NumberMemoryGame lang="en" />
    </GameShellIntl>
  );
}
