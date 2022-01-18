import { IUser, IUserLoginInfo, IUserRegisterInfo } from '../type/user';
import { GET, POST } from './baseAPI';

export const postLogin = async (props: IUserLoginInfo) => {
  const url = 'auth/login';
  const response = await POST<IUser>(url, { ...props });
  return response;
};

export const postRegister = async (props: IUserRegisterInfo) => {
  const url = 'auth/register';
  const response = await POST<IUser>(url, { ...props });
  return response;
};

export const postLogout = async () => {
  const url = 'auth/logout';
  const response = await POST<boolean>(url);
  return response;
};

export const getRefresh = async () => {
  const url = 'auth/refresh';
  const response = await GET<IUser>(url);
  return response;
};
