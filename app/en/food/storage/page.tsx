import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import StorageTool from '@/components/food/StorageTool';

export const metadata: Metadata = {
  title: 'Food Storage Chart — Fridge and Freezer Times',
  description: 'How long meat, fish, dairy and cooked food last in the fridge and the freezer, and how to store them so they last. It cuts down on both throwing away food that was fine and eating food that was not.',
  alternates: {
    canonical: '/en/food/storage',
    languages: { 'en': '/en/food/storage', 'ko': '/food/storage', 'x-default': '/en/food/storage' },
  },
};

export default function EnFoodStoragePage() {
  return (
    <FoodShellIntl slug="storage" lang="en">
      <StorageTool lang="en" />
    </FoodShellIntl>
  );
}
