import { Role } from '../../role/role';

export class IUser {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  nickname: string;
  refreshToken: string | null;
  role: Role;
}
