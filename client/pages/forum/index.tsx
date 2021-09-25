import { Box, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import PostsSection from '../../components/Posts/PostsSection';

const Forum = () => {
  return (
    <Box>
      <Head>
        <title>Forum</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Heading textAlign="center">Popular Posts</Heading>
      <PostsSection />
    </Box>
  );
};

export default Forum;
