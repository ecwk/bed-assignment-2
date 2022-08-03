import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Spacer,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode
} from '@chakra-ui/react';
import {
  SearchIcon,
  SettingsIcon,
  MinusIcon,
  AddIcon,
  ChevronRightIcon,
  HamburgerIcon
} from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { BiUser, BiSupport } from 'react-icons/bi';
import { MdFlight } from 'react-icons/md';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { RiBuilding3Fill } from 'react-icons/ri';
import { VscBell } from 'react-icons/vsc';

import {
  Logo,
  ProfileAvatar,
  ToggleDark,
  Link,
  hideSidebarPaths,
  ButtonLink,
  UserMenu,
  CartMenu
} from '@common/components';
import { useAuth } from '@modules/auth';
import { useEffect } from 'react';

type SidebarNavItem = {
  icon: React.ReactElement;
  name: string;
  href: string;
  iconSpacing?: string | number;
};

const sidebarNavItems: SidebarNavItem[] = [
  {
    icon: <MdFlight fontSize="20px" />,
    name: 'Flights',
    href: '/search?type=flight',
    iconSpacing: 5
  },
  {
    icon: <RiBuilding3Fill fontSize="20px" />,
    name: 'Airports',
    href: '/search?type=airport',
    iconSpacing: 5
  },
  {
    icon: <FaUsers fontSize="20px" />,
    name: 'Users',
    href: '/search?type=user',
    iconSpacing: 5
  }
  // {
  //   icon: <BiUser fontSize="20px" />,
  //   name: 'Profile',
  //   href: '/settings/account/profile',
  //   iconSpacing: 5
  // },
  // {
  //   icon: <SettingsIcon fontSize="15px" />,
  //   name: 'Settings',
  //   href: '/settings',
  //   iconSpacing: 6
  // }
];

const variants: Variants = {
  hidden: {
    opacity: 0,
    x: -200
  },
  open: {
    opacity: 1,
    x: 0
  }
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = () => setIsOpen((prev) => !prev);
  const isHiddenSidebar = hideSidebarPaths.some((path) =>
    path.test(router.pathname)
  );

  const allowNotifications = () => {
    if ('Notification' in window) {
      return Notification.requestPermission();
    }
  };

  useEffect(() => {
    if (isOpen && shouldFocus) {
      searchRef.current?.focus();
      setShouldFocus(false);
    }
  }, [isOpen, searchRef, shouldFocus]);

  return isHiddenSidebar ? (
    <></>
  ) : (
    <AnimatePresence initial={false} exitBeforeEnter={false}>
      {isOpen ? (
        <Flex
          className="sidebar-opened"
          key="open"
          as={motion.aside}
          variants={variants}
          initial="hidden"
          animate="open"
          gridArea="sidebar"
          flexDir="column"
          alignItems="center"
          gap={6}
          p={5}
          borderRight="1px solid"
          borderColor="whiteAlpha.300"
        >
          <HStack justifyContent="space-between" w="100%">
            <Link href="/">
              <Logo size={0.6} ml="-20px" />
            </Link>
            <Tooltip label="Minimise" placement="bottom-end">
              <IconButton
                variant="outline"
                aria-label="minimise"
                icon={<HamburgerIcon />}
                onClick={handleToggle}
              />
            </Tooltip>
          </HStack>

          <Divider />

          <InputGroup>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input
              ref={searchRef}
              variant="filled"
              placeholder="Search"
              colorScheme="green"
            />
          </InputGroup>

          {sidebarNavItems.map(({ name, icon, href, iconSpacing }) => (
            <ButtonLink
              isActive={router.asPath === href}
              w="100%"
              variant="ghost"
              key={name}
              href={href}
              leftIcon={icon}
              rightIcon={<ChevronRightIcon fontSize="20px" />}
              justifyContent="flex-start"
              iconSpacing={iconSpacing}
            >
              <Text mr="auto">{name}</Text>
            </ButtonLink>
          ))}

          <Spacer />

          <Button
            w="100%"
            variant="ghost"
            leftIcon={
              colorMode === 'light' ? (
                <IoMdMoon size="18px" />
              ) : (
                <IoMdSunny size="18px" />
              )
            }
            iconSpacing={5}
            onClick={toggleColorMode}
          >
            <Text mr="auto">
              {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </Button>

          <Divider />

          <UserMenu />
        </Flex>
      ) : (
        <Flex
          className="sidebar-closed"
          as={motion.aside}
          variants={variants}
          initial="hidden"
          animate="open"
          key="closed"
          gridArea="sidebar"
          position="relative"
          flexDir="column"
          alignItems="center"
          gap={6}
          p={5}
          w="max-content"
          borderRight="1px solid"
          borderColor="whiteAlpha.300"
        >
          <Tooltip label="Maximise" placement="bottom-end">
            <IconButton
              variant="outline"
              aria-label="maximise"
              icon={<HamburgerIcon />}
              onClick={handleToggle}
            />
          </Tooltip>

          <Divider />

          <Tooltip label="Search" placement="right-end">
            <IconButton
              as={motion.button}
              variant="ghost"
              aria-label="search"
              icon={<SearchIcon />}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleToggle();
                setShouldFocus(true);
              }}
            />
          </Tooltip>

          {sidebarNavItems.map(({ name, icon, href }) => (
            <Link key={name} href={href}>
              <Tooltip label={name} placement="right">
                <IconButton
                  isActive={router.asPath === href}
                  as={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  icon={icon}
                  aria-label={name}
                  variant="ghost"
                />
              </Tooltip>
            </Link>
          ))}

          <Spacer />

          <Tooltip label="contact support" placement="right">
            <Box
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                aria-label="Contact support"
                icon={<BiSupport />}
                variant="ghost"
                size="md"
              />
            </Box>
          </Tooltip>
          <Tooltip label="notifications" placement="right">
            <Box
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                aria-label="Notifications"
                icon={<VscBell />}
                variant="ghost"
                size="md"
                onClick={allowNotifications}
              />
            </Box>
          </Tooltip>
          <Tooltip label="Cart" placement="right">
            <CartMenu />
          </Tooltip>
          <Tooltip label="Toggle Theme" placement="right">
            <Box as={motion.div}>
              <ToggleDark variant="ghost" />
            </Box>
          </Tooltip>

          <Divider />
        </Flex>
      )}
    </AnimatePresence>
  );
};
