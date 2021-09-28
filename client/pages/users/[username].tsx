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
import React, { useEffect } from 'react';
import { useGetProfileQuery, useMeQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import Post from '../../components/Posts/Post';
import Head from 'next/head';
import NewMessageModal from '../../components/Modals/NewMessageModal';
import { setOtherUser } from '../../features/chat/chatSlice';
import { useDispatch } from 'react-redux';

const UserPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error } = useGetProfileQuery({
    variables: {
      getProfileId: {
        username: String(router.query.username),
      },
    },
  });

  useEffect(() => {
    data && dispatch(setOtherUser(data?.getProfile.id));
  }, [data, data?.getProfile.id, dispatch]);

  const { data: meQuery } = useMeQuery();

  if (error) return <Heading>Error</Heading>;

  if (!data?.getProfile || loading) {
    return <Progress isIndeterminate color="blue.500" />;
  }

  const user = data.getProfile;

  return (
    <>
      <Head>
        <title>{user.username}</title>
      </Head>
      <Flex direction="column" align="center">
        <HStack spacing={4}>
          <Heading as="h2">{user.username}</Heading>
          <Avatar src={user.avatar} />
          {meQuery?.me?.id !== user.id && <NewMessageModal />}
        </HStack>
        <Heading mt={10} as="h3">
          Posts
        </Heading>
        <Stack align="center" w="70%">
          {user.posts?.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default withApollo(UserPage, { getDataFromTree });
