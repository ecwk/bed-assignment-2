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
  Img,
  IconButton,
  VStack,
  Divider
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { FaArrowRight } from 'react-icons/fa';
import { type Dispatch, type SetStateAction } from 'react';

import { AirportTitle } from './airport-title';
import { type Flight, type Airport } from '@common/types';
import { getMs } from '@common/utils';
import { Counter } from '@common/components';

type FlightItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  addToCart: () => void;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  flight: Flight;
  isTwoWay: boolean;
  isDirect: boolean;
  originAirport: Airport;
  destinationAirport: Airport;
  src: string;
};

export const FlightItemModal = ({
  isOpen,
  onClose,
  addToCart,
  quantity,
  setQuantity,
  flight,
  isTwoWay,
  isDirect,
  originAirport,
  destinationAirport,
  src
}: FlightItemModalProps) => {
  const { price } = flight;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent px={5} pt={10} backgroundColor="gray.900">
        <ModalCloseButton />

        <ModalBody>
          <Flex flexDir="column">
            <Image
              objectFit="cover"
              objectPosition="top"
              w="100%"
              h="400px"
              borderRadius="lg"
              src={src}
              alt="flight booking"
            />
            <HStack mt={5}>
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
            <Heading fontSize="3xl" mt={2}>
              {flight.aircraftName} ({flight.flightCode})
            </Heading>
            <Box>
              <Text fontSize="lg">
                {dayjs(flight.departureDate).format('ddd, DD MMM YYYY')}
              </Text>
              <Text fontSize="lg" color="gray">
                {dayjs(flight.departureDate).format('HH:mm a')} -
                {dayjs(flight.departureDate)
                  .add(getMs(flight.travelTime))
                  .format('HH:mm a')}
              </Text>
            </Box>
            <Divider my={4} />
            <Box className="details" maxW="60ch">
              <Heading size="md" fontWeight="normal">
                Additional Details
              </Heading>
              <Text mt={4} color="gray.500">
                <b>Flight code:</b> {flight.flightCode}
              </Text>
              <Text mt={2} color="gray.500">
                <b>Aircraft name:</b> {flight.aircraftName}
              </Text>
              <Text mt={2} color="gray.500">
                <b>Origin airport:</b> {originAirport.name} -{'  '}
                {originAirport.city}, {originAirport.country}
              </Text>
              <Text mt={2} color="gray.500">
                <b>Description</b> {originAirport.description}
              </Text>
              <Text mt={2} color="gray.500">
                <b>Destination airport:</b> {destinationAirport.name} -{'  '}
                {destinationAirport.city} {destinationAirport.country}
              </Text>
              <Text mt={2} color="gray.500">
                <b>Description</b> {destinationAirport.description}
              </Text>
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter display="flex" flexDir="column">
          <Flex mt={2} justifyContent="space-between" w="100%">
            <Counter
              alignSelf="flex-start"
              value={quantity}
              setValue={setQuantity}
              min={1}
              max={99}
              maxW="150px"
              w="100%"
            />
            <Flex alignItems="flex-end" gap={1}>
              <Text
                color="gray.500"
                textAlign="end"
                fontSize="xl"
                // fontWeight="bold"
                h="max-content"
                mb="4px"
              >
                $
              </Text>
              <Text as="span" fontSize="3xl" fontWeight="normal">
                {Number(price).toFixed(2)}
              </Text>
            </Flex>
          </Flex>
          <Button w="100%" mt={5} colorScheme="brandGold" onClick={addToCart}>
            Add To Cart
          </Button>
          <Button w="100%" mt={2} variant="outline" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
