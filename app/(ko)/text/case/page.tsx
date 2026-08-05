import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import CaseTool from '@/components/text/CaseTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '대소문자 변환 - 영문 표기 방식 한 번에 바꾸기',
  description: '전부 대문자, 전부 소문자, 단어 첫 글자만 대문자로 바꾸고 camelCase·snake_case·kebab-case 같은 개발 표기법으로도 변환합니다. 결과는 각각 따로 복사할 수 있습니다.',
  alternates: {
    canonical: '/text/case',
    languages: alternateLanguages10('/text/case'),
  },
});

export default function Page() {
  return (
    <TextShell slug="case">
      <CaseTool />
    </TextShell>
  );
}
