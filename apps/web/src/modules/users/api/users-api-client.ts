import { client } from '@common/config';
import { type UpdateUserDto } from '../dto';

const updateUserById = async (
  id: string | number | undefined,
  updateUserDto: UpdateUserDto
) => {
  await client.patch(`/users/${id}`, updateUserDto);
  return;
};

export const usersApiClient = { updateUserById };
