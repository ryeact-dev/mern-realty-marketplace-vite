import React from 'react';

export default function MailList() {
  return (
    <div className='w-full mt-10 bg-green-600 text-white flex flex-col items-center gap-5 p-12'>
      <h1 className='text-4xl font-semibold'>Save time, save money!</h1>
      <span className='mailDesc'>
        Sign up and well send the best deals to you
      </span>
      <div className=''>
        <input
          type='text'
          placeholder='Your Email...'
          className='w-80 h-10 p-2 border-none mx-2 rounded-md'
        />
        <button className='h-10 bg-white text-green-700 font-semibold border-none rounded-md px-8 hover:opacity-90'>
          Subscribe
        </button>
      </div>
    </div>
  );
}
