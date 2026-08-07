import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import SlugTool from '@/components/text/SlugTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: "슬러그 만들기 - 제목을 주소용 영문으로",
  description: "글 제목을 주소에 쓸 수 있는 형태로 바꿉니다. 한글은 로마자로 옮기고, 공백과 기호는 하이픈으로 바꾸며, 이어진 하이픈과 앞뒤 하이픈을 정리합니다. 길이를 자를 때는 낱말 중간에서 끊지 않습니다.",
  alternates: {
    canonical: '/text/slug',
    languages: alternateLanguages10('/text/slug'),
  },
});

export default function Page() {
  return (
    <TextShell slug="slug">
      <SlugTool />
    </TextShell>
  );
}
