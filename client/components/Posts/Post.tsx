import { ChatIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { GetAllPostsQuery } from '../../generated/graphql';
import Link from 'next/link';
import dayjs from 'dayjs';

const Post = (post: GetAllPostsQuery['getAllPosts'][0]) => {
  return (
    <Stack
      borderRadius="md"
      spacing={3}
      boxShadow="lg"
      w="90%"
      py={10}
      px={6}
      direction="column"
      justify="space-evenly"
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
          size="md"
          color="blue.700"
          as="a"
          _hover={{ textDecoration: 'underline' }}
        >
          {post.title}
        </Heading>
      </Link>
      <Box as="section">
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
      <Text>{dayjs(post.createdAt).format('DD MMMM YYYY HH:mm')}</Text>
    </Stack>
  );
};

export default Post;
