export type CreateUserDto = {
  username: string;
  email: string;
  contact: string;
  password: string;
  role: 'admin' | 'user';
};
