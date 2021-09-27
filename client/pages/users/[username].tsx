import { getDataFromTree } from '@apollo/client/react/ssr';
import {
  Avatar,
  Box,
  HStack,
  Heading,
  Progress,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetProfileQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import Post from '../../components/Posts/Post';

const UserPage = () => {
  const router = useRouter();

  const { data, loading, error } = useGetProfileQuery({
    variables: {
      getProfileId: {
        username: String(router.query.username),
      },
    },
  });

  if (error) return <Heading>Error</Heading>;

  if (!data?.getProfile || loading) {
    return <Progress isIndeterminate color="blue.500" />;
  }

  const user = data.getProfile;

  return (
    <Flex direction="column" align="center">
      <HStack spacing={4}>
        <Heading as="h2">{user.username}</Heading>
        <Avatar src={user.avatar} />
      </HStack>
      <Heading mt={10} as="h3">
        Posts
      </Heading>
      <Stack align="center">
        {user.posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Stack>
    </Flex>
  );
};

export default withApollo(UserPage, { getDataFromTree });
