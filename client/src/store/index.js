import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
  currentUser: null,
  error: null,
};

export const useUserStore = create(
  persist(
    (set) => ({
      initialState,
      onSigninSuccess: (data) =>
        set(() => ({
          initialState: {
            currentUser: data,
            error: null,
          },
        })),
      onSigninFailure: (errorMessage) =>
        set(() => ({
          initialState: {
            ...initialState,
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
