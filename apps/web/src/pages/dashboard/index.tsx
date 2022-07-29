import { NextPage } from 'next';
import { Heading, Box, Button } from '@chakra-ui/react';

const Dashboard: NextPage = () => {
  return (
    <Box my="80px">
      <Heading fontSize="5xl" textAlign="center" fontWeight="black">
        Dashboard
      </Heading>
      <Button
        onClick={() => {
          if (Notification) {
            new Notification('Hello', { body: 'Hello World' });
          }
        }}
      >
        Notify
      </Button>
    </Box>
  );
};

export default Dashboard;
