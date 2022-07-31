import { NextPage } from 'next';
import { Flex, VStack, Text } from '@chakra-ui/react';

import { useAuth } from '@modules/auth';
import { EditProfileForm } from '@modules/users';
import { GridContainer, Title, Sidebar, Section } from '../index';
import { Link, ProfileAvatar, Title as CustomTitle } from '@common/components';

type ProfileProps = {};

const Profile: NextPage<ProfileProps> = () => {
  const { user } = useAuth();

  return (
    <GridContainer sx={{ maxW: '900px' }}>
      <Title />
      <Sidebar />
      <Section
        display="grid"
        gridTemplateAreas={`
          "header"
          "content"
        `}
        gridTemplateColumns="1fr max-content"
        gridRowGap={10}
      >
        <CustomTitle
          gridArea="header"
          title="Profile"
          subtitle="Some information here is exposed to the public"
        />

        <EditProfileForm gridArea="content" user={user} />
      </Section>
    </GridContainer>
  );
};

export default Profile;
