import type { Metadata } from 'next';
import TextShell from '@/components/TextShell';
import HanyoungTool from '@/components/text/HanyoungTool';

export const metadata: Metadata = {
  title: '한영타 변환기 - dkssud를 안녕으로 되돌리기',
  description: '한/영 키를 안 누르고 친 "dkssudgktpdy"를 "안녕하세요"로, 반대로 "ㅇㅍ햐"를 "avoid"로 되돌립니다. 방향은 입력한 글자를 보고 알아서 잡아주며, 두벌식 자판 기준으로 변환합니다.',
  alternates: { canonical: '/text/hanyoung' },
};

export default function Page() {
  return (
    <TextShell slug="hanyoung">
      <HanyoungTool />
    </TextShell>
  );
}
