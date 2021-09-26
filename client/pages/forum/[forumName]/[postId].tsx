import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { Avatar } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Comment from '../../../components/Comments/Comment';
import AddCommentModal from '../../../components/Modals/AddCommentModal';
import DeletePostModal from '../../../components/Modals/DeletePostModal';
import { useGetPostByIdQuery, useMeQuery } from '../../../generated/graphql';
import withApollo from '../../../lib/withApollo';

const FullPost = () => {
  const user = useMeQuery().data?.me;
  const router = useRouter();
  const { data, loading, error } = useGetPostByIdQuery({
    variables: { getPostByIdData: { id: Number(router.query.postId) } },
  });

  if (error) {
    return (
      <>
        <Head>
          <title>Page not found</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
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
      </>
    );
  }

  if (!data || loading) return <Progress size="sm" isIndeterminate />;
  const post = data.getPostById!;
  return (
    <>
      <Head>
        <title>{post.title}</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mx="auto" w="70%">
        <Stack spacing={20} px={12} py={8} mt="20" boxShadow="md">
          <Stack>
            <Link href={`/forum/${router.query.forumName}`}>
              <Heading
                _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                size="sm"
              >
                {router.query.forumName}
              </Heading>
            </Link>
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
    </>
  );
};

export default withApollo(FullPost);
