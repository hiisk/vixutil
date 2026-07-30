import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import ReplaceTool from '@/components/text/ReplaceTool';

export const metadata: Metadata = {
  title: '찾아 바꾸기 - 텍스트 일괄 치환',
  description: '이름이나 용어가 통째로 바뀌었을 때 긴 글에서 하나씩 고치지 않아도 됩니다. 대소문자 구분과 정규식을 켤 수 있고, 바꾸기 전에 몇 군데가 바뀌는지 미리 세어 알려줍니다.',
  alternates: {
    canonical: '/text/replace',
    languages: { 'ko': '/text/replace', 'en': '/en/text/replace', 'x-default': '/en/text/replace' },
  },
};

export default function Page() {
  return (
    <TextShell slug="replace">
      <ReplaceTool />
    </TextShell>
  );
}
