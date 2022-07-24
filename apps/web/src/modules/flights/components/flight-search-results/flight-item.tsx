import dayjs from 'dayjs';
import { Flex, Text, Button, FlexProps } from '@chakra-ui/react';

import { getMs } from '@common/utils';
import { type Flight } from '@common/types';

type FlightItemProps = FlexProps & {
  flight: Flight;
};

export const FlightItem = ({ flight, ...flexProps }: FlightItemProps) => {
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

  return (
    <Flex
      key={flightId}
      borderTop="1px solid"
      borderColor="gray.600"
      py={10}
      px={5}
      justifyContent="space-between"
      {...flexProps}
    >
      <Flex flexDir="column" px={16}>
        <Text fontSize="lg">{flightCode}</Text>
        <Text>{aircraftName}</Text>
        <Text color="gray">
          {departDateTime.format('HH:mm')} - {arrivalDateTime.format('HH:mm')}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="green.200">
          ${price}
        </Text>
      </Flex>
      <Flex flexDir="column" justifyContent="end">
        <Button>Add To Cart</Button>
      </Flex>
    </Flex>
  );
};
