import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';

export const metadata: Metadata = {
  title: 'Pattern Memory Game — Test Visual and Spatial Memory',
  description: 'A few squares in a grid flash on and off. Remember where they were and press them. Higher levels light more squares, and the grid itself gets bigger.',
  alternates: {
    canonical: '/en/game/sequence',
    languages: { 'en': '/en/game/sequence', 'zh': '/zh/game/sequence', 'ko': '/game/sequence', 'x-default': '/en/game/sequence' },
  },
};

export default function EnGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="en">
      <SequenceGame lang="en" />
    </GameShellIntl>
  );
}
