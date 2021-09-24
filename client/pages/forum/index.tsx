import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import PostsSection from '../../components/Posts/PostsSection';

const Forum = () => {
  return (
    <Box>
      <Heading textAlign="center">Forum</Heading>
      <PostsSection />
    </Box>
  );
};

export default Forum;
