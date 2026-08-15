/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { hubMetadata } from '@/lib/cube/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';
/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/game/cube/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function buildMeta(lang: FoldLang) {
  const metadata: Metadata = hubMetadata(DATA_KEY[lang]);

  return { metadata };
}
