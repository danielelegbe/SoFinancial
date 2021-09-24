import { Flex, Heading, Link, Text, Box, Stack } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetPostByIdQuery, useMeQuery } from '../../../generated/graphql';
import withApollo from '../../../lib/withApollo';
import NextLink from 'next/link';
import { Avatar, Button } from '@chakra-ui/react';
import Comment from '../../../components/Comments/Comment';
import DeletePostModal from '../../../components/Modals/DeletePostModal';
import AddCommentModal from '../../../components/Modals/AddCommentModal';

const FullPost = () => {
  const user = useMeQuery().data?.me;
  const router = useRouter();
  const { data, loading, error } = useGetPostByIdQuery({
    variables: { getPostByIdData: { id: Number(router.query.postId) } },
  });

  if (error) {
    return (
      <Heading p={8}>
        Page not found. Go to{' '}
        <Link as={NextLink} href="/">
          <Text
            _hover={{ cursor: 'pointer' }}
            display="inline"
            color="blue.500"
          >
            Home?
          </Text>
        </Link>
      </Heading>
    );
  }

  if (!data || loading) return <Progress size="sm" isIndeterminate />;
  const post = data.getPostById!;
  return (
    <Box>
      <Stack spacing={20} px={12} pb={8} mt="20" boxShadow="md">
        <Stack>
          <Heading textColor="blue.700">{post.title}</Heading>
        </Stack>
        <Box>{post.content}</Box>
        <Flex align="center">
          <NextLink href={`/users/${post.author?.username}`} passHref>
            <Text
              as="a"
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Posted by - {post.author?.username}
            </Text>
          </NextLink>
          <Avatar src={post.author?.avatar} size="xs" ml={2} />

          {user?.id === post.author?.id ? (
            <DeletePostModal postId={post.id} />
          ) : null}
        </Flex>
      </Stack>
      <Flex ml={12} mt={20} align="center">
        <Heading as="h3">Comments</Heading>
        {user && <AddCommentModal postId={post.id} />}
      </Flex>
      <Stack spacing={10}>
        {post.comments?.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </Stack>
    </Box>
  );
};

export default withApollo(FullPost);
