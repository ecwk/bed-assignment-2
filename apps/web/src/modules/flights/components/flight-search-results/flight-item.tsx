import dayjs from 'dayjs';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormControl,
  useToast,
  Image,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Text,
  Button,
  FlexProps,
  Box,
  Tag,
  HStack,
  IconButton
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { getMs } from '@common/utils';
import { Counter } from '@common/components';
import { useCart } from '@common/hooks';
import { useAuth } from '@modules/auth';
import { type Flight } from '@common/types';

type FlightItemProps = FlexProps & {
  flight: Flight;
};

export const FlightItem = ({ flight, ...flexProps }: FlightItemProps) => {
  const [count, setCount] = useState(1);
  const [quantity, setQuantity] = useState('1');
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  const {
    flightId,
    flightCode,
    aircraftName,
    travelTime,
    departureDate,
    price
  } = flight;
  const travelTimeMs = getMs(travelTime);
  const departDateTime = dayjs(departureDate);
  const arrivalDateTime = dayjs(departDateTime).add(travelTimeMs, 'ms');

  const handleClick = () => {
    if (!user) {
      router.push('/login');
    } else {
      onClose();
      toast({
        title: 'Added to cart',
        description: `${flightCode} - $${Number(price).toFixed(
          2
        )} x ${quantity}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      });
      addToCart({
        id: `flightId-${flightId}`,
        name: flightCode,
        quantity: parseInt(quantity, 10),
        price: parseInt(price, 10)
      });
    }
  };

  return (
    <Flex
      key={flightId}
      flexDir="column"
      border="1px solid"
      borderRadius="xl"
      borderColor="gray.500"
      {...flexProps}
    >
      <Image
        borderTopRadius="xl"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
      <Flex flexDir="column" p={5}>
        <HStack mt={2}>
          <Tag size="sm" colorScheme="blue" borderRadius="2xl">
            DISCOUNT
          </Tag>
          <Tag size="sm" colorScheme="green" borderRadius="2xl">
            -10%
          </Tag>
          <Tag size="sm" colorScheme="red" borderRadius="2xl">
            NEW
          </Tag>
        </HStack>
        <Heading fontSize="2xl" mt={2}>
          {flightCode}
        </Heading>
        <Text>{dayjs(departureDate).format('DD MMM YYYY, ddd')}</Text>
        <Text color="gray">
          {departDateTime.format('HH:mm a')} -{' '}
          {arrivalDateTime.format('HH:mm a')}
        </Text>
        <Button
          w="max-content"
          variant="link"
          fontWeight="normal"
          fontSize="sm"
          colorScheme="blue"
          onClick={onOpen}
        >
          View details
        </Button>
        <Flex flexDir="column">
          {/* <Text fontSize="xl" fontWeight="bold" color="green.200">
            ${price}
          </Text> */}
        </Flex>
        <FormControl></FormControl>
        <Flex alignItems="end" gap={2}>
          <Button onClick={onOpen} variant="outline">
            View Details
          </Button>
          <Box>
            <Counter value={count} setValue={setCount} min={1} max={999} />
            <Button mt={2} onClick={handleClick} colorScheme="brandGold">
              Add To Cart
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter display="flex" gap={5}>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="brandGold" mr={3} onClick={handleClick}>
              Add To Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
