import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import DedupeTool from '@/components/text/DedupeTool';

export const metadata: Metadata = {
  title: '중복 줄 제거·정렬 - 목록 정리, 가나다순',
  description: '명단이나 목록을 붙여 넣으면 겹치는 줄을 지우고 가나다순으로 정렬합니다. 앞뒤 공백만 다른 줄, 대소문자만 다른 줄도 같은 줄로 볼지 고를 수 있어 실제 명단 정리에 바로 쓸 수 있습니다.',
  alternates: {
    canonical: '/text/dedupe',
    languages: alternateLanguages('/text/dedupe'),
  },
};

export default function Page() {
  return (
    <TextShell slug="dedupe">
      <DedupeTool />
    </TextShell>
  );
}
