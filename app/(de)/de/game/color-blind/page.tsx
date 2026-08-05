import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'color-blind');

export default function DeGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="de">
      <ColorBlindGame lang="de" />
    </GameShellIntl>
  );
}
