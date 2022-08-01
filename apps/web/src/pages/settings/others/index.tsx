import { NextPage } from 'next';
import NextLink from 'next/link';
import { Flex, Img, Box, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { capitalize } from 'lodash';

import { Main, Sidebar, Section, navigationItems } from '../index';

type OthersProps = {};

const othersItems = navigationItems.find(
  ({ name }) => name.toLowerCase() === 'others'
);

const Others: NextPage<OthersProps> = ({}) => {
  return (
    <Main>
      <Sidebar />
      <Section
        title="Others"
        subtitle="Manage other settings here"
        display="flex"
        flexDir="column"
        gap={5}
      >
        {othersItems?.links.map(({ name, src, href }, i) => (
          <NextLink key={`navigation-item-link-${i}`} href={href}>
            <Flex
              as={motion.div}
              whileHover={{ scale: 1.05 }}
              flexDir="column"
              border="1px solid"
              borderRadius="lg"
              borderColor="gray.600"
              background="gray.900"
              cursor="pointer"
            >
              <Img
                src={src}
                alt={name}
                borderTopRadius="lg"
                objectFit="cover"
                h="300px"
                backgroundColor="gray.400"
              />
              <Box p={4}>
                <Heading
                  as="h3"
                  size="sm"
                  fontWeight="semibold"
                  color="gray.200"
                >
                  {capitalize(name)}
                </Heading>
              </Box>
            </Flex>
          </NextLink>
        ))}
      </Section>
    </Main>
  );
};

export default Others;
