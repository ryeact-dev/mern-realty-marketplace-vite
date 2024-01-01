export default function ListingInfo() {
  return (
    <>
      <input
        type='text'
        id='name'
        placeholder='Name'
        maxLength='62'
        minLength='10'
        required
        className='border p-3 rounded-lg'
      />
      <textarea
        type='text'
        id='description'
        placeholder='Description'
        required
        className='border p-3 rounded-lg'
      />
      <input
        type='text'
        id='address'
        placeholder='Address'
        required
        className='border p-3 rounded-lg'
      />
      <article className='flex gap-6 flex-wrap'>
        <div className='flex gap-2'>
          <input type='checkbox' id='sale' className='w-5 cursor-pointer' />
          <span>Sell</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='rent' className='w-5 cursor-pointer' />
          <span>Rent</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='parking' className='w-5 cursor-pointer' />
          <span>Parking Spot</span>
        </div>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='furnished'
            className='w-5 cursor-pointer'
          />
          <span>Furnished</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='offer' className='w-5 cursor-pointer' />
          <span>Offer</span>
        </div>
      </article>
      <article className='flex flex-wrap gap-6'>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='bedrooms'
            min='1'
            max='10'
            required
            className='p-3 border border-gray-300 rounded-lg'
          />
          <span>Beds</span>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='bathrooms'
            min='1'
            max='10'
            required
            className='p-3 border border-gray-300 rounded-lg'
          />
          <span>Baths</span>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='regularPrice'
            min='1'
            max='10'
            required
            className='p-3 border border-gray-300 rounded-lg'
          />
          <div className='flex flex-col items-center'>
            <p>Regular Price</p>
            <span className='text-xs'>($ / month)</span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='discountPrice'
            min='1'
            max='10'
            required
            className='p-3 border border-gray-300 rounded-lg'
          />
          <div className='flex flex-col items-center'>
            <p>Discounted Price</p>
            <span className='text-xs'>($ / month)</span>
          </div>
        </div>
      </article>
    </>
  );
}
