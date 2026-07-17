import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '정규식 테스터 - 정규표현식 실시간 매칭 검사',
  description: '정규표현식(Regex)과 테스트 문자열을 입력하면 매칭 결과를 실시간으로 확인합니다. 플래그(g, i, m) 설정과 캡처 그룹 출력을 지원합니다.',
  alternates: { canonical: '/calculator/dev/regex' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
