import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'color-blind');

export default function JaGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="ja">
      <ColorBlindGame lang="ja" />
    </GameShellIntl>
  );
}
