import { Box, Center, Heading, Text } from '@chakra-ui/react';

import { NAVBAR_HEIGHT } from '@common/constants';

function Custom401() {
  return (
    <Center minH={`calc(100vh - ${NAVBAR_HEIGHT})`} textAlign="center">
      <Box>
        <Heading size="4xl">401</Heading>
        <Heading mt={5}>
          You are{' '}
          <Text as="span" color="red.400">
            Unauthorized
          </Text>
        </Heading>
      </Box>
    </Center>
  );
}

export default Custom401;
