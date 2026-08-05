import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'color-blind');

export default function HiGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="hi">
      <ColorBlindGame lang="hi" />
    </GameShellIntl>
  );
}
