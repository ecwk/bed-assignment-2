import { type NextPage } from 'next';
import { Heading, Box, Button, Text } from '@chakra-ui/react';

import { Main, Title } from '@common/components';

const Dashboard: NextPage = () => {
  return (
    <Main>
      <Title
        mt={10}
        title="Dashboard"
        subtitle="Everything you need to know is accessible her"
      />
      <Text my={5} maxW="80ch">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis enim,
        molestias nesciunt deserunt recusandae iste! At nobis dolorum
        praesentium beatae doloribus voluptatibus, vero voluptatem excepturi
        nihil architecto exercitationem maiores inventore.
      </Text>
    </Main>
  );
};

export default Dashboard;
<Button
  onClick={() => {
    if (Notification) {
      new Notification('Hello', { body: 'Hello World' });
    }
  }}
>
  Notify
</Button>;
