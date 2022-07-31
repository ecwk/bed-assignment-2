import { NextPage } from 'next';
import {
  Flex,
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Button
} from '@chakra-ui/react';

import { useAuth } from '@modules/auth';
import { EditProfileForm } from '@modules/users';
import { GridContainer, Title, Sidebar, Section } from '../index';
import {
  Link,
  ButtonLink,
  ProfileAvatar,
  Title as MyTitle
} from '@common/components';

type ProfileProps = {};

const Profile: NextPage<ProfileProps> = () => {
  const { user } = useAuth();

  return (
    <GridContainer sx={{ maxW: '900px' }}>
      <Title />
      <Sidebar />
      <Section
        sx={{
          display: 'grid',
          gridTemplateAreas: `
            "header"
            "content"
          `,
          gridTemplateColumns: '1fr max-content',
          gridRowGap: 10
        }}
      >
        <MyTitle
          sx={{
            gridArea: 'header'
          }}
          title="Profile"
          subtitle="Some information here is exposed to the public"
        />

        <Flex
          sx={{
            gridArea: 'content',
            flexDir: 'column'
          }}
        >
          <Flex className="profile-details" alignItems="center" gap={4}>
            <ProfileAvatar user={user} size="xl" borderRadius="lg" />
            <VStack alignItems="flex-start" spacing={0}>
              <Text fontSize="xl" fontWeight="semibold">
                {user?.username}
              </Text>
              <Text color="gray.300">{user?.contact}</Text>
              <Link color="blue.200" href={`mailto:${user?.email}`}>
                {user?.email}
              </Link>
            </VStack>
          </Flex>
          <EditProfileForm mt={5} user={user} />
        </Flex>
      </Section>
    </GridContainer>
  );
};

export default Profile;
