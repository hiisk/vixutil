import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import MathGame from '@/components/game/MathGame';

export const metadata: Metadata = {
  title: '암산 대결 - 30초 사칙연산 문제 풀기',
  description: '제한 시간 안에 사칙연산 문제를 최대한 많이 푸세요. 난이도를 고를 수 있고, 맞힌 수와 정확도, 한 문제당 평균 시간을 알려줍니다.',
  alternates: {
    canonical: '/game/math',
    languages: alternateLanguages('/game/math'),
  },
};

export default function Page() {
  return (
    <GameShell slug="math">
      <MathGame />
    </GameShell>
  );
}
