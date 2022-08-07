import {
  Flex,
  Spacer,
  Divider,
  Button,
  IconButton,
  HStack,
  Link,
  Input,
  Box
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
import { HIDDEN_SIDEBAR_PATHS, NAVBAR_HEIGHT } from '@common/constants';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  const isHiddenSidebar =
    HIDDEN_SIDEBAR_PATHS.some((path) => path.test(router.pathname)) ||
    (!isLoading && !user);

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

      <Hide hide={!isHiddenSidebar}>
        <ToggleDark />
      </Hide>
      <ButtonLink href="/search?type=flight" colorScheme="brandGold">
        Book A Flight
      </ButtonLink>

      {isHiddenSidebar && !isLoading && user && (
        <>
          <Divider orientation="vertical" />
          <Box w="200px">
            <UserMenu variant="button" />
          </Box>
        </>
      )}

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
