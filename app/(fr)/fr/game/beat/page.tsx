import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'beat');

export default function FrGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="fr">
      <BeatGame lang="fr" />
    </GameShellIntl>
  );
}
