import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IUserDispatch, IUserRootState } from '../store/userStore';

export const useUserDispatch = () => useDispatch<IUserDispatch>();
export const useUserSelector: TypedUseSelectorHook<IUserRootState> =
  useSelector;
