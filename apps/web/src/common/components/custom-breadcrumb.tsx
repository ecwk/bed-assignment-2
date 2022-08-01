import {
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';

export const CustomBreadcrumb = () => {
  const router = useRouter();
  const paths = router.pathname.split('/').filter((path) => path !== '');

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {paths.map((path, i) => (
        <BreadcrumbItem
          key={`breadcrumb-${i}`}
          fontWeight={i === paths.length - 1 ? 'normal' : 'normal'}
          fontSize={i === paths.length - 1 ? 'md' : 'xs'}
          color={i === paths.length - 1 ? 'brandGold.200' : 'gray.300'}
          textDecoration={i === paths.length - 1 ? 'underline' : 'none'}
        >
          <BreadcrumbLink
            as={NextLink}
            href={
              paths.length === 1 ? '#' : `/${paths.slice(0, i + 1).join('/')}`
            }
            passHref
          >
            <Link>{capitalize(path)}</Link>
          </BreadcrumbLink>
          {i === 0 && paths.length <= 1 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
