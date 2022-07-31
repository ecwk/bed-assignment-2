import { Role } from '@common/enum';

export type User = {
  userId: number;
  username: string;
  email: string;
  contact: string;
  role: Role;
  profilePicUrl: string;
  createdAt: string;
  lastUpdatedAt: string;
  password: never;
};
