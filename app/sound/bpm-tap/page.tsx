import type { Metadata } from 'next';
import { alternateLanguages } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import BpmTapTool from '@/components/sound/BpmTapTool';

export const metadata: Metadata = {
  title: 'BPM 측정 - 탭으로 노래 템포 재기',
  description: '음악에 맞춰 아무 키나 두드리면 분당 박자 수(BPM)를 계산합니다. 여덟 번 정도 두드리면 값이 안정되고, 최근 박자만 반영하므로 도중에 템포가 바뀌어도 따라갑니다.',
  alternates: {
    canonical: '/sound/bpm-tap',
    languages: alternateLanguages('/sound/bpm-tap'),
  },
};

export default function Page() {
  return (
    <SoundShell slug="bpm-tap">
      <BpmTapTool />
    </SoundShell>
  );
}
