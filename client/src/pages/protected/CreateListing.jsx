import { useUserStore } from '@/store';
import { Navigate } from 'react-router-dom';
import CreateListing from '@/features/CreateListing';

export default function CreateListingPage() {
  const { currentUser, error } = useUserStore((state) => state.user);

  return currentUser ? (
    <CreateListing currentUser={currentUser} error={error} />
  ) : (
    <Navigate to='/login' />
  );
}
