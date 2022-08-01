import { NextPage } from 'next';

import { EditProfileForm } from '@modules/users';
import { Main, Sidebar, Section } from '../index';

type ProfileProps = {};

const Profile: NextPage<ProfileProps> = () => {
  return (
    <Main>
      <Sidebar />
      <Section
        title="Profile"
        subtitle="Some information will be exposed publicly"
      >
        <EditProfileForm />
      </Section>
    </Main>
  );
};

export default Profile;
