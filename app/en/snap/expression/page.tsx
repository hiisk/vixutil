import type { Metadata } from 'next';
import Expression from '@/components/snap/Expression';

export const metadata: Metadata = {
  title: "Expression Analyser — Seven Emotions From One Photo",
  description: "A trained neural network infers seven emotion probabilities from your photo, right in your browser. Real model outputs, nothing uploaded to a server.",
  alternates: {
    canonical: '/en/snap/expression',
    languages: { 'en': '/en/snap/expression', 'ko': '/snap/expression', 'x-default': '/en/snap/expression' },
  },
};

export default function EnExpressionPage() {
  return <Expression lang="en" />;
}
