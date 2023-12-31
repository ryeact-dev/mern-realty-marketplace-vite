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
import { deleteUser, logoutUser, updateUser } from '@/api/users.api';
import ProfileForm from './components/ProfileForm';

export default function Profile({ currentUser, error }) {
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

  const logoutUserMutation = useMutation({
    mutationFn: logoutUser,
    onError: (data) => updateUserFailure(data.message),
    onSuccess: (data) => {
      if (data.success === false) {
        updateUserFailure(data.message);
        return;
      }
      onDeleteUser();
    },
  });

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
      <ProfileForm
        fileRef={fileRef}
        currentUser={currentUser}
        formData={formData}
        setFormData={setFormData}
        uploadError={uploadError}
        uploadPercentage={uploadPercentage}
        setImage={setImage}
        updateUserMutation={updateUserMutation}
        logoutUserMutation={logoutUserMutation}
        deleteUserMutation={deleteUserMutation}
        error={error}
        isUpdateSuccess={isUpdateSuccess}
      />
    </div>
  );
}
