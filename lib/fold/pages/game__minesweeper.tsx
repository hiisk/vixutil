import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MinesweeperGame from '@/components/game/MinesweeperGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';
import type { FoldLang } from '../lang';

/* 아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = gameMetaIntl(lang, 'minesweeper');

  function Page() {
    return (
      <GameShellIntl slug="minesweeper" lang={lang}>
        <MinesweeperGame lang={lang} />
      </GameShellIntl>
    );
  }

  return { metadata, Page };
}
