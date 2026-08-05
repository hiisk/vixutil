import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ColorShell from '@/components/ColorShell';
import ContrastTool from '@/components/color/ContrastTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '명도 대비 검사 - WCAG 기준 색 대비 계산',
  description: '배경색과 글자색의 대비비를 계산해 웹 접근성 기준(WCAG AA·AAA)을 통과하는지 알려줍니다. 실제 글자를 얹은 미리보기로 눈으로도 확인할 수 있습니다.',
  alternates: {
    canonical: '/color/contrast',
    languages: alternateLanguages10('/color/contrast'),
  },
});

export default function Page() {
  return (
    <ColorShell slug="contrast">
      <ContrastTool />
    </ColorShell>
  );
}
