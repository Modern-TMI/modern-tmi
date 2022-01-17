import { IUser, IUserLoginInfo } from '../type/user';
import { GET, POST } from './baseAPI';

export const login = async (props: IUserLoginInfo) => {
  const url = 'auth/login';
  const response = await POST<IUser>(url, { ...props });
  return response;
};
