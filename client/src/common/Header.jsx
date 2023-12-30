import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function Header() {
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
        <div className='flex gap-4'>
          <NavLink
            to={`/`}
            className='hidden md:inline text-slate-700 hover:cursor-pointer'
          >
            Home
          </NavLink>
          <NavLink
            to={`/about`}
            className='hidden md:inline text-slate-700 hover:cursor-pointer'
          >
            About
          </NavLink>
          <NavLink
            to={`/login`}
            className='text-slate-700 hover:cursor-pointer'
          >
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
}
