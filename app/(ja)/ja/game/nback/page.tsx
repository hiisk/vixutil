import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'nback');

export default function JaGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="ja">
      <NBackGame lang="ja" />
    </GameShellIntl>
  );
}
