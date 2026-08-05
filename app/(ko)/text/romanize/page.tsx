import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import RomanizeTool from '@/components/text/RomanizeTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '영문 이름 변환 - 여권 로마자 표기 만들기',
  description: '국어의 로마자 표기법대로 옮긴 표기와, 여권에서 실제로 많이 쓰는 관용 표기(이 Lee, 박 Park, 최 Choi)를 함께 보여줍니다. 이름을 붙여 쓴 형태와 붙임표를 넣은 형태 모두 확인할 수 있습니다.',
  alternates: { canonical: '/text/romanize' },
});

export default function Page() {
  return (
    <TextShell slug="romanize">
      <RomanizeTool />
    </TextShell>
  );
}
