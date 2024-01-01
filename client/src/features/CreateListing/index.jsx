import { useState } from 'react';
import { app } from '@/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useUserStore } from '@/store';
import ListingImages from './components/ListingImages';

export default function CreateListing() {
  const { error } = useUserStore((state) => state.user);
  const setOnError = useUserStore((state) => state.setOnError);
  const [formData, setFormData] = useState({
    imgUrls: [],
  });

  console.log(formData);

  const onImagesChangeHandler = (evt) => {
    const files = evt.target.files;
    const imgUrlsArray = Array.from(files);
    setFormData({
      ...formData,
      imgUrls: [...formData.imgUrls, ...imgUrlsArray],
    });
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const { imgUrls } = formData;
    if (imgUrls.length === 0 && imgUrls.length < 3) {
      setOnError('Please upload at least 3 images');
      return;
    }

    if (imgUrls.length > 6) {
      setOnError('Please upload at most 6 images');
      return;
    }

    const promises = [];

    for (let i = 0; i < imgUrls.length; i++) {
      promises.push(storeImage(imgUrls[i]));
    }
    Promise.all(promises).then((urls) =>
      setFormData({ ...formData, imgUrls: [...formData.imgUrls, ...urls] })
    );
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => reject(err),
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          })
      );
    });
  };

  console.log('error', error);

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <section className='flex flex-col gap-4 flex-1'>
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
              <input
                type='checkbox'
                id='parking'
                className='w-5 cursor-pointer'
              />
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
              <input
                type='checkbox'
                id='offer'
                className='w-5 cursor-pointer'
              />
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
        </section>
        {/* Images Upload */}
        <section className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              (min 3 and max 6 images)
            </span>
          </p>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
            <ListingImages
              formData={formData}
              setFormData={setFormData}
              onImagesChangeHandler={onImagesChangeHandler}
            />
          </div>

          <button
            type='button'
            onClick={onSubmitHandler}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Create Listing
          </button>
        </section>
      </form>
    </main>
  );
}
