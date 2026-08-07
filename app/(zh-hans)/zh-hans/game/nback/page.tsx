import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'nback');

export default function ZhHansGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="zh-hans">
      <NBackGame lang="zh-hans" />
    </GameShellIntl>
  );
}
