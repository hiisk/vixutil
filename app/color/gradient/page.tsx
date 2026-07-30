import type { Metadata } from 'next';
import ColorShell from '@/components/ColorShell';
import GradientTool from '@/components/color/GradientTool';

export const metadata: Metadata = {
  title: '그라디언트 만들기 - CSS linear-gradient 코드 생성',
  description: '색과 각도를 정하면 CSS linear-gradient 코드를 만들어 줍니다. 색 위치를 조절해 어디서 색이 바뀔지 정할 수 있고, 결과는 그대로 붙여 넣어 쓸 수 있습니다.',
  alternates: {
    canonical: '/color/gradient',
    languages: { 'ko': '/color/gradient', 'en': '/en/color/gradient', 'x-default': '/en/color/gradient' },
  },
};

export default function Page() {
  return (
    <ColorShell slug="gradient">
      <GradientTool />
    </ColorShell>
  );
}
