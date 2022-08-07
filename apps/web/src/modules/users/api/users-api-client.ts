import { client } from '@common/config';
import { User } from '@common/types';
import { type UpdateUserDto, type CreateUserDto } from '../dto';

const updateUserById = async (
  id: string | number | undefined,
  updateUserDto: UpdateUserDto
) => {
  await client.patch(`/users/${id}`, updateUserDto);
  return;
};

const createUser = async (createUserDto: CreateUserDto) => {
  const response = await client.post('/users', createUserDto);
  const createdUser: User = response.data?.user;
  return createdUser;
};

export const usersApiClient = { updateUserById, createUser };
