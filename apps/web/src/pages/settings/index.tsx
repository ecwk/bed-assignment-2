import {
  Box,
  Flex,
  Grid,
  GridItem,
  Img,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';

import { Title, Main, H2, H3, Link } from '@common/components';
import { SETTINGS_ITEMS } from '@common/constants';

const Settings: NextPage = () => {
  const itemBorderColor = useColorModeValue('brandGray.200', 'brandGray.600');

  return (
    <Main
      w="100%"
      mx="auto"
    >
      <Title
        mt={10}
        title="Settings"
        subtitle="Change your application settings here"
      />
      {SETTINGS_ITEMS.map(({ name, href, links }, index) => {
        return (
          <Box mt={5} as="article" key={`${name}-${index}`}>
            <H2>
              <Link href={href} underline icon>
                {name}
              </Link>
            </H2>
            <Grid
              mt={5}
              gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={5}
              as="ul"
            >
              {links.map(({ name, src, href }, i) => (
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
          </Box>
        );
      })}
    </Main>
  );
};

export default Settings;
