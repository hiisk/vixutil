import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import TypingGame from '@/components/game/TypingGame';

export const metadata: Metadata = {
  title: '타자 연습 - 한글 타수(타/분)와 정확도 측정',
  description: '주어진 문장을 그대로 쳐서 분당 타수와 정확도를 잽니다. 틀린 글자는 즉시 표시되고, 문장은 매번 바뀌므로 외워서 치는 일이 없습니다.',
  alternates: {
    canonical: '/game/typing',
    languages: alternateLanguages('/game/typing'),
  },
};

export default function Page() {
  return (
    <GameShell slug="typing">
      <TypingGame />
    </GameShell>
  );
}
