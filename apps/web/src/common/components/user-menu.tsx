import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useColorMode
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useAuth } from '@modules/auth';
import { useCart } from '@common/hooks';
import { BiUser } from 'react-icons/bi';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { SettingsIcon, CalendarIcon } from '@chakra-ui/icons';
import { MdArrowDropUp, MdArrowDropDown, MdExitToApp } from 'react-icons/md';

import { Role } from '@common/enum';
import { ProfileAvatar, Hide } from '@common/components';

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { colorMode, toggleColorMode } = useColorMode();

  const allowNotifications = () => {
    if ('Notification' in window) {
      return Notification.requestPermission();
    }
  };

  return (
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
              <ProfileAvatar user={user} size="sm" />
              <Text as="span" ml={2} mr={1} verticalAlign="middle">
                {user?.username}
              </Text>
              {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </Flex>
          </MenuButton>

          <MenuList p={3} borderRadius="2xl">
            <Hide above="md">
              <MenuItem
                borderRadius="xl"
                minH="45px"
                ml="2px"
                icon={<CalendarIcon />}
                iconSpacing="15px"
              >
                <NextLink href="/search">Book A Flight</NextLink>
              </MenuItem>
            </Hide>

            <MenuItem
              borderRadius="xl"
              minH="45px"
              icon={<BiUser size="20px" />}
              iconSpacing="10px"
            >
              <NextLink href="/settings/account/profile">Profile</NextLink>
            </MenuItem>

            <Hide hide={user?.role !== Role.ADMIN}>
              <MenuItem borderRadius="xl" minH="45px">
                <NextLink href="/dashboard">Dashboard</NextLink>
              </MenuItem>
            </Hide>

            <Hide above="lg">
              <MenuItem
                borderRadius="xl"
                minH="45px"
                ml="-1px"
                icon={<AiOutlineShoppingCart size="20px" />}
              >
                <NextLink href="/cart">{`Cart (${cart.length})`}</NextLink>
              </MenuItem>
            </Hide>

            <Hide above="lg">
              <MenuDivider />

              <MenuItem
                borderRadius="xl"
                minH="45px"
                onClick={allowNotifications}
                icon={<VscBell size="20px" />}
                iconSpacing="10px"
              >
                Notifications
              </MenuItem>

              <MenuItem
                borderRadius="xl"
                minH="45px"
                icon={<BiSupport size="18px" />}
              >
                <NextLink href="#"> Support</NextLink>
              </MenuItem>
            </Hide>

            <MenuDivider />

            <Hide above="md">
              <MenuItem
                borderRadius="xl"
                minH="45px"
                ml="2px"
                icon={
                  colorMode === 'light' ? (
                    <IoMdMoon size="16px" />
                  ) : (
                    <IoMdSunny size="16px" />
                  )
                }
                iconSpacing="12px"
                onClick={toggleColorMode}
              >
                {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </MenuItem>
            </Hide>

            <MenuItem
              borderRadius="xl"
              minH="45px"
              ml="2px"
              icon={<SettingsIcon fontSize="16px" />}
              iconSpacing="13px"
            >
              <NextLink href="/settings">Settings</NextLink>
            </MenuItem>

            <MenuItem
              onClick={logout}
              borderRadius="xl"
              minH="45px"
              icon={<MdExitToApp size="20px" />}
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
  );
};
