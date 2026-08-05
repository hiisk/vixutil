import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import ColorShell from '@/components/ColorShell';
import MixerTool from '@/components/color/MixerTool';

export const metadata: Metadata = {
  title: '색 섞기 - 두 색 사이 중간색 만들기',
  description: '두 색을 정하고 비율을 움직이면 그 사이의 색이 만들어집니다. 그라디언트에서 특정 지점의 색을 뽑거나, 브랜드 색 두 개를 섞은 중간 톤을 찾을 때 씁니다.',
  alternates: {
    canonical: '/color/mixer',
    languages: alternateLanguages10('/color/mixer'),
  },
};

export default function Page() {
  return (
    <ColorShell slug="mixer">
      <MixerTool />
    </ColorShell>
  );
}
