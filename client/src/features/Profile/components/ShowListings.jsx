import { getUserListings } from '@/api/listing.api';
import Image from '@/common/Image';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function ShowListings({ currentUser }) {
  const [showListings, setShowListings] = useState(false);

  const {
    isLoading,
    data = [],
    isError,
    error: fetchedError,
  } = useQuery({
    queryKey: ['userListings', currentUser],
    queryFn: () => getUserListings({ userId: currentUser._id }),
    enabled: showListings === true,
  });

  const onShowListingsHandler = () => {
    setShowListings(true);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-center'>
        <button className='text-green-700' onClick={onShowListingsHandler}>
          Show listings
        </button>
        {isError && <p className='text-red-700'>{fetchedError}</p>}
      </div>
      <div>
        <h1 className='text-center mt-7 text-2xl font-semibold'>
          Your Listings
        </h1>
        {!isLoading &&
          data.length > 0 &&
          data.map((listing) => (
            <div
              key={listing._id}
              className='flex justify-between items-center border-2 rounded-lg my-2 p-4'
            >
              <Link
                to={`/listing/${listing._id}`}
                className='capitalize flex items-start gap-2 hover:text-green-700'
              >
                <Image
                  src={listing.imgUrls[0]}
                  alt='listing-cover'
                  className='h-24 w-24 object-cover rounded-md'
                />
                <div className='font-medium'>
                  <p className=''>{listing.title}</p>
                  <p className='font-normal text-sm opacity-80 text-slate-700'>
                    {listing.description}
                  </p>
                </div>
              </Link>

              <div className='space-y-2'>
                <button className='bg-green-700 w-full px-4 py-1 rounded-md text-white hover:opacity-90 flex items-center justify-center gap-1'>
                  <FaPenToSquare size={14} />
                  <p className='text-base uppercase font-medium'>Edit</p>
                </button>
                <button className='bg-red-700 px-4 py-1 rounded-md text-white hover:opacity-90 flex items-center gap-1'>
                  <FaTrash size={14} className='' />
                  <p className='text-base uppercase font-medium'>Delete</p>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
