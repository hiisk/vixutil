import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'रंग तापमान — केल्विन से RGB में बदलें',
  description: '2700K का वॉर्म व्हाइट असल में कैसा दिखता है और 6500K की डेलाइट कितनी नीली है, यह देख सकते हैं। रोशनी चुनते समय या फ़ोटोग्राफ़ी में व्हाइट बैलेंस की समझ बनाने में काम आता है।',
  alternates: {
    canonical: '/hi/color/temperature',
    languages: alternateLanguages('/color/temperature'),
  },
};

export default function HiColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="hi">
      <TemperatureTool lang="hi" />
    </ColorShellIntl>
  );
}
