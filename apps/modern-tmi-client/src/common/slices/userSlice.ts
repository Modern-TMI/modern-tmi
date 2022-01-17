import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../type/user';

const initialUserInfo = {
  id: -1,
  email: '',
  password: '',
  nickname: '',
  isActive: false,
  updatedDate: '',
  createdDate: '',
} as IUser;

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserInfo,
  reducers: {
    loginUser: (state, action: PayloadAction<IUser>) => action.payload,
    logoutUser: (state, action) => initialUserInfo,
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice;
