import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
  useColorMode
} from '@chakra-ui/react';
import { MdArrowDropUp, MdArrowDropDown, MdExitToApp } from 'react-icons/md';

import NextLink from 'next/link';
import { useAuth } from '@modules/auth';
import { useCart } from '@common/hooks';

export const UserMenu = () => {
  const { user, logout } = useAuth();

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
              <Avatar size="sm" name={user?.username} />
              {/* <ProfileAvatar user={user} size="sm" /> */}
              <Text as="span" ml={2} mr={1} verticalAlign="middle">
                {user?.username}
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
  );
};
