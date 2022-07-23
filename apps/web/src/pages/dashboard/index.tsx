import { NextPage } from 'next';
import { Heading, Box } from '@chakra-ui/react';

const Dashboard: NextPage = () => {
  return (
    <Box my="80px">
      <Heading fontSize="5xl" textAlign="center" fontWeight="black">
        Dashboard
      </Heading>
    </Box>
  );
};

export default Dashboard;
