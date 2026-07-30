import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'CSS ग्रेडिएंट जनरेटर — linear-gradient कोड',
  description: 'रंग और कोण तय कीजिए, यह CSS का linear-gradient लिख देगा। कलर स्टॉप घुमाकर तय करें कि बदलाव कहाँ हो, और नतीजा सीधे चिपका दें।',
  alternates: {
    canonical: '/hi/color/gradient',
    languages: alternateLanguages('/color/gradient'),
  },
};

export default function HiColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="hi">
      <GradientTool lang="hi" />
    </ColorShellIntl>
  );
}
