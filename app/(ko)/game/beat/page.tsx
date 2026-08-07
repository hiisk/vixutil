import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import BeatGame from '@/components/game/BeatGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "박자 감각 테스트 - 메트로놈이 멈춘 뒤에도 맞출 수 있는가",
  description: "네 박 동안 소리가 나고, 그 뒤에는 소리 없이 같은 박자로 여덟 번 눌러야 합니다. 평균 오차뿐 아니라 얼마나 고른지도 함께 봅니다 — 늘 조금씩 늦는 것보다 들쭉날쭉한 쪽이 박자 감각으로는 더 나쁘기 때문입니다.",
  alternates: {
    canonical: '/game/beat',
    languages: alternateLanguages10('/game/beat'),
  },
});

export default function Page() {
  return (
    <GameShell slug="beat">
      <BeatGame />
    </GameShell>
  );
}
