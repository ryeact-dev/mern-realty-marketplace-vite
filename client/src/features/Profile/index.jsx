import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/store';
import { app } from '@/firebase';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';

export default function Profile() {
  const { currentUser } = useUserStore((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);

  const onImageChange = (evt) => {
    const file = evt.target.files[0];
    setImage(file);
  };

  // Handle the firebase upload
  const handleFileUpload = (imageFile) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },

      // Error callback fn
      (error) => {
        setUploadError(true);
      },

      // File uploaded successfully callback fn
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={onImageChange}
          type='file'
          ref={fileRef}
          accept='image/*'
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-center'>
          {uploadError ? (
            <span className='text-red-700'>
              Error upload image (image must be less than 2mb)
            </span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${uploadPercentage}%`}</span>
          ) : uploadPercentage === 100 && !uploadError ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : null}
        </p>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer hover:font-medium'>
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer hover:font-medium'>
          Logout
        </span>
      </div>
    </div>
  );
}
