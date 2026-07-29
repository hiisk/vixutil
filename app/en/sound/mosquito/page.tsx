import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import MosquitoTool from '@/components/sound/MosquitoTool';

export const metadata: Metadata = {
  title: 'Mosquito Tone — Listen to a 17kHz High Frequency',
  description: 'Frequencies around 17kHz become harder to hear as you get older. It is called a mosquito tone because supposedly only teenagers hear it — play through the frequencies and find where yours stops.',
  alternates: {
    canonical: '/en/sound/mosquito',
    languages: { 'en': '/en/sound/mosquito', 'zh': '/zh/sound/mosquito', 'ko': '/sound/mosquito', 'x-default': '/en/sound/mosquito' },
  },
};

export default function EnSoundMosquitoPage() {
  return (
    <SoundShellIntl slug="mosquito" lang="en">
      <MosquitoTool lang="en" />
    </SoundShellIntl>
  );
}
