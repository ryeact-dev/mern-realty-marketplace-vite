import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ListingCard({ singleListing }) {
  const {
    _id,
    title,
    imgUrls,
    address,
    description,
    regularPrice,
    discountPrice,
    bedrooms,
    bathrooms,
    offer,
    type,
  } = singleListing;

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px] m-1'>
      <Link to={`/single-listing/${_id}`}>
        <img
          src={imgUrls[0]}
          alt='listing-cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='mt-6 p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {title}
          </p>
          <div className='flex items-center gap-1 text-sm'>
            <FaMapMarkerAlt className='text-green-700' />
            <p className='text-slate-700 truncate w-full'>{address}</p>
          </div>
          <p className='text-slate-700 text-base line-clamp-2'>{description}</p>
          <p className='mt-2 text-slate-500 font-semibold'>
            $
            {offer
              ? discountPrice.toLocaleString('en-US')
              : regularPrice.toLocaleString('en-US')}
            {type === 'rent' && ' / month'}
          </p>
          <div className='flex items-center gap-2 text-slate-500 font-bold text-sm'>
            <p>{bedrooms > 1 ? `${bedrooms} Beds` : '1 Bed'}</p>
            <p>{bathrooms > 1 ? `${bathrooms} Baths` : '1 Bath'}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
