import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ColorShell from '@/components/ColorShell';
import RandomTool from '@/components/color/RandomTool';

export const metadata: Metadata = {
  title: '랜덤 색 뽑기 - 색 조합 무작위 생성',
  description: '색 다섯 개를 무작위로 뽑습니다. 마음에 드는 색은 자물쇠로 잠그고 나머지만 다시 뽑을 수 있어서, 원하는 조합이 나올 때까지 빠르게 돌려볼 수 있습니다.',
  alternates: {
    canonical: '/color/random',
    languages: alternateLanguages10('/color/random'),
  },
};

export default function Page() {
  return (
    <ColorShell slug="random">
      <RandomTool />
    </ColorShell>
  );
}
