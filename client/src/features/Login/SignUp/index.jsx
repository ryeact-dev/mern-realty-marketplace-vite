export default function SignUp({ setIsLogin }) {
  const onLinkClickHandler = () => {
    console.log('click');
    setIsLogin(false);
  };

  return (
    <>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Enter username'
          className='border p-3 rounded-lg'
          id='username'
        />
        <input
          type='email'
          placeholder='Enter email'
          className='border p-3 rounded-lg'
          id='email'
        />
        <input
          type='password'
          placeholder='Enter password'
          className='border p-3 rounded-lg'
          id='password'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Sign Up
        </button>
        <div className='flex justify-center items-center gap-1 mt-4'>
          <p>Already have an account? </p>
          <button
            type='button'
            onClick={onLinkClickHandler}
            className='text-blue-700 cursor-pointer'
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
