import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'रंग कंट्रास्ट जाँच — WCAG AA और AAA अनुपात',
  description: 'बैकग्राउंड और टेक्स्ट के बीच कंट्रास्ट अनुपात निकालता है और बताता है कि वेब सुगम्यता की सीमा (WCAG AA और AAA) पार होती है या नहीं। असली टेक्स्ट का प्रीव्यू भी दिखता है, तो आँख से भी परखा जा सकता है।',
  alternates: {
    canonical: '/hi/color/contrast',
    languages: alternateLanguages('/color/contrast'),
  },
};

export default function HiColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="hi">
      <ContrastTool lang="hi" />
    </ColorShellIntl>
  );
}
