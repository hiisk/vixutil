import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'कलर मिक्सर — दो रंग मिलाकर बीच का रंग निकालें',
  description: 'दो रंग तय करके अनुपात घुमाइए, बीच का रंग मिल जाएगा। किसी ग्रेडिएंट के ख़ास बिंदु का रंग निकालने या दो ब्रांड रंगों के बीच का टोन खोजने में काम आता है।',
  alternates: {
    canonical: '/hi/color/mixer',
    languages: alternateLanguages('/color/mixer'),
  },
};

export default function HiColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="hi">
      <MixerTool lang="hi" />
    </ColorShellIntl>
  );
}
