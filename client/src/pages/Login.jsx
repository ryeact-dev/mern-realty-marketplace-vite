import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store';
import { signin, signup } from '@/api/users.api';
import SignIn from '@/features/Login/SignIn';
import SignUp from '@/features/Login/SignUp';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [error, onLoginSucess, onLoginFailure] = useUserStore((state) => [
    state.user.error,
    state.onSuccess,
    state.onFailure,
  ]);

  const mutationFunction = isLogin ? signin : signup;

  const onSubmitMutation = useMutation({
    mutationFn: mutationFunction,
    onError: (data) => onLoginFailure(data.message),
    onSuccess: (data) => {
      if (data.success === false) {
        onLoginFailure(data.message);
        return;
      } else {
        onLoginSucess(data);
        {
          isLogin ? setIsLogin(true) : navigate('/', { replace: true });
        }
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
