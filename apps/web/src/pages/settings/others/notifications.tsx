import { NextPage } from 'next';
import { Text } from '@chakra-ui/react';

import { Main, Title } from '@common/components';

const Notifications: NextPage = () => {
  return (
    <Main maxW="1000px" w="100%">
      <Title
        mt={10}
        title="Notifications"
        subtitle="View and manage your notification settings here"
      />
      <Text mt={5}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto odit eum,
        consequuntur nobis praesentium voluptatum libero culpa autem quam
        expedita explicabo adipisci omnis quis nihil deleniti commodi minima
        eaque ab.
      </Text>
    </Main>
  );
};

export default Notifications;
