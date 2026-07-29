import type { Metadata } from 'next';
import ConvertHub from '@/components/ConvertHub';
import { convertAlternates } from '@/lib/convert-ui-intl';

export const metadata: Metadata = {
  title: '단위 변환 — 평·근·돈부터 인치·파운드까지 50종',
  description:
    '평↔㎡, 근↔g, 돈↔g, cm↔인치, kg↔파운드, 섭씨↔화씨, Mbps↔MB/s 등 50가지 단위 변환을 한 곳에서. 자주 찾는 값 표와 계산식까지 함께 봅니다.',
  alternates: { canonical: '/convert', languages: convertAlternates() },
};

export default function ConvertHubPage() {
  return <ConvertHub lang="ko" />;
}
