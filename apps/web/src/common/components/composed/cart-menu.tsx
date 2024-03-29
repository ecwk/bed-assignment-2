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
  ComponentWithAs,
  Button,
  ButtonProps,
  Tooltip
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
import { HIDDEN_SIDEBAR_PATHS } from '@common/constants';
import { useRouter } from 'next/router';
import { useAuth } from '@modules/auth';

export type CartMenuProps = BoxProps & {
  variant?: 'button' | 'icon';
  buttonProps?: ButtonProps;
};

export const CartMenu = React.forwardRef<HTMLDivElement, CartMenuProps>(
  ({ variant = 'button', buttonProps }, ref) => {
    const { isLoading, user } = useAuth();
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
      useCart();
    const router = useRouter();

    const isHiddenSidebar =
      HIDDEN_SIDEBAR_PATHS.some((path) => path.test(router.pathname)) ||
      (!isLoading && !user);

    return (
      <Menu
        placement="top-start"
        offset={
          !isHiddenSidebar && variant === 'button'
            ? [200, -20]
            : variant === 'icon'
            ? [40, -20]
            : undefined
        }
      >
        {variant === 'button' ? (
          <MenuButton
            as={Button}
            leftIcon={
              <Indicator
                label={cart.length === 0 ? '' : cart.length}
                size={cart.length === 0 ? 0 : 16}
                color="red"
                offset={-10}
              >
                <AiOutlineShoppingCart size="20px" />
              </Indicator>
            }
            {...buttonProps}
          >
            <Text mr="auto" w="max-content">
              Shopping Cart
            </Text>
          </MenuButton>
        ) : (
          <Tooltip label="Cart" placement="right">
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
          </Tooltip>
        )}

        <MenuList
          zIndex={1000}
          pt={4}
          pb={6}
          px={6}
          borderRadius="xl"
          minW="300px"
          backgroundColor="modal-bg"
          maxH="400px"
          overflowY="auto"
          //  hidescroolbar
          sx={{
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
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
              <Link
                href="/cart"
                fontSize="sm"
                color="link-color-blue"
                mb="3px"
                underline
              >
                View All
              </Link>
            </Box>
            {cart.map(({ id, name, price, quantity }) => (
              <Flex key={id} flexDir="column" mt={4}>
                <Heading size="md">
                  {name} <Text as="span">x {quantity}</Text>
                </Heading>
                <Text color="label-color">
                  ${(price * quantity).toFixed(2)}
                </Text>
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
