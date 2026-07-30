import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import RecorderTool from '@/components/sound/RecorderTool';

export const metadata: Metadata = {
  title: '음성 녹음기 - 브라우저에서 바로 녹음·저장',
  description: '설치 없이 녹음해서 바로 들어 보고 파일로 내려받습니다. 녹음은 브라우저 안에서만 처리되며 서버로 전송되지 않으니, 회의 메모나 발음 연습에 안심하고 쓸 수 있습니다.',
  alternates: {
    canonical: '/sound/recorder',
    languages: alternateLanguages('/sound/recorder'),
  },
};

export default function Page() {
  return (
    <SoundShell slug="recorder">
      <RecorderTool />
    </SoundShell>
  );
}
