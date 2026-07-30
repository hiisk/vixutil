import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import EmoticonTool from '@/components/text/EmoticonTool';

export const metadata: Metadata = {
  title: '이모티콘 모음 - 카오모지·문자 이모티콘 복사',
  description: 'ㅇㅅㅇ, (╯°□°）╯, ¯\\_(ツ)_/¯ 처럼 문자로만 만든 이모티콘을 감정별로 모았습니다. 이미지가 아니라 글자라서 어디에 붙여 넣어도 깨지지 않고, 닉네임이나 상태 메시지에도 쓸 수 있습니다.',
  alternates: {
    canonical: '/text/emoticon',
    languages: { 'ko': '/text/emoticon', 'en': '/en/text/emoticon', 'x-default': '/en/text/emoticon' },
  },
};

export default function Page() {
  return (
    <TextShell slug="emoticon">
      <EmoticonTool />
    </TextShell>
  );
}
