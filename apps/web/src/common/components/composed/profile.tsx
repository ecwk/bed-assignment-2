import {
  Flex,
  VStack,
  Text,
  type FlexProps,
  useColorModeValue
} from '@chakra-ui/react';

import { type User } from '@common/types';
import { ProfileAvatar, Link } from '@common/components';
import { capitalize } from 'lodash';

export type ProfileProps = FlexProps & {
  user?: User | null;
};

export const Profile = ({ user, ...flexProps }: ProfileProps) => {
  const textColor = useColorModeValue('brandGray.600', 'brandGray.300');
  const linkColor = useColorModeValue('blue.500', 'blue.200');

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
          {capitalize(user?.username)}
        </Text>
        <Text color={textColor}>{user?.contact}</Text>
        <Link color={linkColor} href={`mailto:${user?.email}`} underline>
          {user?.email}
        </Link>
      </VStack>
    </Flex>
  );
};
