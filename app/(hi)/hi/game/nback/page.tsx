import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'nback');

export default function HiGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="hi">
      <NBackGame lang="hi" />
    </GameShellIntl>
  );
}
