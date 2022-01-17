import { IUser, IUserLoginInfo, IUserRegisterInfo } from '../type/user';
import { GET, POST } from './baseAPI';

export const login = async (props: IUserLoginInfo) => {
  const url = 'auth/login';
  const response = await POST<IUser>(url, { ...props });
  return response;
};

export const register = async (props: IUserRegisterInfo) => {
  const url = 'auth/register';
  const response = await POST<IUser>(url, { ...props });
  return response;
};

export const logout = async () => {
  const url = 'auth/logout';
  const response = await POST<boolean>(url);
  return response;
};

export const refresh = async () => {
  const url = 'auth/refresh';
  const response = await GET<IUser>(url);
  return response;
};
