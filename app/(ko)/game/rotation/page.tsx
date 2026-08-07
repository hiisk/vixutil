import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import RotationGame from '@/components/game/RotationGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "도형 회전 테스트 - 머릿속으로 도형 돌려보기",
  description: "두 도형이 나옵니다. 하나를 돌리면 다른 하나와 같아지는지 맞히세요. \"다른\" 문제는 좌우로 뒤집은 도형으로 만들기 때문에 칸 수와 생김새가 비슷해서, 실제로 머릿속에서 돌려 봐야 알 수 있습니다.",
  alternates: {
    canonical: '/game/rotation',
    languages: alternateLanguages10('/game/rotation'),
  },
});

export default function Page() {
  return (
    <GameShell slug="rotation">
      <RotationGame />
    </GameShell>
  );
}
