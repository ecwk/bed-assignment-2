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

import { Logo } from './';
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
          <Logo />
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
        <HStack>
          <Indicator
            label={cart.length === 0 ? '' : cart.length}
            size={cart.length === 0 ? 0 : 16}
            color="red"
          >
            <IconButton
              variant="ghost"
              icon={<AiOutlineShoppingCart size="20px" />}
              aria-label="Shopping Cart"
            />
          </Indicator>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  colorScheme="gray"
                  fontSize="12px"
                  fontWeight="700"
                >
                  <Flex alignItems="center" gap={2}>
                    <Avatar size="sm" name={user.username} />
                    {/* <ProfileAvatar user={user} size="sm" /> */}
                    <Text as="span" ml={2} mr={1} verticalAlign="middle">
                      {user.username}
                    </Text>
                    {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
                  </Flex>
                </MenuButton>
                <MenuList p={3} borderRadius="2xl">
                  <NextLink href="/dashboard" passHref>
                    <MenuItem borderRadius="xl" minH="45px">
                      Dashboard
                    </MenuItem>
                  </NextLink>
                  <MenuDivider />
                  <MenuItem
                    borderRadius="xl"
                    minH="45px"
                    icon={<MdExitToApp size="20px" />}
                    onClick={() => {
                      logout();
                    }}
                    fontWeight="500"
                    color="#EB5757"
                    _hover={{
                      backgroundColor: '#eb575726'
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
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
