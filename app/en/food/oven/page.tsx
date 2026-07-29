import type { Metadata } from 'next';
import FoodShellIntl from '@/components/FoodShellIntl';
import OvenTool from '@/components/food/OvenTool';

export const metadata: Metadata = {
  title: 'Oven Temperature Converter — °F, °C, Gas Mark and Air Fryer',
  description: 'Turns the 350°F in a recipe into Celsius, and tells you what gas mark 4 actually is. It also works out the temperature and time to use if you are making the same thing in an air fryer.',
  alternates: {
    canonical: '/en/food/oven',
    languages: { 'en': '/en/food/oven', 'zh': '/zh/food/oven', 'ko': '/food/oven', 'x-default': '/en/food/oven' },
  },
};

export default function EnFoodOvenPage() {
  return (
    <FoodShellIntl slug="oven" lang="en">
      <OvenTool lang="en" />
    </FoodShellIntl>
  );
}
