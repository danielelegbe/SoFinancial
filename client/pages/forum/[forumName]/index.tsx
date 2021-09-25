import {
  Box,
  Flex,
  Heading,
  Link,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import AddPostModal from '../../../components/Modals/AddPostModal';
import Post from '../../../components/Posts/Post';
import { useGetForumQuery } from '../../../generated/graphql';
import withApollo from '../../../lib/withApollo';

const ForumName = () => {
  const router = useRouter();
  const { forumName } = router.query;
  const { data, loading } = useGetForumQuery({
    variables: {
      getForumName: forumName as string,
    },
  });
  if (!data || loading) return <Progress size="sm" isIndeterminate />;
  if (data.getForum == null) {
    return (
      <>
        <Head>
          <title>Page not Found</title>

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
  const forum = data.getForum;
  return (
    <>
      <Head>
        <title>{forumName}</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mx="10%" mt={8}>
        <Flex>
          <Heading mb={8}>{forum.name}</Heading>
          <AddPostModal />
        </Flex>
        <Stack spacing={4}>
          {forum.posts?.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default withApollo(ForumName);
