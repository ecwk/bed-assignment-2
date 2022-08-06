import { Role } from '@common/enum';

export type User = {
  userId: number;
  username: string;
  email: string;
  contact: string;
  role: Role;
  profilePicUrl: string;
  createdOn: string;
  lastModifiedOn: string;
  password: never;
};
