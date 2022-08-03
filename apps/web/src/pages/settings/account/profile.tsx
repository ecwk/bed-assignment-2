import { NextPage } from 'next';

import { EditProfileForm } from '@modules/users';
import { Main, Title } from '@common/components';

type ProfileProps = {};

const Profile: NextPage<ProfileProps> = () => {
  return (
    <Main maxW="1000px" w="100%">
      <Title
        mt={10}
        title="Profile"
        subtitle="View and edit your profile here"
      />
      <EditProfileForm mt={5} />
    </Main>
  );
};

export default Profile;
