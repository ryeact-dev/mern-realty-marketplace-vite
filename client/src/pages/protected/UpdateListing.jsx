import { useUserStore } from '@/store';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Listing from '@/features/Listing';

export default function UpdateListingPage() {
  const currentUser = useUserStore((state) => state.currentUser);
  const listingData = useLocation().state;
  const { id } = useParams();

  return currentUser ? (
    <Listing
      currentUser={currentUser}
      INITIAL_VALUES={listingData}
      paramsId={id}
    />
  ) : (
    <Navigate to='/login' />
  );
}
