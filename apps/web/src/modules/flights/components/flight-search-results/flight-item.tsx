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
  Box,
  Heading
} from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { Flex, Text, Button, FlexProps } from '@chakra-ui/react';

import { useCart } from '@common/hooks';
import { getMs } from '@common/utils';
import { type Flight } from '@common/types';
import { useState } from 'react';

type FlightItemProps = FlexProps & {
  flight: Flight;
};

export const FlightItem = ({ flight, ...flexProps }: FlightItemProps) => {
  const [quantity, setQuantity] = useState('1');
  const { addToCart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
    toast({
      title: 'Added to cart',
      description: `${flightCode} - $${Number(price).toFixed(2)} x ${quantity}`,
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
  };

  return (
    <Flex
      key={flightId}
      // border="1px solid"
      // borderColor="gray.600"
      flexDir="column"
      p={5}
      {...flexProps}
    >
      <Image
        borderRadius="xl"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
      <Heading fontSize="lg">{flightCode}</Heading>
      <Flex flexDir="column">
        <Text>{aircraftName}</Text>
        <Text color="gray">
          {departDateTime.format('HH:mm')} - {arrivalDateTime.format('HH:mm')}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="green.200">
          ${price}
        </Text>
      </Flex>
      <FormControl>
        <FormLabel>Quantity</FormLabel>
        <NumberInput
          size="sm"
          defaultValue={1}
          min={1}
          max={10}
          value={quantity}
          onChange={(value) => setQuantity(value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Button onClick={handleClick} colorScheme="brandGold">
        Add To Cart
      </Button>
      <Button onClick={onOpen} variant="outline">
        View Details
      </Button>
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
            <Button
              colorScheme="brandGold"
              mr={3}
              onClick={() => {
                onClose();
                handleClick();
              }}
            >
              Add To Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
