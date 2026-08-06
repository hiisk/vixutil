import type { Metadata } from 'next';
import PetFoodHubPage from '@/components/petfood/PetFoodHubPage';
import { hubMetadata } from '@/lib/petfood/route';

export const metadata: Metadata = hubMetadata('de');

export default function PetFoodHub() {
  return <PetFoodHubPage lang="de" />;
}
