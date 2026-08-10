import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/game/color-blind/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const metadata: Metadata = gameMetaIntl(lang, 'color-blind');

  function Page() {
    return (
      <GameShellIntl slug="color-blind" lang={lang}>
        <ColorBlindGame lang={lang} />
      </GameShellIntl>
    );
  }

  return { metadata, Page };
}
