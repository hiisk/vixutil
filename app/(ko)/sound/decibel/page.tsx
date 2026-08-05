import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import DecibelTool from '@/components/sound/DecibelTool';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '소음 측정 - 마이크로 주변 소음 확인',
  description: '마이크로 들어오는 소리의 크기를 상대 데시벨로 보여줍니다. 도서관·대화·지하철 같은 기준과 견줘 지금이 어느 정도인지 가늠할 수 있습니다. 기기마다 마이크가 달라 절대값은 아닙니다.',
  alternates: {
    canonical: '/sound/decibel',
    languages: alternateLanguages10('/sound/decibel'),
  },
});

export default function Page() {
  return (
    <SoundShell slug="decibel">
      <DecibelTool />
    </SoundShell>
  );
}
