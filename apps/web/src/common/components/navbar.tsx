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
  useColorModeValue
} from '@chakra-ui/react';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { MdArrowDropUp, MdArrowDropDown, MdExitToApp } from 'react-icons/md';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

import { Logo } from './';
import { NAVBAR_HEIGHT } from '@common/constants';
import { useAuth } from '@modules/auth';
import NextLink from 'next/link';
import { darken } from 'polished';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex py={4} px={10} height={NAVBAR_HEIGHT} alignItems="center" gap={6}>
      <Logo />
      <Spacer />
      <HStack spacing={4}>
        <IconButton
          variant="outline"
          icon={colorMode === 'light' ? <IoMdMoon /> : <IoMdSunny />}
          aria-label="Toggle dark mode"
          onClick={toggleColorMode}
        />
        <Button colorScheme="brand">Book A Flight</Button>
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
        <>
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
        </>
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
