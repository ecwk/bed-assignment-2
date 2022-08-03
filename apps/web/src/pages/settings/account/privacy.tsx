import { NextPage } from 'next';
import { Text } from '@chakra-ui/react';

import { Main, Title } from '@common/components';

const Privacy: NextPage = () => {
  return (
    <Main maxW="1000px" w="100%">
      <Title
        mt={10}
        title="Privacy"
        subtitle="View and edit your privacy settings here"
      />
      <Text mt={5}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
        nihil minima perspiciatis soluta quod architecto ad praesentium quae
        eaque sunt, accusamus sequi excepturi id quidem obcaecati voluptas
        tempore expedita temporibus!
      </Text>
    </Main>
  );
};

export default Privacy;
