import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'वर्णांधता सिम्युलेटर — प्रोटानोपिया, ड्यूटेरानोपिया और अन्य',
  description: 'आपके रंगों को बदलकर दिखाता है कि प्रोटानोपिया, ड्यूटेरानोपिया, ट्राइटानोपिया या पूर्ण वर्णांधता वाले व्यक्ति को वे कैसे दिखते हैं। सिर्फ़ लाल और हरे से स्थिति बताने वाला स्क्रीन क्यों समस्या है, यह तुरंत साफ़ हो जाता है।',
  alternates: {
    canonical: '/hi/color/colorblind',
    languages: alternateLanguages('/color/colorblind'),
  },
};

export default function HiColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="hi">
      <ColorblindTool lang="hi" />
    </ColorShellIntl>
  );
}
