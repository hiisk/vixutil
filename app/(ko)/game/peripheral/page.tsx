import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import PeripheralGame from '@/components/game/PeripheralGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "주변시야 테스트 - 정면을 보면서 얼마나 넓게 보는가",
  description: "가운데 점을 계속 보면서 가장자리에 나타나는 표적을 눌러야 합니다. 표적은 가운데를 비운 고리 안에만 나타나고, 단계가 오를수록 더 바깥으로 갑니다. 시간 안에 못 누르면 끝나기 때문에 눈을 돌려 찾을 틈이 없습니다.",
  alternates: {
    canonical: '/game/peripheral',
    languages: alternateLanguages10('/game/peripheral'),
  },
});

export default function Page() {
  return (
    <GameShell slug="peripheral">
      <PeripheralGame />
    </GameShell>
  );
}
