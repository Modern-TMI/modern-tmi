import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';

const userStore = configureStore({
  reducer: userSlice.reducer,
});

export default userStore;
