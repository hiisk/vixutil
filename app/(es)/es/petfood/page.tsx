import type { Metadata } from 'next';
import PetFoodHubPage from '@/components/petfood/PetFoodHubPage';
import { hubMetadata } from '@/lib/petfood/route';

export const metadata: Metadata = hubMetadata('es');

export default function PetFoodHub() {
  return <PetFoodHubPage lang="es" />;
}
