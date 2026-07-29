import type { Metadata } from 'next';
import ColorShell from '@/components/ColorShell';
import TemperatureTool from '@/components/color/TemperatureTool';

export const metadata: Metadata = {
  title: '색온도 변환 - 켈빈(K)을 RGB 색으로',
  description: '2700K 전구색이 실제로 어떤 색인지, 6500K 주광색이 얼마나 푸른지 눈으로 확인합니다. 조명을 고르거나 사진 화이트밸런스를 이해할 때 도움이 됩니다.',
  alternates: { canonical: '/color/temperature' },
};

export default function Page() {
  return (
    <ColorShell slug="temperature">
      <TemperatureTool />
    </ColorShell>
  );
}
