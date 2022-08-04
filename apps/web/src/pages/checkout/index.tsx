import { Flex } from '@chakra-ui/react';
import { type NextPage } from 'next';

type CheckoutProps = {};

const Checkout: NextPage<CheckoutProps> = () => {
  return <Flex my="80px" maxW="1000px" w="100%" mx="auto"></Flex>;
};

export default Checkout;
