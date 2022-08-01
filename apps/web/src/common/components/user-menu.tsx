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
import {
  MdArrowDropUp,
  MdArrowDropDown,
  MdExitToApp,
  MdSpaceDashboard
} from 'react-icons/md';
import NextLink from 'next/link';
import { useAuth } from '@modules/auth';
import { useCart } from '@common/hooks';
import { BiUser } from 'react-icons/bi';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { SettingsIcon, CalendarIcon } from '@chakra-ui/icons';

import { Role } from '@common/enum';
import { ProfileAvatar, Hide, Link } from '@common/components';

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
              <Link href="/search">
                <MenuItem
                  borderRadius="xl"
                  minH="45px"
                  ml="2px"
                  icon={<CalendarIcon />}
                  iconSpacing="15px"
                >
                  Book A Flight
                </MenuItem>
              </Link>
            </Hide>

            <Link href="/settings/account/profile">
              <MenuItem
                borderRadius="xl"
                minH="45px"
                icon={<BiUser size="20px" />}
                iconSpacing="10px"
              >
                Profile
              </MenuItem>
            </Link>

            <Hide hide={user?.role !== Role.ADMIN}>
              <Link href="/dashboard">
                <MenuItem
                  borderRadius="xl"
                  minH="45px"
                  ml="1px"
                  icon={<MdSpaceDashboard size="18px" />}
                >
                  Dashboard
                </MenuItem>
              </Link>
            </Hide>

            <Hide above="lg">
              <Link href="/cart">
                <MenuItem
                  borderRadius="xl"
                  minH="45px"
                  ml="-1px"
                  icon={<AiOutlineShoppingCart size="20px" />}
                >
                  Cart ({cart.length})
                </MenuItem>
              </Link>
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

              <Link href="#support">
                <MenuItem
                  borderRadius="xl"
                  minH="45px"
                  icon={<BiSupport size="18px" />}
                >
                  Support
                </MenuItem>
              </Link>
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

            <Link href="/settings">
              <MenuItem
                borderRadius="xl"
                minH="45px"
                ml="2px"
                icon={<SettingsIcon fontSize="16px" />}
                iconSpacing="13px"
              >
                Settings
              </MenuItem>
            </Link>

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
