import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/users.api';
import SignIn from '@/features/Login/SignIn';
import SignUp from '@/features/Login/SignUp';

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const onSignupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (data.success === false) {
        setError(data.message);
        return;
      } else {
        setIsLogin(true);
        setError(null);
      }
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSignupMutation.mutate(formData);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      {!isLogin ? (
        <SignUp
          isLoading={onSignupMutation.isPending}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          error={error}
        />
      ) : (
        <SignIn
          isLoading={onSignupMutation.isPending}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          error={error}
        />
      )}
    </div>
  );
}
