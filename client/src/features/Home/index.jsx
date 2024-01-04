import { getSearchListings } from '@/api/listing.api';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ListingCard from '../Search/ListingsData/ListingCard';

export default function Home() {
  const { isLoading: loadingOfferListings, data: offerListingsData } = useQuery(
    {
      queryKey: ['listings-offer'],
      queryFn: () => getSearchListings('?offer=true&limit=4'),
      select: ({ foundListings }) => {
        return foundListings;
      },
    }
  );

  const { isLoading: loadingRentListings, data: rentListingsData } = useQuery({
    queryKey: ['listings-rent'],
    queryFn: () => getSearchListings('?type=rent&limit=4'),
    select: ({ foundListings }) => {
      return foundListings;
    },
    enabled: !!offerListingsData,
  });

  const { isLoading: loadingSaletListings, data: saleListingsData } = useQuery({
    queryKey: ['listings-sale'],
    queryFn: () => getSearchListings('?type=sale&limit=4'),
    select: ({ foundListings }) => {
      return foundListings;
    },
    enabled: !!rentListingsData,
  });

  return (
    <section className='max-w-6xl mx-auto p-2 sm:p-3'>
      {/* Hero Section */}
      <article>
        <div className='flex flex-col gap-6 w-full md:px-3 py-28'>
          <h1 className='text-slate-700 font-bold text-4xl lg:text-5xl'>
            Find you next <span className='text-slate-500'>perfect</span> <br />
            place with ease
          </h1>
          <p className='text-gray-400 text-xs sm:text-sm'>
            MERN Estate is the best place to find you next perfect place to
            live. <br />
            We have a wide range of properties for you to choose from.
          </p>
          <Link
            to={`/search`}
            className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
          >{`Let's Start now...`}</Link>
        </div>
      </article>
      {/*  Search Section */}
      <article></article>

      {/*  Listings Offer Section  */}
      <article className='my-3'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-600'>
            Recent Offers
          </h1>
          <Link
            to='/search?offer=true'
            className='text-sm text-blue-800 hover:underline hover:font-medium'
          >
            Show more offers
          </Link>
        </div>
        {loadingOfferListings && <p>Loading listings</p>}
        {!loadingOfferListings && offerListingsData?.length > 0 && (
          <div className='flex flex-wrap gap-4'>
            {offerListingsData?.map((listing) => (
              <ListingCard singleListing={listing} key={listing._id} />
            ))}
          </div>
        )}
      </article>

      {/*  Listings Rent Section  */}
      <article className='my-3'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-600'>
            Recent places for rent
          </h1>
          <Link
            to='/search?offer=rent'
            className='text-sm text-blue-800 hover:underline'
          >
            Show more places for rent
          </Link>
        </div>
        {loadingRentListings && <p>Loading listings</p>}
        {!loadingRentListings && rentListingsData?.length > 0 && (
          <div className='flex flex-wrap gap-4'>
            {rentListingsData?.map((listing) => (
              <ListingCard singleListing={listing} key={listing._id} />
            ))}
          </div>
        )}
      </article>

      {/*  Listings Sale Section  */}
      <article className='my-3'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-600'>
            Recent places for rent
          </h1>
          <Link
            to='/search?offer=rent'
            className='text-sm text-blue-800 hover:underline'
          >
            Show more places for sale
          </Link>
        </div>
        {loadingSaletListings && <p>Loading listings</p>}
        {!loadingSaletListings && saleListingsData?.length > 0 && (
          <div className='flex flex-wrap gap-4'>
            {saleListingsData?.map((listing) => (
              <ListingCard singleListing={listing} key={listing._id} />
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
