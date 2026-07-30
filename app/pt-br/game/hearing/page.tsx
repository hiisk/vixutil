import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'hearing');

export default function PtBrGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="pt-br">
      <HearingGame lang="pt-br" />
    </GameShellIntl>
  );
}
