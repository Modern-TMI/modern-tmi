import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';

const userStore = configureStore({
  reducer: userSlice.reducer,
});

export default userStore;

export type IUserDispatch = typeof userStore.dispatch;

export type IUserRootState = ReturnType<typeof userStore.getState>;
