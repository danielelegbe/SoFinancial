import { Progress, VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { useGetAllPostsQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import Post from './Post';

const PostsSection = () => {
  const { data, loading, error } = useGetAllPostsQuery({
    fetchPolicy: 'network-only',
  });
  if (error) return <Heading>Error</Heading>;
  if (!data || loading) return <Progress size="sm" isIndeterminate />;
  return (
    <VStack spacing={4} w="70%" mx="auto">
      {data.getAllPosts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </VStack>
  );
};

export default withApollo(PostsSection);
