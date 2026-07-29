import type { Metadata } from 'next';
import ColorShell from '@/components/ColorShell';
import ShadowTool from '@/components/color/ShadowTool';

export const metadata: Metadata = {
  title: '그림자 만들기 - CSS box-shadow 코드 생성',
  description: '그림자의 위치·번짐·색·투명도를 조절하면서 결과를 바로 보고 CSS 코드를 가져갑니다. 그림자를 여러 겹 쌓아 자연스러운 깊이를 만드는 프리셋도 있습니다.',
  alternates: {
    canonical: '/color/shadow',
    languages: { 'ko': '/color/shadow', 'en': '/en/color/shadow', 'zh': '/zh/color/shadow', 'x-default': '/en/color/shadow' },
  },
};

export default function Page() {
  return (
    <ColorShell slug="shadow">
      <ShadowTool />
    </ColorShell>
  );
}
