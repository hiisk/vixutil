import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import TextShell from '@/components/TextShell';
import CleanTool from '@/components/text/CleanTool';

export const metadata: Metadata = {
  title: '텍스트 정리 - 줄바꿈·중복 공백·보이지 않는 문자 제거',
  description: 'PDF나 웹에서 복사한 글에 섞여 오는 눈에 안 보이는 문자, 일반 공백처럼 생겼지만 다른 공백, 문장 중간에서 끊긴 줄바꿈을 한 번에 정리합니다. 무엇이 몇 개 지워졌는지도 함께 알려줍니다.',
  alternates: {
    canonical: '/text/clean',
    languages: alternateLanguages('/text/clean'),
  },
};

export default function Page() {
  return (
    <TextShell slug="clean">
      <CleanTool />
    </TextShell>
  );
}
