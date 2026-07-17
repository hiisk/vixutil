import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '글자수·단어수 카운터 - 공백 제외 글자수·바이트 수 실시간 계산',
  description: '텍스트를 입력하면 전체 글자수, 공백 제외 글자수, 단어수, 문장수, 줄수, UTF-8 바이트 수를 실시간으로 카운트합니다.',
  alternates: { canonical: '/calculator/dev/word-count' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
