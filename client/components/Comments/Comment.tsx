import { Avatar, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Maybe } from '../../generated/graphql';
import Link from 'next/link';
interface CommentType {
  __typename?: 'Comment' | undefined;
  id: number;
  content: string;
  createdAt: any;
  author?:
    | Maybe<{
        __typename?: 'User' | undefined;
        id: number;
        username: string;
        avatar: string;
      }>
    | undefined;
}

const Comment = (comment: CommentType) => {
  console.log(comment);
  return (
    <Stack spacing={20} p={12} pb={8} mt="20" boxShadow="md" bgColor="gray.50">
      <Box>{comment.content}</Box>
      <Flex align="center">
        <Link href={`/users/${comment.author?.username}`} passHref>
          <Text
            as="a"
            _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Posted by - {comment.author?.username}
          </Text>
        </Link>
        <Avatar src={comment.author?.avatar} size="xs" ml={2} />
      </Flex>
    </Stack>
  );
};

export default Comment;
