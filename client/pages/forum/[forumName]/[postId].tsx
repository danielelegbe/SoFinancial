import { Heading, Link, Text } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetPostByIdQuery } from '../../../generated/graphql';
import withApollo from '../../../lib/withApollo';
import NextLink from 'next/link';

const FullPost = () => {
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

  if (!data || loading) return <Progress />;

  return <div>{JSON.stringify(data)}</div>;
};

export default withApollo(FullPost);
