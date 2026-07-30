import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'hearing');

export default function FrGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="fr">
      <HearingGame lang="fr" />
    </GameShellIntl>
  );
}
