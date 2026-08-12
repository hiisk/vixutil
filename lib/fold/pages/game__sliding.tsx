import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SlidingGame from '@/components/game/SlidingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';
import type { FoldLang } from '../lang';

/* 접힌 라우트 — 아홉 언어가 이 모듈 하나를 나눠 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = gameMetaIntl(lang, 'sliding');

  function Page() {
    return (
      <GameShellIntl slug="sliding" lang={lang}>
        <SlidingGame lang={lang} />
      </GameShellIntl>
    );
  }

  return { metadata, Page };
}
