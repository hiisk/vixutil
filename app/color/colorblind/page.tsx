import type { Metadata } from 'next';
import ColorShell from '@/components/ColorShell';
import ColorblindTool from '@/components/color/ColorblindTool';

export const metadata: Metadata = {
  title: '색맹 시뮬레이터 - 색약자에게 보이는 색 미리보기',
  description: '고른 색이 적색맹·녹색맹·청색맹·전색맹인 사람에게 어떻게 보이는지 변환해 보여줍니다. 빨강과 초록만으로 상태를 구분하는 화면이 왜 문제인지 바로 확인할 수 있습니다.',
  alternates: {
    canonical: '/color/colorblind',
    languages: { 'ko': '/color/colorblind', 'en': '/en/color/colorblind', 'x-default': '/en/color/colorblind' },
  },
};

export default function Page() {
  return (
    <ColorShell slug="colorblind">
      <ColorblindTool />
    </ColorShell>
  );
}
