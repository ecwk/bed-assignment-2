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
  Grid,
  HStack
} from '@chakra-ui/react';
import { type NextPage } from 'next';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { useCart } from '@common/hooks';
import { ButtonLink } from '@common/components';

type CartProps = {};

const Cart: NextPage<CartProps> = () => {
  return (
    <Flex
      my="80px"
      flexDir={{
        base: 'column',
        lg: 'row'
      }}
      maxW="1500px"
      mx="auto"
      gap={10}
      px={{
        base: 4,
        sm: 5,
        xl: 10
      }}
    >
      <CartList />
      <Summary />
    </Flex>
  );
};

function CartList() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <Flex
      flexGrow={1}
      flexDir="column"
      background="brandPaleBlue.700"
      borderRadius="xl"
      px={10}
      py={5}
      justifyContent="center"
    >
      {cart.length === 0 ? (
        <Heading size="md" color="gray.400" textAlign="center">
          Your cart is empty...
        </Heading>
      ) : (
        <Grid
          gridTemplateColumns="2fr repeat(3, max-content)"
          alignItems="center"
          columnGap={5}
          pt={5}
        >
          <Heading
            size="xs"
            color="gray.400"
            display={{
              base: 'none',
              md: 'block'
            }}
          >
            PRODUCT
          </Heading>
          <Heading
            size="xs"
            color="gray.400"
            textAlign="end"
            display={{
              base: 'none',
              md: 'block'
            }}
          >
            QUANTITY
          </Heading>
          <Heading
            size="xs"
            color="gray.400"
            textAlign="end"
            display={{
              base: 'none',
              md: 'block'
            }}
          >
            PRICE
          </Heading>
          <Heading
            size="xs"
            color="gray.400"
            textAlign="end"
            display={{
              base: 'none',
              md: 'block'
            }}
          >
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
                  gridColumn={{
                    base: '1 / span 4',
                    md: '1'
                  }}
                  flexDir={{
                    base: 'column',
                    md: 'row'
                  }}
                >
                  <Image
                    boxSize="125px"
                    borderRadius="xl"
                    src={image}
                    alt={`Cart item - ${name}`}
                    w={{
                      base: '400px',
                      md: 'auto'
                    }}
                    objectFit="cover"
                  />
                  <VStack alignItems="flex-start" spacing={3}>
                    <Box>
                      <Heading size="md">{name}</Heading>
                      <Text mt={1} color="gray.300" fontSize="sm">
                        {description}.
                      </Text>
                    </Box>
                    <Flex mt="100px" justifyContent="space-between" w="100%">
                      <Flex
                        w="100%"
                        gap={{
                          base: 2,
                          sm: 4
                        }}
                        flexDir={{
                          base: 'column',
                          sm: 'row'
                        }}
                        alignItems={{ base: 'flex-start', sm: 'center' }}
                      >
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
                        <Flex
                          justifyContent="space-between"
                          w="100%"
                          alignItems="center"
                        >
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
                          <Text
                            fontSize="sm"
                            color="gray.300"
                            display={{
                              base: 'block',
                              sm: 'none'
                            }}
                          >
                            ${price.toFixed(2)} / $
                            {(price * quantity).toFixed(2)}
                          </Text>
                        </Flex>
                      </Flex>
                      <Text
                        fontSize="sm"
                        color="gray.300"
                        display={{
                          base: 'none',
                          sm: 'block',
                          md: 'none'
                        }}
                      >
                        ${price.toFixed(2)} / ${(price * quantity).toFixed(2)}
                      </Text>
                    </Flex>
                  </VStack>
                </Flex>
                <Text
                  textAlign="end"
                  display={{
                    base: 'none',
                    md: 'block'
                  }}
                >
                  {quantity}
                </Text>
                <Text
                  textAlign="end"
                  display={{
                    base: 'none',
                    md: 'block'
                  }}
                >
                  ${price.toFixed(2)}
                </Text>
                <Text
                  textAlign="end"
                  display={{
                    base: 'none',
                    md: 'block'
                  }}
                >
                  ${(price * quantity).toFixed(2)}
                </Text>
              </>
            )
          )}
        </Grid>
      )}
    </Flex>
  );
}

function Summary() {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const taxes = subtotal * 0.07;

  return (
    <Flex
      background="brandPaleBlue.700"
      borderRadius="xl"
      flexBasis={{
        base: 0,
        lg: '400px'
      }}
      p={10}
      flexDir="column"
      justifyContent="space-between"
      // maxH="400px"
    >
      <Box>
        <Heading>Checkout</Heading>
        <Divider mt={4} />
        <Flex flexDir="column" gap={1} my={4}>
          <Flex justifyContent="space-between" gap={5}>
            <Text>
              <b>Subtotal</b>
            </Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </Flex>
          <Flex justifyContent="space-between" gap={5}>
            <Text>
              <b>Taxes</b>{' '}
              <Text as="span" color="gray.400" gap={5} whiteSpace="nowrap">
                (GST 7%)
              </Text>
            </Text>
            <Text>${taxes.toFixed(2)}</Text>
          </Flex>
          <Flex justifyContent="space-between" gap={5}>
            <Text>
              <b>Shipping</b>
            </Text>
            <Text textAlign="end" whiteSpace="nowrap">
              Calculated at checkout
            </Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex justifyContent="space-between" mt={4} gap={5}>
          <Text fontWeight="bold">Total</Text>
          <Text>${(subtotal + taxes).toFixed(2)} + Shipping</Text>
        </Flex>
      </Box>
      <ButtonLink
        href={cart.length > 0 ? '/checkout' : '#'}
        mt={10}
        colorScheme="brandGold"
        disabled={cart.length === 0}
        py={5}
        // h="max-content"
      >
        Checkout
      </ButtonLink>
    </Flex>
  );
}

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
