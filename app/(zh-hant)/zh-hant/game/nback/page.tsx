import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'nback');

export default function ZhHantGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="zh-hant">
      <NBackGame lang="zh-hant" />
    </GameShellIntl>
  );
}
