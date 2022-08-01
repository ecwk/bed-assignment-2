import {
  Flex,
  Spacer,
  Divider,
  Button,
  IconButton,
  HStack,
  Link,
  Input
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { VscBell } from 'react-icons/vsc';
import { BiSupport } from 'react-icons/bi';

import {
  Logo,
  CartMenu,
  UserMenu,
  ToggleDark,
  Hide,
  ButtonLink
} from '@common/components';
import { useAuth } from '@modules/auth';
import { NAVBAR_HEIGHT } from '@common/constants';

export const Navbar = () => {
  const { user } = useAuth();

  const allowNotifications = () => {
    if ('Notification' in window) {
      return Notification.requestPermission();
    }
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

      <Hide below="md">
        <Input placeholder="search" maxW="350px" />
      </Hide>

      <Hide below="md">
        <Spacer w="0px" />
      </Hide>

      <Hide below="md">
        <HStack spacing={4}>
          <ToggleDark />

          <ButtonLink href="/search" colorScheme="brandGold">
            Book A Flight
          </ButtonLink>

          <Hide below="lg">
            <IconButton
              aria-label="Contact support"
              icon={<BiSupport />}
              variant="ghost"
              size="md"
              ml={4}
            />

            <IconButton
              aria-label="Notifications"
              icon={<VscBell />}
              variant="ghost"
              size="md"
              ml={4}
              onClick={allowNotifications}
            />
          </Hide>
        </HStack>
      </Hide>

      <Hide below="md">
        <Divider orientation="vertical" />
      </Hide>

      {user ? (
        <Flex gap={6}>
          <Hide below="lg">
            <CartMenu />
          </Hide>
          <UserMenu />
        </Flex>
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
