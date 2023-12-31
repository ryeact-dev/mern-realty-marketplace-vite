import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/store';
import { app } from '@/firebase';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';
import { useMutation } from '@tanstack/react-query';
import { deleteUser, updateUser } from '@/api/users.api';

export default function Profile() {
  const { currentUser, error } = useUserStore((state) => state.user);
  const [updateUserSuccess, updateUserFailure, onDeleteUser] = useUserStore(
    (state) => [state.onSuccess, state.onFailure, state.onDeleteUser]
  );
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const fileRef = useRef(null);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onError: (data) => updateUserFailure(data.message),
    onSuccess: (data) => {
      if (data.success === false) {
        updateUserFailure(data.message);
        return;
      }
      updateUserSuccess(data);
      setIsUpdateSuccess(true);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onError: (data) => updateUserFailure(data.message),
    onSuccess: (data) => {
      if (data.success === false) {
        updateUserFailure(data.message);
        return;
      }
      onDeleteUser();
    },
  });

  const onImageChangeHandler = (evt) => {
    const file = evt.target.files[0];
    setImage(file);
  };

  const onInputChangeHandler = (evt) => {
    const value = evt.target.value;
    setFormData({ ...formData, [evt.target.id]: value });
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const userData = {
      ...formData,
      id: currentUser._id,
    };

    updateUserMutation.mutate(userData);
  };

  const onDeleteUserHandler = (evt) => {
    evt.preventDefault();
    deleteUserMutation.mutate(currentUser._id);
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
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
        <input
          onChange={onImageChangeHandler}
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
          defaultValue={currentUser.username}
          onChange={onInputChangeHandler}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          defaultValue={currentUser.email}
          onChange={onInputChangeHandler}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={onInputChangeHandler}
        />
        <button
          disabled={updateUserMutation.isLoading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {updateUserMutation.isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={onDeleteUserHandler}
          className='text-red-700 cursor-pointer hover:font-medium'
        >
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer hover:font-medium'>
          Logout
        </span>
      </div>
      <p className='text-red-700 text-center mt-5'> {error ? error : ''}</p>
      <p className='text-green-700 text-center mt-5'>
        {isUpdateSuccess ? 'Profile successfully updated!' : ''}
      </p>
    </div>
  );
}
