import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import SoundShell from '@/components/SoundShell';
import MosquitoTool from '@/components/sound/MosquitoTool';

export const metadata: Metadata = {
  title: '모기 소리 - 17kHz 고주파 들어보기',
  description: '17kHz 안팎의 고주파는 나이가 들수록 잘 들리지 않습니다. 청소년에게만 들린다고 해서 모기 소리로 불리는데, 여러 주파수를 들어 보며 어디까지 들리는지 확인할 수 있습니다.',
  alternates: {
    canonical: '/sound/mosquito',
    languages: alternateLanguages10('/sound/mosquito'),
  },
};

export default function Page() {
  return (
    <SoundShell slug="mosquito">
      <MosquitoTool />
    </SoundShell>
  );
}
