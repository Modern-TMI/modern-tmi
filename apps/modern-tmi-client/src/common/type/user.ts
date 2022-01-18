export interface IUser {
  id: number;
  email: string;
  password: string;
  nickname: string;
  isActive: boolean;
  updatedDate: string;
  createdDate: string;
}

export interface IUserLoginInfo {
  email: string;
  password: string;
}

export interface IUserRegisterInfo {
  email: string;
  password: string;
  nickname: string;
}
