import {
  Avatar,
  CircularProgress,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  IMessage,
  setAllMessages,
  setOtherUser,
} from '../../features/chat/chatSlice';
import {
  useGetAllMessagesLazyQuery,
  useGetUsersQuery,
} from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import AllMessages from './AllMessages';

const ChatBox = () => {
  const dispatch = useDispatch();
  const otherUser = useSelector((state: RootState) => state.chat);

  const { data, loading, error } = useGetUsersQuery({
    fetchPolicy: 'network-only',
  });

  const [getMessages] = useGetAllMessagesLazyQuery({
    variables: {
      getMessagesOtherUserId: otherUser.id!,
    },

    fetchPolicy: 'network-only',

    onCompleted(data) {
      if (data) dispatch(setAllMessages(data.getMessages as IMessage[]));
    },
  });

  if (error) return <Heading>Error</Heading>;
  if (!data || loading)
    return (
      <Flex justify="center" align="center">
        <CircularProgress color="blue.500" isIndeterminate />
      </Flex>
    );

  const chatChangeHandler = async (userId: number) => {
    dispatch(setOtherUser(userId));
    getMessages();
  };

  return (
    <Flex
      mx="auto"
      bgColor="gray.50"
      w="70vw"
      h="80vh"
      borderRadius="md"
      boxShadow="md"
    >
      {/* All Chat section */}
      <Stack spacing={4} w="20%" h="100%" borderRadius="md" bgColor="blue.500">
        {data.getUsers.map((user) => {
          return (
            <Flex key={user.id} p={5}>
              <Flex
                ml={4}
                p={2}
                borderRadius="md"
                align="center"
                boxShadow="md"
                bg="blue.700"
                onClick={() => chatChangeHandler(user.id)}
                _hover={{ cursor: 'pointer' }}
              >
                <Text
                  _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                  color="white"
                  mr={4}
                >
                  {user.username}
                </Text>
                <Avatar size="sm" src={user.avatar} />
              </Flex>
            </Flex>
          );
        })}
      </Stack>

      {/* Messages Section */}
      {otherUser.id && <AllMessages />}
    </Flex>
  );
};

export default withApollo(ChatBox);
