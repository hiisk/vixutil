import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import StroopGame from '@/components/game/StroopGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "스트룹 테스트 - 글자 뜻과 색이 다를 때 얼마나 빠른가",
  description: "\"빨강\"이라고 적힌 글자가 파란색으로 칠해져 있습니다. 글자의 뜻이 아니라 칠해진 색을 골라야 하는데, 읽는 것이 자동으로 일어나기 때문에 그것을 억눌러야 합니다. 45초 동안 몇 개를 맞히는지 잽니다.",
  alternates: {
    canonical: '/game/stroop',
    languages: alternateLanguages10('/game/stroop'),
  },
});

export default function Page() {
  return (
    <GameShell slug="stroop">
      <StroopGame />
    </GameShell>
  );
}
