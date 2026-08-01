import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ColorShell from '@/components/ColorShell';
import ShadesTool from '@/components/color/ShadesTool';

export const metadata: Metadata = {
  title: '명도 단계 생성 - 색 하나로 50~900 팔레트',
  description: '브랜드 색 하나를 넣으면 밝은 쪽(틴트)과 어두운 쪽(셰이드)으로 열 단계를 만들어 줍니다. Tailwind나 디자인 시스템에서 쓰는 50·100·…·900 형태 그대로 나옵니다.',
  alternates: {
    canonical: '/color/shades',
    languages: alternateLanguages10('/color/shades'),
  },
};

export default function Page() {
  return (
    <ColorShell slug="shades">
      <ShadesTool />
    </ColorShell>
  );
}
