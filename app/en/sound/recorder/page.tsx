import type { Metadata } from 'next';
import SoundShellIntl from '@/components/SoundShellIntl';
import RecorderTool from '@/components/sound/RecorderTool';

export const metadata: Metadata = {
  title: 'Online Voice Recorder — Record and Save in the Browser',
  description: 'Record with nothing installed, listen back straight away and download the file. Recording happens inside the browser and is never sent to a server, so meeting notes or pronunciation practice are safe here.',
  alternates: {
    canonical: '/en/sound/recorder',
    languages: { 'en': '/en/sound/recorder', 'zh': '/zh/sound/recorder', 'ko': '/sound/recorder', 'x-default': '/en/sound/recorder' },
  },
};

export default function EnSoundRecorderPage() {
  return (
    <SoundShellIntl slug="recorder" lang="en">
      <RecorderTool lang="en" />
    </SoundShellIntl>
  );
}
