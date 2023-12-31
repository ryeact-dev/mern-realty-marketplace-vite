import Profile from '@/features/Profile';
import { useUserStore } from '@/store';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { currentUser, error } = useUserStore((state) => state.user);

  return currentUser ? (
    <Profile currentUser={currentUser} error={error} />
  ) : (
    <Navigate to='/login' />
  );
}
