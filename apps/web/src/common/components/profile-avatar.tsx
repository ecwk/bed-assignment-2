import { Avatar, type AvatarProps } from '@chakra-ui/react';
import { type User } from '@common/types';

type ProfileAvatarProps = AvatarProps & {
  user?: User | null;
};

export const ProfileAvatar = ({ user, ...avatarProps }: ProfileAvatarProps) => {
  return (
    <Avatar
      name={user?.username || undefined}
      src={user?.profilePicUrl || undefined}
      {...avatarProps}
    />
  );
};
