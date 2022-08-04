import { Main, Title } from '@common/components';
import { useAuth } from '@modules/auth';
import { type NextPage } from 'next';

const Admin: NextPage = () => {
  const { user } = useAuth();

  return (
    <Main>
      <Title
        mt={10}
        title={`Hello, ${user?.username}`}
        subtitle="This page contains your administrative functions"
      />
    </Main>
  );
};

export default Admin;
