import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'color-blind');

export default function PtBrGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="pt-br">
      <ColorBlindGame lang="pt-br" />
    </GameShellIntl>
  );
}
