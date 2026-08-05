import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'color-blind');

export default function FrGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="fr">
      <ColorBlindGame lang="fr" />
    </GameShellIntl>
  );
}
