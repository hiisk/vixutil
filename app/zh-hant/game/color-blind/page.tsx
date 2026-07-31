import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'color-blind');

export default function ZhHantGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="zh-hant">
      <ColorBlindGame lang="zh-hant" />
    </GameShellIntl>
  );
}
