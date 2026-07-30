import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'रैंडम कलर जनरेटर — लॉक के साथ पैलेट दोबारा निकालें',
  description: 'पाँच रंग रैंडम निकालता है। जो पसंद आएँ उन्हें लॉक कर दें और बाक़ी ही दोबारा निकालें — इससे जमने वाला संयोजन मिलने तक तेज़ी से घुमाया जा सकता है।',
  alternates: {
    canonical: '/hi/color/random',
    languages: alternateLanguages('/color/random'),
  },
};

export default function HiColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="hi">
      <RandomTool lang="hi" />
    </ColorShellIntl>
  );
}
