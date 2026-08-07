import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'nback');

export default function DeGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="de">
      <NBackGame lang="de" />
    </GameShellIntl>
  );
}
