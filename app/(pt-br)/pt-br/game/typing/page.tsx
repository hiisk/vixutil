import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'typing');

export default function PtBrGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="pt-br">
      <TypingGame lang="pt-br" />
    </GameShellIntl>
  );
}
