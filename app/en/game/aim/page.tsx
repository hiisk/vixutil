import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';

export const metadata: Metadata = {
  title: 'Aim Trainer — Mouse Accuracy and Aim Practice',
  description: 'Hit as many targets as you can before time runs out, each appearing in a random spot. It counts your misses too and works out accuracy, so it works as mouse practice rather than just a score.',
  alternates: {
    canonical: '/en/game/aim',
    languages: { 'en': '/en/game/aim', 'ko': '/game/aim', 'x-default': '/en/game/aim' },
  },
};

export default function EnGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="en">
      <AimGame lang="en" />
    </GameShellIntl>
  );
}
