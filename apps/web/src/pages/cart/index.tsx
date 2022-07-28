import {
  Image,
  Heading,
  Divider,
  Flex,
  Text,
  Button,
  Box,
  IconButton,
  VStack,
  Grid
} from '@chakra-ui/react';
import { type NextPage } from 'next';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { useCart } from '@common/hooks';

type CartProps = {};

const Cart: NextPage<CartProps> = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <Flex
      my="80px"
      maxW="1500px"
      w="100%"
      mx="auto"
      justifyContent="space-between"
      gap={10}
    >
      <Flex
        flexGrow={1}
        flexDir="column"
        background="brandPaleBlue.700"
        borderRadius="xl"
        px={10}
        py={5}
        justifyContent="center"
      >
        <Box>
          {cart.length === 0 ? (
            <Heading size="md" color="gray.400" textAlign="center">
              Your cart is empty...
            </Heading>
          ) : (
            <Grid
              gridTemplateColumns="3fr 1fr 1fr 1fr"
              alignItems="center"
              pt={5}
            >
              <Heading size="xs" color="gray.400">
                PRODUCT
              </Heading>
              <Heading size="xs" color="gray.400" textAlign="end">
                QUANTITY
              </Heading>
              <Heading size="xs" color="gray.400" textAlign="end">
                PRICE
              </Heading>
              <Heading size="xs" color="gray.400" textAlign="end">
                TOTAL PRICE
              </Heading>
              {cart.map(
                ({ id, name, description, price, quantity, image }, index) => (
                  <>
                    <Flex
                      key={`checkout-item-${index}`}
                      py={6}
                      borderTop={index === 0 ? 'none' : '1px solid'}
                      borderColor="gray.700"
                      alignItems="center"
                      gap={5}
                    >
                      <Image
                        boxSize="125px"
                        borderRadius="xl"
                        src={image}
                        alt={`Cart item - ${name}`}
                      />
                      <VStack alignItems="flex-start">
                        <Heading size="md">{name}</Heading>
                        <Text color="gray.300" fontSize="sm">
                          {description}
                        </Text>
                        <Flex gap={4} alignItems="center">
                          <Flex justifyContent="space-between">
                            <IconButton
                              onClick={() => decreaseQuantity(id)}
                              aria-label="Decrease Quantity"
                              borderRightRadius="0"
                              size="xs"
                              disabled={quantity === 1}
                            >
                              <AiOutlineMinus />
                            </IconButton>
                            <Flex
                              background="blackAlpha.200"
                              justifyContent="center"
                              alignItems="center"
                              w="100%"
                              px={4}
                            >
                              <Text fontSize="sm">{quantity}</Text>
                            </Flex>
                            <IconButton
                              onClick={() => increaseQuantity(id)}
                              aria-label="Increase Quantity"
                              size="xs"
                              borderLeftRadius="0"
                              disabled={quantity === 10}
                            >
                              <AiOutlinePlus />
                            </IconButton>
                          </Flex>
                          <Button
                            variant="link"
                            color="red.300"
                            fontWeight="normal"
                            textDecoration="underline"
                            textUnderlineOffset="3px"
                            onClick={() => removeFromCart(id)}
                            size="xs"
                          >
                            Remove
                          </Button>
                        </Flex>
                      </VStack>
                    </Flex>
                    <Text textAlign="end">{quantity}</Text>
                    <Text textAlign="end">${price.toFixed(2)}</Text>
                    <Text textAlign="end">
                      ${(price * quantity).toFixed(2)}
                    </Text>
                  </>
                )
              )}
            </Grid>
          )}
        </Box>
      </Flex>
      <Flex
        background="brandPaleBlue.700"
        borderRadius="xl"
        flexBasis="400px"
        p={10}
        flexDir="column"
        justifyContent="space-between"
        maxH="400px"
      >
        <Box>
          <Heading>Checkout</Heading>
          <Divider mt={4} />
          <Flex flexDir="column" gap={1} my={4}>
            <Flex justifyContent="space-between">
              <Text>Subtotal</Text>
              <Text>$200.00</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Taxes</Text>
              <Text>$10.00 GST</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>Shipping</Text>
              <Text>$15.00</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex justifyContent="space-between" mt={4}>
            <Text fontWeight="bold">Total</Text>
            <Text>$235.00</Text>
          </Flex>
        </Box>
        <Button>Checkout</Button>
      </Flex>
    </Flex>
  );
};

const sx = {
  container: {
    my: '80px',
    maxW: '1000px',
    w: '100%',
    p: 10,
    mx: 'auto',
    background: 'brandPaleBlue.700',
    borderRadius: 'xl'
  }
};

export default Cart;
