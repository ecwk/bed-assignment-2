import { type Dispatch, type SetStateAction } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Flex, FlexProps, IconButton, Text } from '@chakra-ui/react';

export type CounterProps = FlexProps & {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg' | 'xs';
};

export const Counter = ({
  value,
  setValue,
  min,
  max,
  step = 1,
  size = 'sm',
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
    <Flex justifyContent="space-between" {...flexProps}>
      <IconButton
        onClick={handleDecrement}
        aria-label="Decrease Quantity"
        size={size}
        borderRightRadius="0"
      >
        <AiOutlineMinus />
      </IconButton>
      <Flex
        background="blackAlpha.200"
        justifyContent="center"
        alignItems="center"
        w="100%"
        px={
          {
            xs: '4',
            sm: '4',
            md: '5',
            lg: '6'
          }[size]
        }
      >
        <Text fontSize={size}>{value}</Text>
      </Flex>
      <IconButton
        onClick={handleIncrement}
        aria-label="Increase Quantity"
        size={size}
        borderLeftRadius="0"
      >
        <AiOutlinePlus />
      </IconButton>
    </Flex>
  );
};
