import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import Game2048 from '@/components/game/Game2048';
import { gameMetaIntl } from '@/lib/game-tools-intl';
import type { FoldLang } from '../lang';

/* 아홉 언어 라우트 파일 대신 이 모듈 하나가 /xx/game/2048을 그린다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = gameMetaIntl(lang, '2048');

  function Page() {
    return (
      <GameShellIntl slug="2048" lang={lang}>
        <Game2048 lang={lang} />
      </GameShellIntl>
    );
  }

  return { metadata, Page };
}
