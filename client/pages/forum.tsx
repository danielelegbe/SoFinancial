import { getDataFromTree } from '@apollo/client/react/ssr';
import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import PostsSection from '../components/Posts/PostsSection';
import { useGetAllPostsQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Forum = () => {
  return <PostsSection />;
};

export default withApollo(Forum);
