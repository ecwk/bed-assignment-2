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
  useColorMode,
  useDisclosure,
  Collapse
} from '@chakra-ui/react';
import {
  SearchIcon,
  SettingsIcon,
  MinusIcon,
  AddIcon,
  ChevronRightIcon,
  HamburgerIcon,
  ChevronDownIcon
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
  ButtonLink,
  UserMenu,
  CartMenu,
  ToggleColorButton,
  Hide
} from '@common/components';
import { useAuth } from '@modules/auth';
import { useEffect } from 'react';
import { HIDDEN_SIDEBAR_PATHS, SIDEBAR_ITEMS } from '@common/constants';
import { SidebarItem } from '@common/types';
import { allowNotifications } from '@common/utils';

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
  const searchRef = useRef<HTMLInputElement>(null);
  const { isLoading, user } = useAuth();
  const router = useRouter();

  // Focus search input when click on search icon
  useEffect(() => {
    if (isOpen && shouldFocus) {
      searchRef.current?.focus();
      setShouldFocus(false);
    }
  }, [isOpen, searchRef, shouldFocus]);

  const toggleSize = () => setIsOpen((prev) => !prev);

  const isHiddenSidebar =
    HIDDEN_SIDEBAR_PATHS.some((path) => path.test(router.pathname)) ||
    (!isLoading && !user);

  return (
    <AnimatePresence initial={false} exitBeforeEnter={false}>
      <Hide hide={isHiddenSidebar}>
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
            overflowY="auto"
          >
            <HStack as="header" justifyContent="space-between" w="100%">
              <Link href="/">
                <Logo size={0.6} ml="-20px" />
              </Link>
              <Tooltip label="Minimise" placement="bottom-start">
                <IconButton
                  variant="outline"
                  aria-label="minimise"
                  icon={<HamburgerIcon />}
                  onClick={toggleSize}
                />
              </Tooltip>
            </HStack>

            <Divider />

            <Box as="section">
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
            </Box>

            <VStack as="nav" w="100%">
              {SIDEBAR_ITEMS.map((item, i) => (
                <SidebarItem item={item} key={`sidebar-item-${i}`} />
              ))}
            </VStack>

            <Spacer />

            <VStack as="section" w="100%">
              <CartMenu
                buttonProps={{ w: '100%', variant: 'ghost', iconSpacing: 5 }}
              />
              <ToggleColorButton w="100%" variant="ghost" iconSpacing={5} />
            </VStack>

            <Divider />

            <UserMenu variant="button" />
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
                onClick={toggleSize}
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
                  toggleSize();
                  setShouldFocus(true);
                }}
              />
            </Tooltip>

            {SIDEBAR_ITEMS.map(({ name, icon, href }) => (
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
            {/* <VStack as="nav" w="100%">
              {SIDEBAR_ITEMS.map((item, i) => (
                <SidebarItem item={item} key={`sidebar-item-${i}`} />
              ))}
            </VStack> */}

            <Spacer />

            {/* <Tooltip label="contact support" placement="right">
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
            </Tooltip> */}
            <CartMenu type="icon" />
            <Tooltip label="Toggle Theme" placement="right">
              <Box as={motion.div}>
                <ToggleDark variant="ghost" />
              </Box>
            </Tooltip>

            <Divider />
            <UserMenu variant="icon" />
          </Flex>
        )}
      </Hide>
    </AnimatePresence>
  );
};

const SidebarItem = ({ item }: { item: SidebarItem }) => {
  const router = useRouter();
  const { isAdmin: userIsAdmin, isLoading } = useAuth();
  const { name, href, icon, iconSpacing, nestedItems, isAdmin } = item;

  const isOpen = router.pathname.includes(href);

  const nestedItemsRender = nestedItems?.map((item, i) => {
    return <SidebarItem key={`sidebar-item-${i}`} item={item} />;
  });

  if (isAdmin !== undefined && isAdmin && !isLoading && !userIsAdmin) {
    return <></>;
  }

  return (
    <Box w="100%">
      <ButtonLink
        w="100%"
        variant="ghost"
        leftIcon={icon}
        iconSpacing={iconSpacing}
        isActive={router.asPath === href}
        nextLinkProps={{
          shallow: true
        }}
        href={href}
        rightIcon={nestedItems && <ChevronRightIcon />}
      >
        <Text mr="auto">{name}</Text>
      </ButtonLink>
      {nestedItems && (
        <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
          <VStack
            mt={2}
            ml={6}
            pl={2}
            borderLeft="1px solid"
            borderColor="brandGray.600"
          >
            {nestedItemsRender}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};
