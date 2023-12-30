import { create } from 'zustand';

const initialState = {
  currentUser: null,
  error: null,
};

export const userStore = create((set) => ({
  initialState,
  onSigninSuccess: (data) =>
    set(() => ({
      initialState: {
        currentUser: data,
        error: null,
      },
    })),
  onSigninFailure: (errorMessage) =>
    set((state) => ({
      initialState: {
        ...state.initialState,
        error: errorMessage,
      },
    })),
}));
