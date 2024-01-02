import SingleListing from '@/features/SingleListing';
import { useLocation } from 'react-router-dom';

export default function SingleListingPage() {
  const listingData = useLocation().state;

  return <SingleListing listingData={listingData} />;
}
