import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '학점 GPA 계산기 - 4.5제·4.3제 평점 계산',
  description: '과목별 학점과 성적을 입력하면 4.5제, 4.3제, Pass/Fail 기준으로 GPA와 총 취득학점을 계산합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
