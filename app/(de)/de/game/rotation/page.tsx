import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'rotation');

export default function DeGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="de">
      <RotationGame lang="de" />
    </GameShellIntl>
  );
}
