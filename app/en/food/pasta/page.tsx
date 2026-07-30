import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import PastaTool from '@/components/food/PastaTool';

export const metadata: Metadata = {
  title: 'Pasta Water Calculator — Water and Salt Ratio',
  description: 'The base ratio is 1L of water and 10g of salt per 100g of pasta. Give it the weight of pasta and it works out both, along with cooking times by shape.',
  alternates: {
    canonical: '/en/food/pasta',
    languages: { 'en': '/en/food/pasta', 'ko': '/food/pasta', 'x-default': '/en/food/pasta' },
  },
};

export default function EnFoodPastaPage() {
  return (
    <FoodShellIntl slug="pasta" lang="en">
      <PastaTool lang="en" />
    </FoodShellIntl>
  );
}
