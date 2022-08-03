import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Heading,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { AiFillHome } from 'react-icons/ai';

import { Link } from '@common/components';

export const CustomBreadcrumb = () => {
  const router = useRouter();
  const paths = router.pathname.split('/').filter((path) => path !== '');

  return (
    <Breadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
      sx={{
        '& > *': {
          display: 'flex',
          alignItems: 'center'
        }
      }}
    >
      <BreadcrumbItem>
        <Link
          display="flex"
          alignItems="center"
          gap={4}
          href="/"
          mb="2px"
          underline
        >
          <AiFillHome fontSize="20px" />
          <Text mt="2px">Home</Text>
        </Link>
      </BreadcrumbItem>
      {paths.map((path, i) => (
        <BreadcrumbItem
          key={`breadcrumb-${i}`}
          fontWeight={i === paths.length - 1 ? 'bold' : 'normal'}
          color={i === paths.length - 1 ? 'brandGold.200' : undefined}
        >
          <Link
            href={
              paths.length === 1 ? '#' : `/${paths.slice(0, i + 1).join('/')}`
            }
            underline
          >
            {capitalize(path)}
          </Link>
          {i === 0 && paths.length <= 1 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
