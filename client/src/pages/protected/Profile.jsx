import Profile from '@/features/Profile';
import { useUserStore } from '@/store';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { currentUser } = useUserStore((state) => state.user);

  return currentUser ? <Profile /> : <Navigate to='/login' />;
}
