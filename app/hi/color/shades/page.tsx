import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'कलर शेड जनरेटर — एक रंग से 50 से 900 तक की श्रेणी',
  description: 'एक ब्रांड रंग दीजिए और यह दस चरण बनाता है — हल्के (tints) और गहरे (shades)। आउटपुट उसी 50 · 100 · … · 900 रूप में आता है जिसकी Tailwind और अधिकतर डिज़ाइन सिस्टम अपेक्षा करते हैं।',
  alternates: {
    canonical: '/hi/color/shades',
    languages: alternateLanguages('/color/shades'),
  },
};

export default function HiColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="hi">
      <ShadesTool lang="hi" />
    </ColorShellIntl>
  );
}
