import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useGetAllPostsQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import Post from './Post';

const PostsSection = () => {
  const { data, loading, error } = useGetAllPostsQuery();
  if (error) return <h1>Error</h1>;
  if (!data || loading) return <h1>Loading</h1>;
  return (
    <VStack spacing={4}>
      <Heading>Forum</Heading>
      {data.getAllPosts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </VStack>
  );
};

export default withApollo(PostsSection);
