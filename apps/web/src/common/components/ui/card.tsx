import { Flex, Img, Text, type FlexProps } from '@chakra-ui/react';

export type CardProps = FlexProps & {};

export const Card = () => {
  return (
    <Flex>
      <Img
        h="200px"
        objectFit="contain"
        borderTopRadius="xl"
        backgroundColor="brandGray.50"
        src={src}
        alt={name}
      />
      <Flex
        flexDir="column"
        backgroundColor="brandGray.900"
        borderBottomRadius="xl"
        p={4}
      >
        <Text color="brandGray.50" fontSize="lg" fontWeight="semibold" mr={2}>
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};
