import { Main, Title } from '@common/components';
import { type NextPage } from 'next';

const AdminAddAirports: NextPage = () => {
  return (
    <Main>
      <Title
        mt={10}
        title="Add New Airports"
        subtitle="Using our built-in admin functions"
      />
    </Main>
  );
};

export default AdminAddAirports;
