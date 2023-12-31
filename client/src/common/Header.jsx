import { useUserStore } from '@/store';
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { currentUser } = useUserStore((state) => state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Logo */}
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Sahand</span>
          <span className='text-slate-700'>Estate</span>
        </h1>
        {/* Search Input */}
        <form className='py-1 px-2  w-[200px] sm:w-[300px] bg-slate-100 rounded-md border-2 border-slate-300 flex items-center justify-between'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none'
          />
          <FaSearch className='text-slate-500' />
        </form>
        {/* Nav Links */}
        <ul className='flex gap-4'>
          <NavLink to={`/`}>
            <li className='hidden md:inline text-slate-700 hover:cursor-pointer'>
              Home
            </li>
          </NavLink>
          <NavLink to={`/about`}>
            <li className='hidden md:inline text-slate-700 hover:cursor-pointer'>
              About
            </li>
          </NavLink>

          <NavLink to={currentUser ? `/profile` : `/login`}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt='profile'
                className='rounded-full h-7 w-7 object-cover'
              />
            ) : (
              <li className='text-slate-700 hover:cursor-pointer'>Login</li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
}
