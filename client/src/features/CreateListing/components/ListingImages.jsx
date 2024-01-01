import Image from '@/common/Image';
import { FaRegStar, FaStar, FaTrash, FaUpload } from 'react-icons/fa';

export default function ListingImages({
  formData,
  setFormData,
  onImagesChangeHandler,
}) {
  const { imgUrls } = formData;

  const onSelectMainPhotoHandler = (filename) => {
    const newArray = [
      filename,
      ...imgUrls.filter((photo) => photo !== filename),
    ];
    setFormData({ ...formData, imgUrls: newArray });
  };

  const onRemoveImgHandler = (filename) => {
    const newArray = [...imgUrls.filter((photo) => photo !== filename)];
    setFormData({ ...formData, imgUrls: newArray });
  };

  return (
    <>
      {imgUrls.length > 0 &&
        imgUrls.map((link, index) => (
          <div className='relative flex w-full md:w-32 md:h-32' key={index}>
            <Image
              className='w-full rounded-xl object-cover'
              src={link}
              alt=''
            />
            <button
              type='button'
              onClick={() => onRemoveImgHandler(link)}
              className='absolute bottom-1 right-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-2 text-white'
            >
              <FaTrash className='h-4 w-4' />
            </button>
            <button
              type='button'
              onClick={() => onSelectMainPhotoHandler(link)}
              className='absolute bottom-1 left-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-2 text-white'
            >
              {link === imgUrls[0] && <FaStar className='h-4 w-4' />}
              {link !== imgUrls[0] && <FaRegStar className='h-4 w-4' />}
            </button>
          </div>
        ))}
      {imgUrls.length <= 5 && (
        <label className='flex w-full md:w-32 md:h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-400 px-2 py-4 text-2xl text-black hover:bg-gray-300 sm:text-3xl'>
          <input
            onChange={onImagesChangeHandler}
            type='file'
            id='images'
            accept='image/*'
            multiple
            hidden
          />
          <FaUpload className='h-4 w-4 md:h-8 md:w-8' />
          <p className='text-base font-medium'>Add Photo</p>
        </label>
      )}
    </>
  );
}
