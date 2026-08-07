import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'nback');

export default function EnGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="en">
      <NBackGame lang="en" />
    </GameShellIntl>
  );
}
