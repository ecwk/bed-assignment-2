import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  HStack,
  Box,
  MenuGroup,
  Heading,
  BoxProps,
  MenuProps,
  ComponentWithAs
} from '@chakra-ui/react';
import {
  AiOutlineShoppingCart,
  AiFillDelete,
  AiOutlinePlus,
  AiOutlineMinus
} from 'react-icons/ai';
import { Indicator } from '@mantine/core';
import React from 'react';

import { useCart } from '@common/hooks';
import { Link } from '@common/components';
import { motion } from 'framer-motion';

// type Props = {
//   menuType: 'primary' | 'secondary'
// }

// // defined type using chakra ComponentWithAs
// type MenuCompoundType = ComponentWithAs<'div', Props> & {
//   Item?: typeof Item
// }

// export const Menu: MenuCompoundType = forwardRef(({ children, ...restProps }, ref) => {
//   // ... do my stuff
//   return (
//     <Box>{children}</Box>
//   )
// })

type CartMenuProps = {};

export const CartMenu = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
      useCart();

    return (
      <Menu>
        <Box
          as={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          ref={ref}
        >
          <Indicator
            label={cart.length === 0 ? '' : cart.length}
            size={cart.length === 0 ? 0 : 16}
            color="red"
          >
            <MenuButton
              as={IconButton}
              variant="ghost"
              icon={<AiOutlineShoppingCart size="20px" />}
              aria-label="Shopping Cart"
            />
          </Indicator>
        </Box>

        <MenuList pt={4} pb={6} px={6} borderRadius="xl" minW="300px">
          <MenuGroup>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              px={2}
            >
              <Heading size="xs" fontWeight="semibold">
                My Cart{' '}
                <Text as="span" color="gray.500">
                  ({cart.length})
                </Text>
              </Heading>
              <Link href="/cart" fontSize="sm" color="blue.300" mb="3px">
                View All
              </Link>
            </Box>
            {cart.map(({ id, name, price, quantity }) => (
              <Flex key={id} flexDir="column" mt={4}>
                <Heading size="md">
                  {name} <Text as="span">x {quantity}</Text>
                </Heading>
                <Text color="gray.400">${(price * quantity).toFixed(2)}</Text>
                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Increase Quantity"
                      size="sm"
                      onClick={() => increaseQuantity(id)}
                    >
                      <AiOutlinePlus />
                    </IconButton>
                    <IconButton
                      aria-label="Decrease Quantity"
                      size="sm"
                      onClick={() => decreaseQuantity(id)}
                    >
                      <AiOutlineMinus />
                    </IconButton>
                  </HStack>
                  <IconButton
                    aria-label="Remove from Cart"
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeFromCart(id)}
                  >
                    <AiFillDelete />
                  </IconButton>
                </Flex>
              </Flex>
            ))}
            {cart.length === 0 && (
              <Text textAlign="center" fontSize="sm" color="gray.300">
                Your cart is empty
              </Text>
            )}
          </MenuGroup>
        </MenuList>
      </Menu>
    );
  }
);
