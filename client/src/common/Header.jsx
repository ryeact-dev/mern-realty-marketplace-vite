import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useUserStore } from '@/store';
import { useEffect, useState } from 'react';

export default function Header() {
  const currentUser = useUserStore((state) => state.currentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onSearchChangeHandler = (evt) => {
    const value = evt.target.value;
    setSearchTerm(value);
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get('searchTerm');

  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Logo */}
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>MERN</span>
          <span className='text-slate-700'>Estate</span>
        </h1>
        {/* Search Input */}
        {pathname !== '/search' && (
          <form
            onSubmit={onSubmitHandler}
            className='py-1 px-2  w-[200px] sm:w-[300px] bg-slate-100 rounded-md border-2 border-slate-300 flex items-center justify-between'
          >
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent focus:outline-none'
              onChange={onSearchChangeHandler}
              value={searchTerm}
            />
            <button>
              <FaSearch className='text-slate-500' />
            </button>
          </form>
        )}
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
