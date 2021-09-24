import { ChatIcon } from '@chakra-ui/icons';
import {
  Avatar,
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
import Link from 'next/link';

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
      {post.forum?.name && (
        <Link href={`/forum/${post.forum.name}`} passHref>
          <Text
            as="a"
            size="md"
            fontWeight="bold"
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {post.forum.name}
          </Text>
        </Link>
      )}
      <Link href={`/forum/${post.forum?.name}/${post.id}`} passHref>
        <Heading
          size="lg"
          color="blue.700"
          as="a"
          _hover={{ textDecoration: 'underline' }}
        >
          {post.title}
        </Heading>
      </Link>
      <Box as="section" maxH="50%" overflow="hidden">
        <Text>{post.content}</Text>
      </Box>
      <Flex w="50%" maxW="80%" justify="space-between">
        <Stack
          direction="row"
          spacing={2}
          mr={4}
          align="center"
          justify="center"
        >
          <Link href={`/users/${post.author?.username}`} passHref>
            <Text flex={1} as="a" _hover={{ textDecoration: 'underline' }}>
              Posted by - {post.author?.username}
            </Text>
          </Link>
          <Avatar src={post.author?.avatar} size="xs" />
        </Stack>

        {post.comments && (
          <HStack flex={1} spacing={2} align="center">
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
