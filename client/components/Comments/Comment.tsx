import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { Maybe, useMeQuery } from '../../generated/graphql';
import DeleteCommentModal from '../Modals/DeleteCommentModal';
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
  const { data } = useMeQuery();
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
        {data?.me?.id === comment?.author?.id && (
          <DeleteCommentModal commentId={comment.id} />
        )}
      </Flex>
    </Stack>
  );
};

export default Comment;
