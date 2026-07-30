import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import ManuscriptTool from '@/components/text/ManuscriptTool';

export const metadata: Metadata = {
  title: '원고지·자소서 글자수 - 매수와 남은 분량 계산',
  description: '글을 붙여 넣으면 200자 원고지 몇 장인지, 공백을 포함·제외했을 때 각각 몇 자인지 알려줍니다. 자기소개서는 대개 공백 포함으로 세므로 어느 기준으로 몇 자가 남았는지를 함께 보여줍니다.',
  alternates: {
    canonical: '/text/manuscript',
    languages: { 'ko': '/text/manuscript', 'en': '/en/text/manuscript', 'x-default': '/en/text/manuscript' },
  },
};

export default function Page() {
  return (
    <TextShell slug="manuscript">
      <ManuscriptTool />
    </TextShell>
  );
}
