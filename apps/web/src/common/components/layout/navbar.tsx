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
  ButtonLink,
  CustomBreadcrumb
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
      gridArea="navbar"
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
      <CustomBreadcrumb />

      <Spacer />

      <ButtonLink href="/search?type=flight" colorScheme="brandGold">
        Book A Flight
      </ButtonLink>

      {!user && (
        <>
          <Divider orientation="vertical" />
          <HStack gap={3}>
            <ButtonLink href="/login" variant="outline">
              Login
            </ButtonLink>
            <ButtonLink href="/signup">Sign Up</ButtonLink>
          </HStack>
        </>
      )}
    </Flex>
  );
};
