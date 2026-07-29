import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import TunerTool from '@/components/sound/TunerTool';

export const metadata: Metadata = {
  title: 'Online Guitar Tuner — Free Tuner for Guitar and Ukulele',
  description: 'Play into the mic and it tells you which note it is and how far above or below pitch you are, in cents. You can also listen to the open-string reference notes for guitar, ukulele and bass.',
  alternates: {
    canonical: '/en/sound/tuner',
    languages: { 'en': '/en/sound/tuner', 'zh': '/zh/sound/tuner', 'ko': '/sound/tuner', 'x-default': '/en/sound/tuner' },
  },
};

export default function EnSoundTunerPage() {
  return (
    <SoundShellIntl slug="tuner" lang="en">
      <TunerTool lang="en" />
    </SoundShellIntl>
  );
}
