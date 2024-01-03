import ListingCard from './ListingCard';

export default function ListingsData({ listings, isLoading }) {
  return (
    <article className='flex-1'>
      <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
        Listing Results:
      </h1>
      <div className='p-4 flex flex-wrap gap-3'>
        {!isLoading && listings.length === 0 && (
          <p className='text-xl text-slate-700'>No listing found!</p>
        )}
        {isLoading && (
          <p className='text-xl text-slate-700 text-center w-full'>
            Loading...
          </p>
        )}
        {!isLoading &&
          listings.length > 0 &&
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
      </div>
    </article>
  );
}
