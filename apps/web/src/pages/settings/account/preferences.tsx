import { NextPage } from 'next';
import { Text } from '@chakra-ui/react';

import { Main, Title } from '@common/components';

const Preferences: NextPage = () => {
  return (
    <Main maxW="1000px" w="100%">
      <Title
        mt={10}
        title="Preferences"
        subtitle="View and edit your preferences here"
      />
      <Text mt={5}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
        at a pariatur tenetur! Velit vero explicabo dolorem perspiciatis
        ratione. Reiciendis quisquam quam animi facilis quos illum in doloremque
        voluptates labore!
      </Text>
    </Main>
  );
};

export default Preferences;
