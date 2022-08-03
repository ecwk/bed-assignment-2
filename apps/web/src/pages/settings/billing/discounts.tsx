import { NextPage } from 'next';
import { Text } from '@chakra-ui/react';

import { Main, Title } from '@common/components';

const Discounts: NextPage = () => {
  return (
    <Main maxW="1000px" w="100%">
      <Title
        mt={10}
        title="Discounts"
        subtitle="View and manage your discounts here"
      />
      <Text mt={5}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit earum
        delectus quam consequuntur soluta facere assumenda? Reiciendis
        molestias, voluptates provident sint veritatis magnam voluptatibus nemo
        voluptatum omnis, magni adipisci!
      </Text>
    </Main>
  );
};

export default Discounts;
