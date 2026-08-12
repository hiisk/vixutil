import type { Metadata } from 'next';

import LegalPage from '@/components/LegalPage';
import { legalMetadata } from '@/lib/legal';

/* 문구는 lib/legal/terms.ts, 화면은 components/LegalPage.tsx — 40장이 함께 쓴다.
   이 파일이 갖는 것은 갈래와 언어뿐이다. */
export const metadata: Metadata = legalMetadata('terms', 'zh-hans');

export default function Page() {
  return <LegalPage kind="terms" locale="zh-hans" />;
}
