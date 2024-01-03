export default function Search({
  onSubmitHandler,
  sidebarData,
  onChangeHandler,
  isLoading,
  listings,
}) {
  return (
    <section className='flex flex-col md:flex-row'>
      <aside className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebarData.searchTerm}
              onChange={onChangeHandler}
            />
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                checked={sidebarData.type === 'all'}
                onChange={onChangeHandler}
              />
              <span>Rend & Sale</span>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                checked={sidebarData.type === 'rent'}
                onChange={onChangeHandler}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                checked={sidebarData.type === 'sale'}
                onChange={onChangeHandler}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                checked={sidebarData.offer}
                onChange={onChangeHandler}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <label className='font-semibold'>Aminities:</label>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                checked={sidebarData.parking}
                onChange={onChangeHandler}
              />
              <span>Parking Lot</span>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                checked={sidebarData.furnished}
                onChange={onChangeHandler}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              id='sort_order'
              className='border rounded-lg p-3'
              onChange={onChangeHandler}
              defaultValue='createAt_desc'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </aside>
      <article>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing Results:
        </h1>
      </article>
    </section>
  );
}
