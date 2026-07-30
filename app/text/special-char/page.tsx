import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import SpecialCharTool from '@/components/text/SpecialCharTool';

export const metadata: Metadata = {
  title: '특수문자 모음 - 화살표·도형·기호 복사하기',
  description: '화살표(→ ⇒), 도형(★ ◆ ▶), 문장부호(※ 「」), 수학·단위(㎡ ℃ ±), 화폐(₩ €), 원문자(① ㉠)를 눌러서 바로 복사합니다. 자판으로 칠 수 없는 기호를 찾아 헤매지 않아도 됩니다.',
  alternates: {
    canonical: '/text/special-char',
    languages: { 'ko': '/text/special-char', 'en': '/en/text/special-char', 'x-default': '/en/text/special-char' },
  },
};

export default function Page() {
  return (
    <TextShell slug="special-char">
      <SpecialCharTool />
    </TextShell>
  );
}
