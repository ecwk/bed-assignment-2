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
  Img,
  IconButton,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import NextImage from 'next/image';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getMs } from '@common/utils';
import { FlightItemModal } from './flight-item-modal';
import { Counter } from '@common/components';
import { useCart } from '@common/hooks';
import { useAuth } from '@modules/auth';
import { type Flight, type Airport } from '@common/types';

type FlightItemProps = FlexProps & {
  flight: Flight;
  isTwoWay: boolean;
  isDirect: boolean;
  originAirport: Airport;
  destinationAirport: Airport;
};

export const FlightItem = ({
  flight,
  isTwoWay,
  isDirect,
  originAirport,
  destinationAirport,
  ...flexProps
}: FlightItemProps) => {
  const [quantity, setQuantity] = useState(1);
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
  const mockImage = 'https://random.imagecdn.app/500/500';

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
        quantity: quantity,
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
      borderColor="gray.600"
      {...flexProps}
      background="gray.900"
    >
      <Image borderTopRadius="xl" src={mockImage} alt="flight booking" />
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
        <Flex className="item-content">
          <Box className="item-details" flexGrow="1" mt={4}>
            <Heading size="md">{originAirport.name}</Heading>
            <Text>{dayjs(departureDate).format('ddd, DD MMM YYYY')}</Text>
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
            <Counter
              mt={4}
              maxW="150px"
              size="sm"
              value={quantity}
              setValue={setQuantity}
              min={1}
              max={999}
            />
          </Box>
          <Flex
            className="item-buttons"
            flexShrink={-1}
            flexDir="column"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <IconButton
              aria-label="add to cart"
              width="max-content"
              // colorScheme="brandGold"
              mt={2}
              size="lg"
              onClick={handleClick}
              variant="ghost"
            >
              <AiOutlineShoppingCart size={40} />
            </IconButton>
            <Flex alignItems="flex-end" mt={2} gap={1}>
              <Text
                color="gray.500"
                textAlign="end"
                fontSize="lg"
                // fontWeight="bold"
                h="max-content"
              >
                $
              </Text>
              <Text as="span" fontSize="2xl" fontWeight="normal">
                {Number(price).toFixed(2)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <FlightItemModal
        isOpen={isOpen}
        onClose={onClose}
        addToCart={handleClick}
        quantity={quantity}
        setQuantity={setQuantity}
        flight={flight}
        isTwoWay={isTwoWay}
        isDirect={isDirect}
        originAirport={originAirport}
        destinationAirport={destinationAirport}
        src={mockImage}
      />
    </Flex>
  );
};
