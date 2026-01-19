import { Metadata } from 'next';
import { ToursContent } from './ToursContent';

export const metadata: Metadata = {
  title: 'Private Tours',
  description:
    'Explore Iceland with our premium private tours. Golden Circle, Northern Lights, South Coast, and custom tours tailored to your schedule.',
};

export default function ToursPage() {
  return <ToursContent />;
}
