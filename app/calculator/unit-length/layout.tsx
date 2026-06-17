import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '길이 단위 변환기 - mm·cm·m·km·인치·피트·야드·마일 변환',
  description: 'mm, cm, m, km, 인치, 피트, 야드, 마일, 해리 등 모든 길이 단위를 한 번에 변환합니다.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
