import SignIn from '@/features/Login/SignIn';
import SignUp from '@/features/Login/SignUp';
import { useState } from 'react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);

  console.log(isLogin);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      {!isLogin ? (
        <SignUp setIsLogin={setIsLogin} />
      ) : (
        <SignIn setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
