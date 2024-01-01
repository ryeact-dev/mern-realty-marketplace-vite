import { useUserStore } from '@/store';
import { Navigate } from 'react-router-dom';
import CreateListing from '@/features/CreateListing';

export default function CreateListingPage() {
  const currentUser = useUserStore((state) => state.currentUser);

  return currentUser ? (
    <CreateListing currentUser={currentUser} />
  ) : (
    <Navigate to='/login' />
  );
}
