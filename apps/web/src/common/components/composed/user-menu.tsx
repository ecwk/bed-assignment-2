import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useColorMode,
  useColorModeValue,
  IconButton,
  Box,
  Tooltip
} from '@chakra-ui/react';
import {
  MdArrowDropUp,
  MdArrowDropDown,
  MdExitToApp,
  MdSpaceDashboard
} from 'react-icons/md';
import { useAuth } from '@modules/auth';
import { useCart } from '@common/hooks';
import { BiUser } from 'react-icons/bi';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {
  SettingsIcon,
  CalendarIcon,
  LockIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';

import { Role } from '@common/enum';
import { ProfileAvatar, Hide, Link } from '@common/components';
import { useRouter } from 'next/router';
import { HIDDEN_SIDEBAR_PATHS } from '@common/constants';
import { Indicator } from '@mantine/core';
import React from 'react';
import { motion } from 'framer-motion';

export type UserMenuProps = {
  variant?: 'button' | 'icon';
};

export const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  ({ variant }, ref) => {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    const backgroundColor = useColorModeValue('brandGray.100', 'brandGray.800');

    const isHiddenSidebar =
      HIDDEN_SIDEBAR_PATHS.some((path) => path.test(router.pathname)) ||
      (!isLoading && !user);

    return (
      <Menu
        offset={
          !isHiddenSidebar && variant === 'button'
            ? [200, -20]
            : variant === 'icon'
            ? [40, -20]
            : undefined
        }
      >
        {({ isOpen }) => (
          <>
            {variant === 'button' ? (
              <MenuButton
                as={Button}
                variant="ghost"
                colorScheme="gray"
                fontSize="12px"
                fontWeight="700"
                w="100%"
                h="60px"
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap={5}
                >
                  <ProfileAvatar
                    user={user}
                    borderRadius="md"
                    w="40px"
                    h="40px"
                  />
                  <Text mr="auto" fontSize="md" fontWeight="Normal">
                    {user?.username}
                  </Text>
                  <ChevronRightIcon fontSize="20px" />
                </Flex>
              </MenuButton>
            ) : (
              <Tooltip label="User" placement="right">
                <MenuButton>
                  <ProfileAvatar
                    user={user}
                    borderRadius="md"
                    w="40px"
                    h="40px"
                  />
                </MenuButton>
              </Tooltip>
            )}

            <MenuList
              zIndex={1000}
              p={3}
              borderRadius="xl"
              backgroundColor={backgroundColor}
            >
              <Hide above="md">
                <Link href="/search?type=flight">
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

              <Hide hide={user?.role !== Role.ADMIN}>
                <Link href="/admin">
                  <MenuItem
                    borderRadius="xl"
                    minH="45px"
                    ml="3px"
                    icon={<LockIcon fontSize="15px" />}
                  >
                    Admin
                  </MenuItem>
                </Link>
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

              <MenuDivider />

              <MenuItem
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
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
  }
);
