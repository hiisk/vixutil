import type { Metadata } from 'next';
import SearchPageIntl, { searchMetaIntl } from '@/components/SearchPageIntl';

/* 화면은 components/SearchPageIntl.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = searchMetaIntl('hi');

export default function HiSearchPage() {
  return <SearchPageIntl lang="hi" />;
}
