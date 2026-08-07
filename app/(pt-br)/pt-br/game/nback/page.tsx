import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'nback');

export default function PtBrGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="pt-br">
      <NBackGame lang="pt-br" />
    </GameShellIntl>
  );
}
