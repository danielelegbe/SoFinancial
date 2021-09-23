import { ChatIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { GetAllPostsQuery } from '../../generated/graphql';

const Post = (post: GetAllPostsQuery['getAllPosts'][0]) => {
  return (
    <Flex
      borderRadius="md"
      boxShadow="lg"
      w="80%"
      h={'30vh'}
      py={8}
      px={6}
      direction="column"
      justify="space-between"
      align="flex-start"
    >
      <Text size="md" fontWeight="bold">
        {post.forum?.name}
      </Text>
      <Heading size="lg" color="blue.700">
        {post.title}
      </Heading>
      <Box as="section" maxH="50%" overflow="hidden">
        <Text>{post.content}</Text>
      </Box>
      <Flex w="40%" justify="space-between">
        <Text>Posted by - {post.author?.username}</Text>
        {post.comments && (
          <HStack spacing={2} align="center">
            <ChatIcon />
            <Text>
              {post.comments?.length === 1
                ? '1 comment'
                : `${post.comments?.length} comments`}
            </Text>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
};

export default Post;
