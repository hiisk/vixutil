import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';

export const metadata: Metadata = {
  title: 'Sequence Memory Game — Test Your Short-Term Memory',
  description: 'Colour buttons light up one at a time and you have to press them back in the same order. Every correct round adds one more step, so how far you get is a short-term memory score.',
  alternates: {
    canonical: '/en/game/memory',
    languages: { 'en': '/en/game/memory', 'zh': '/zh/game/memory', 'ko': '/game/memory', 'x-default': '/en/game/memory' },
  },
};

export default function EnGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="en">
      <MemoryGame lang="en" />
    </GameShellIntl>
  );
}
