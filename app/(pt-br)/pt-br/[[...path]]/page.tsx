import type { Metadata } from 'next';
import { foldMetadata, foldPage } from '@/lib/fold/resolve';
import { STATIC_ROUTE_KEYS } from '@/lib/fold/registry';

/*
 * 아홉 언어 × 335개 라우트 파일(3,015개)을 언어당 이 파일 하나로 접었다.
 * 컴파일 입력이 3,504 → 498 라우트로 줄어 Vercel 무료 빌드(2코어·45분)가
 * 통과한다 — 접기 전에는 컴파일만으로 45분을 다 먹고 다섯 번 잘렸다.
 * 주소·사이트맵·<html lang>은 그대로다. 목록은 lib/fold/registry.ts.
 *
 * 여기는 **허브만** 받아 빌드에서 굽는다. 낱장([slug])은 각자 실제 라우트로
 * 남아 요청 때 그린다 — 구운 라우트 안에서는 요청 때 그리기로 못 빠져나간다
 * (connection()이 DYNAMIC_SERVER_USAGE로 죽는다). 그래서 둘을 갈랐다.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return STATIC_ROUTE_KEYS.map(k => ({ path: k.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ path?: string[] }> }): Promise<Metadata> {
  const { path } = await params;
  return foldMetadata('pt-br', path);
}

export default async function Page({ params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params;
  return foldPage('pt-br', path);
}
