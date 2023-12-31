import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const user = {
  currentUser: null,
  error: null,
};

export const useUserStore = create(
  persist(
    (set) => ({
      user,
      onSuccess: (data) =>
        set(() => ({
          user: {
            currentUser: data,
            error: null,
          },
        })),
      onFailure: (errorMessage) =>
        set(() => ({
          user: {
            ...user,
            error: errorMessage,
          },
        })),
    }),
    {
      name: 'user__info', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
