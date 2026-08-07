import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'beat');

export default function PtBrGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="pt-br">
      <BeatGame lang="pt-br" />
    </GameShellIntl>
  );
}
