import {
  Flex,
  Grid,
  VStack,
  Box,
  Heading,
  StackProps,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BoxProps,
  Text,
  Link
} from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { capitalize } from 'lodash';

export const CustomBreadcrumb = () => {
  const router = useRouter();
  const paths = router.pathname.split('/').filter((path) => path !== '');

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {paths.map((path, i) => (
        <BreadcrumbItem
          key={`breadcrumb-${i}`}
          fontWeight={i === paths.length - 1 ? 'semibold' : 'normal'}
          fontSize={i === paths.length - 1 ? '3xl' : 'md'}
          color={i === paths.length - 1 ? 'brandGold.200' : 'gray.300'}
          textDecoration={i === paths.length - 1 ? 'underline' : 'none'}
        >
          <BreadcrumbLink as={NextLink} href="/settings" passHref>
            <Link>{capitalize(path)}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
