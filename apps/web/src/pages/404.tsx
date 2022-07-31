import { Box, Center, Heading, Text, Code } from '@chakra-ui/react';

import { NAVBAR_HEIGHT } from '@common/constants';
import { useEffect, useState } from 'react';

function Custom404() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (window) {
      setUrl(window.location.pathname)
    }
  })

  return (
    <Center minH={`calc(100vh - ${NAVBAR_HEIGHT})`} textAlign="center">
      <Box>
        <Heading size="4xl">404</Heading>
        <Heading mt={5}>
          Page{' '}
          <Text as="span" color="red.400">
            not found
          </Text>
          <Text>
            <Code fontSize="xl">{url}</Code>
          </Text>
        </Heading>
      </Box>
    </Center>
  );
}

export default Custom404;
