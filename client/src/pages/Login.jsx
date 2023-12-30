import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { signin, signup } from '@/api/users.api';
import SignIn from '@/features/Login/SignIn';
import SignUp from '@/features/Login/SignUp';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [error, onSigninSuccess, onSigninFailure] = useUserStore((state) => [
    state.initialState.error,
    state.onSigninSuccess,
    state.onSigninFailure,
  ]);

  const mutationFunction = isLogin ? signin : signup;

  const onSubmitMutation = useMutation({
    mutationFn: mutationFunction,
    onSuccess: (data) => {
      if (data.success === false) {
        onSigninFailure(data.message);
        return;
      } else {
        {
          !isLogin ? setIsLogin(true) : navigate('/', { replace: true });
        }
        onSigninSuccess(data);
      }
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitMutation.mutate(formData);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      {!isLogin ? (
        <SignUp
          isLoading={onSubmitMutation.isPending}
          setIsLogin={setIsLogin}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          error={error}
        />
      ) : (
        <SignIn
          isLoading={onSubmitMutation.isPending}
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
