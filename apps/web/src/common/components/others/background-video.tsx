import { Box, useColorMode } from '@chakra-ui/react';

export const BackgroundVideo = () => {
  const { colorMode } = useColorMode();

  return (
    <Box className="background-video">
      <Box
        className="background-overlay"
        position="fixed"
        zIndex="-1"
        top="0"
        left="0"
        w="100%"
        minH="100%"
        background={
          colorMode === 'dark'
            ? 'linear-gradient(140deg, rgba(28,28,28,1) 0%, rgba(28,28,28,0.6) 60%, #1328417f 100% )'
            : 'linear-gradient(0deg,  #1c1c1c4b 0%, #727272b7 40%, #33656e2b 65%, #e8fdff5f 100% )'
        }
      />
      {colorMode === 'dark' ? (
        <Box
          id="background-dark"
          key="background-dark"
          as="video"
          top="0"
          left="0"
          autoPlay
          loop
          muted
          position="fixed"
          zIndex="-2"
          minW="100%"
          minH="100%"
          objectFit="cover"
        >
          <source
            src="https://cdn.cnoside.dev/bed-assignment-2.deploy.cnoside.dev/background-dark.mp4"
            type="video/mp4"
          />
        </Box>
      ) : (
        <Box
          id="background-light"
          key="background-light"
          as="video"
          top="0"
          left="0"
          autoPlay
          loop
          muted
          position="fixed"
          zIndex="-2"
          minW="100%"
          minH="100%"
          objectFit="cover"
        >
          <source
            src="https://cdn.cnoside.dev/bed-assignment-2.deploy.cnoside.dev/background-light.mp4"
            type="video/mp4"
          />
        </Box>
      )}
    </Box>
  );
};
