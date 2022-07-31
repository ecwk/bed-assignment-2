import {
  Flex,
  Spacer,
  Divider,
  Button,
  IconButton,
  HStack,
  Link,
  useColorMode,
  useColorModeValue,
  Input,
  Box
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

import { useAuth } from '@modules/auth';
import { Logo, CartMenu, UserMenu } from './';
import { NAVBAR_HEIGHT } from '@common/constants';

export const Navbar = () => {
  const { user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  const display = {
    base: 'none',
    lg: 'flex'
  };

  return (
    <Flex
      as="nav"
      py={4}
      px={{
        base: 5,
        xl: 10
      }}
      height={NAVBAR_HEIGHT}
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-start' }}
      gap={{
        base: 0,
        sm: 6
      }}
    >
      <NextLink href="/" passHref>
        <Link ml="-15px">
          <Logo size={0.6} />
        </Link>
      </NextLink>
      <Input
        placeholder="search"
        maxW="350px"
        display={{
          base: 'none',
          md: 'block'
        }}
      />
      <Spacer
        display={{
          base: 'none',
          md: 'block'
        }}
      />
      <HStack spacing={4}>
        <IconButton
          variant="outline"
          icon={colorMode === 'light' ? <IoMdMoon /> : <IoMdSunny />}
          aria-label="Toggle dark mode"
          onClick={toggleColorMode}
          display={{
            base: 'none',
            md: 'flex'
          }}
        />
        <NextLink href="/search" passHref>
          <Button
            as={Link}
            layerStyle={colorModeButton}
            display={{
              base: 'none',
              md: 'flex'
            }}
          >
            Book A Flight
          </Button>
        </NextLink>
        <IconButton
          aria-label="Contact support"
          display={display}
          icon={<BiSupport />}
          variant="ghost"
          size="md"
          ml={4}
        />
        <IconButton
          aria-label="Notifications"
          display={display}
          icon={<VscBell />}
          variant="ghost"
          size="md"
          ml={4}
          onClick={() => {
            if (Notification) {
              Notification.requestPermission();
            }
          }}
        />
      </HStack>
      <Divider orientation="vertical" display={display} />
      {user ? (
        <HStack spacing={4}>
          <Box
            display={{
              base: 'none',
              md: 'block'
            }}
          >
            <CartMenu />
          </Box>
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
