import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'कलर पैलेट जनरेटर — जमने वाले रंग-संयोजन बनाएँ',
  description: 'एक रंग चुनिए और कलर व्हील के नियमों — कॉम्प्लिमेंटरी, एनालॉगस, ट्रायड — से उसके साथ जमने वाले रंग निकल आएँगे। अंदाज़े से चुनने के बजाय नियम से चुनने पर संयोजन बहुत ग़लत नहीं होता।',
  alternates: {
    canonical: '/hi/color/palette',
    languages: alternateLanguages('/color/palette'),
  },
};

export default function HiColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="hi">
      <PaletteTool lang="hi" />
    </ColorShellIntl>
  );
}
