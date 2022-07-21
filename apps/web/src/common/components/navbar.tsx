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
  HStack
} from '@chakra-ui/react';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { MdArrowDropUp, MdArrowDropDown, MdExitToApp } from 'react-icons/md';

import { Logo } from './';
import { NAVBAR_HEIGHT } from '@common/constants';
import { useAuth } from '@modules/auth';
import NextLink from 'next/link';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <Flex py={4} px={10} height={NAVBAR_HEIGHT} alignItems="center" gap={6}>
      <Logo />
      <Spacer />
      <HStack spacing={4}>
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
          <Button variant="outline" colorScheme="gray">
            Login
          </Button>
          <Button colorScheme="gray">Sign Up</Button>
        </HStack>
      )}
    </Flex>
  );
};
