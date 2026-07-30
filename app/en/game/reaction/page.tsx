import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';

export const metadata: Metadata = {
  title: 'Reaction Time Test — Measure Your Reaction in Milliseconds',
  description: 'Click the moment the screen turns green. It takes five readings, gives you the average and your best in milliseconds, and shows where you land against typical human reaction time.',
  alternates: {
    canonical: '/en/game/reaction',
    languages: { 'en': '/en/game/reaction', 'ko': '/game/reaction', 'x-default': '/en/game/reaction' },
  },
};

export default function EnGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="en">
      <ReactionGame lang="en" />
    </GameShellIntl>
  );
}
