import type { Metadata } from 'next';
import MetroHub from '@/components/MetroHub';
import { metroAlternates } from '@/lib/metro/ui';

export const metadata: Metadata = {
  title: '지하철 노선 역 이름 맞추기 — 서울·도쿄·런던·뉴욕',
  description: '서울 1~9호선, 도쿄 야마노테선, 런던 Victoria line, 뉴욕 7 train 등 노선을 골라 역 이름을 맞추는 게임. 노선도가 다음 역 쪽으로 움직이며 힌트를 줍니다.',
  alternates: { canonical: '/metro', languages: metroAlternates() },
};

export default function MetroHubPageKO() {
  return <MetroHub lang="ko" />;
}
