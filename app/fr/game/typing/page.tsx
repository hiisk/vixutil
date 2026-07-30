import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'typing');

export default function FrGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="fr">
      <TypingGame lang="fr" />
    </GameShellIntl>
  );
}
