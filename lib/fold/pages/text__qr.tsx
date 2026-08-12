import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import QrTool from '@/components/text/QrTool';
import { textMetaIntl } from '@/lib/text-tools-intl';
import type { FoldLang } from '../lang';

/* 아홉 언어 라우트를 이 모듈 하나가 맡는다 — 옆의 text__*.tsx와 같은 꼴이다.
   목록은 lib/fold/registry.ts (거기서 빠지면 아홉 언어가 조용히 404가 된다) */
export function build(lang: FoldLang) {
  const metadata: Metadata = textMetaIntl(lang, 'qr');

  function Page() {
    return (
      <TextShellIntl slug="qr" lang={lang}>
        <QrTool lang={lang} />
      </TextShellIntl>
    );
  }

  return { metadata, Page };
}
