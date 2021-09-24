import { useRouter } from 'next/router';
import React from 'react';
import { useGetForumQuery } from '../../../generated/graphql';
import withApollo from '../../../lib/withApollo';
import {
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Text,
  Stack,
  Link,
} from '@chakra-ui/react';
import Post from '../../../components/Posts/Post';
import NextLink from 'next/link';
import { SmallAddIcon } from '@chakra-ui/icons';

const ForumName = () => {
  const router = useRouter();
  const { forumName } = router.query;
  const { data, loading } = useGetForumQuery({
    variables: {
      getForumName: forumName as string,
    },
  });
  if (!data || loading) return <Progress />;
  if (data.getForum == null) {
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
  const forum = data.getForum;
  return (
    <Box mx="10%" mt={8}>
      <Flex>
        <Heading mb={8}>{forum.name}</Heading>
        <Button ml={6} colorScheme="blue" rightIcon={<SmallAddIcon />}>
          Add Post
        </Button>
      </Flex>
      <Stack spacing={4}>
        {forum.posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Stack>
    </Box>
  );
};

export default withApollo(ForumName);
