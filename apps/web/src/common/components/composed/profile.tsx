import { Flex, VStack, Text, type FlexProps } from '@chakra-ui/react';

import { type User } from '@common/types';
import { ProfileAvatar, Link } from '@common/components';

export type ProfileProps = FlexProps & {
  user?: User | null;
};

export const Profile = ({ user, ...flexProps }: ProfileProps) => {
  return (
    <Flex
      className="profile-details"
      alignItems="center"
      gap={4}
      {...flexProps}
    >
      <ProfileAvatar user={user} size="xl" borderRadius="lg" />
      <VStack alignItems="flex-start" spacing={0}>
        <Text fontSize="xl" fontWeight="semibold">
          {user?.username}
        </Text>
        <Text color="gray.300">{user?.contact}</Text>
        <Link color="blue.200" href={`mailto:${user?.email}`} underline>
          {user?.email}
        </Link>
      </VStack>
    </Flex>
  );
};
