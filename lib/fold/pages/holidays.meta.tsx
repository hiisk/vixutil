/* 메타 전용. 뷰(<Page/>)는 holidays.tsx에 있고 components/FoldView.tsx가
   클라이언트에서 따로 부른다 — 까닭은 lib/fold/registry-meta.ts. */
import type { Metadata } from 'next';
import { hubMetadata } from '@/lib/holidays/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

export function buildMeta(lang: FoldLang) {
  const metadata: Metadata = hubMetadata(DATA_KEY[lang]);
  return { metadata };
}
