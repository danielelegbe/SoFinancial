import { Box, Heading, HStack } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import CreateForumModal from '../../components/Modals/CreateForumModal';
import PostsSection from '../../components/Posts/PostsSection';

const Forum = () => {
  return (
    <Box>
      <Head>
        <title>Forum</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HStack spacing={4} justify="center">
        <Heading textAlign="center">Popular Posts</Heading>
        <CreateForumModal />
      </HStack>
      <PostsSection />
    </Box>
  );
};

export default Forum;
