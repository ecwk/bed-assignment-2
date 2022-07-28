import {
  Flex,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Divider,
  Button,
  IconButton,
  Avatar,
  HStack,
  Link,
  useColorMode,
  useColorModeValue,
  Box
} from '@chakra-ui/react';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { Indicator } from '@mantine/core';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdArrowDropUp, MdArrowDropDown, MdExitToApp } from 'react-icons/md';

import { Logo, CartMenu, UserMenu } from './';
import NextLink from 'next/link';
import { useAuth } from '@modules/auth';
import { useCart } from '@common/hooks';
import { NAVBAR_HEIGHT } from '@common/constants';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { cart } = useCart();

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  return (
    <Flex py={4} px={10} height={NAVBAR_HEIGHT} alignItems="center" gap={6}>
      <NextLink href="/" passHref>
        <Link>
          <Logo size={0.6} />
        </Link>
      </NextLink>
      <Spacer />
      <HStack spacing={4}>
        <IconButton
          variant="outline"
          icon={colorMode === 'light' ? <IoMdMoon /> : <IoMdSunny />}
          aria-label="Toggle dark mode"
          onClick={toggleColorMode}
        />
        <NextLink href="/search" passHref>
          <Button as={Link} layerStyle={colorModeButton}>
            Book A Flight
          </Button>
        </NextLink>
        <IconButton
          icon={<BiSupport />}
          aria-label="Notifications"
          variant="ghost"
          size="md"
          ml={4}
        />
        <IconButton
          icon={<VscBell />}
          aria-label="Notifications"
          variant="ghost"
          size="md"
          ml={4}
          onClick={() => {
            Notification.requestPermission();
          }}
        />
      </HStack>
      <Divider orientation="vertical" />
      {user ? (
        <HStack spacing={4}>
          <CartMenu />
          <UserMenu />
        </HStack>
      ) : (
        <HStack gap={3}>
          <NextLink href="/login" passHref>
            <Button as={Link} variant="outline" colorScheme="gray">
              Login
            </Button>
          </NextLink>
          <NextLink href="/signup" passHref>
            <Button as={Link} href="/signup" colorScheme="gray">
              Sign Up
            </Button>
          </NextLink>
        </HStack>
      )}
    </Flex>
  );
};
