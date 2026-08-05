import RootShell from '@/components/RootShell';
import { siteMetadata, siteViewport } from '@/lib/site-metadata';

/** ja 화면의 루트 레이아웃 — <html lang="ja">를 여기서 정한다 */
export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ja">{children}</RootShell>;
}
