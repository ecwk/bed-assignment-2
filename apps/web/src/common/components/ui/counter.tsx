import { Flex, FlexProps, IconButton, Text } from '@chakra-ui/react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

type CounterProps = FlexProps & {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min?: number;
  max?: number;
  step?: number;
};

export const Counter = ({
  value,
  setValue,
  min,
  max,
  step = 1,
  ...flexProps
}: CounterProps) => {
  const handleIncrement = () => {
    if (value < max) {
      setValue(value + step);
    }
  };
  const handleDecrement = () => {
    if (value > min) {
      setValue(value - step);
    }
  };

  return (
    <Flex w="100%" justifyContent="space-between" {...flexProps}>
      <IconButton
        onClick={handleIncrement}
        aria-label="Increase Quantity"
        size="sm"
        borderRightRadius="0"
      >
        <AiOutlinePlus />
      </IconButton>
      <Flex
        background="blackAlpha.200"
        w="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text>{value}</Text>
      </Flex>
      <IconButton
        onClick={handleDecrement}
        aria-label="Decrease Quantity"
        size="sm"
        borderLeftRadius="0"
      >
        <AiOutlineMinus />
      </IconButton>
    </Flex>
  );
};
