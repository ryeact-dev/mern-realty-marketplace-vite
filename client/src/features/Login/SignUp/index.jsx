export default function SignUp() {
  return (
    <>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex justify-center'>
        <input
          type='text'
          placeholder='Enter name'
          className='border p-3 rounded-lg bg-transparent max-w-xs'
        />
      </form>
    </>
  );
}
