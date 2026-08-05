import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'color-blind');

export default function EnGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="en">
      <ColorBlindGame lang="en" />
    </GameShellIntl>
  );
}
