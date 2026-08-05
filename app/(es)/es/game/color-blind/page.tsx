import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'color-blind');

export default function EsGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="es">
      <ColorBlindGame lang="es" />
    </GameShellIntl>
  );
}
