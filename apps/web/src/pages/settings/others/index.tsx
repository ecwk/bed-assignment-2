import {
  Box,
  Flex,
  Grid,
  GridItem,
  Img,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { type NextPage } from 'next';

import { Main, Title, Link } from '@common/components';
import { SETTINGS_ITEMS } from '@common/constants';

const othersItems = SETTINGS_ITEMS.find(
  ({ name }) => name.toLowerCase() === 'others'
);

const Others: NextPage = () => {
  const itemBorderColor = useColorModeValue('brandGray.200', 'brandGray.600');

  return (
    <Main maxW="1200px" w="100%" mx="auto">
      <Title
        mt={10}
        mb={5}
        title="Others"
        subtitle="Manage other settings here"
      />
      <Grid gap={5}>
        {othersItems?.links.map(({ name, src, href }, i) => (
          <GridItem
            as={motion.li}
            whileHover={{
              y: -5
            }}
            _hover={{
              p: {
                color: 'brandGold.300'
              },
              img: {
                backgroundColor: 'brandGray.300'
              }
            }}
            key={`${name}-${i}`}
          >
            <Link
              display="flex"
              flexDir="column"
              border="1px solid"
              borderColor={itemBorderColor}
              borderRadius="xl"
              href={href}
            >
              <Img
                h="200px"
                objectFit="contain"
                borderTopRadius="xl"
                backgroundColor="brandGray.50"
                src={src}
                alt={name}
              />
              <Flex
                flexDir="column"
                backgroundColor="brandGray.900"
                borderBottomRadius="xl"
                p={4}
              >
                <Text
                  color="brandGray.50"
                  fontSize="lg"
                  fontWeight="semibold"
                  mr={2}
                >
                  {name}
                </Text>
              </Flex>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Main>
  );
};

export default Others;
