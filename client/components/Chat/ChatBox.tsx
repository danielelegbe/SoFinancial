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
import { setOtherUser } from '../../features/chat/chatSlice';
import { useGetUsersQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import AllMessages from './AllMessages';

const ChatBox = () => {
  const dispatch = useDispatch();
  const otherUser = useSelector((state: RootState) => state.chat);

  const { data, loading, error } = useGetUsersQuery({
    fetchPolicy: 'network-only',
  });

  if (error) return <Heading>Error</Heading>;
  if (!data || loading)
    return (
      <Flex data-testid="chat-box" justify="center" align="center">
        <CircularProgress color="blue.500" isIndeterminate />
      </Flex>
    );

  const chatChangeHandler = (userId: number) => {
    dispatch(setOtherUser(userId));
  };

  return (
    <Flex
    data-testid="chat-box"
      m="auto"
      colorScheme="gray"
      w="70%"
      h="70vh"
      borderRadius="md"
      boxShadow="md"
    >
      {/* All Chat section */}
      <Stack
        spacing={4}
        w="20%"
        position="relative"
        h="100%"
        borderRadius="md"
        bgColor="blue.500"
      >
        <Heading size="md" mt={4} textAlign="center" color="white">
          Current Chat
        </Heading>
        {data.getUsers.map((user) => {
          return (
            <Flex key={user.id} p={5}>
              <Flex
                ml={4}
                p={2}
                borderRadius="md"
                align="center"
                boxShadow="md"
                bg={otherUser.id === user.id ? 'blue.300' : 'blue.700'}
                onClick={() => chatChangeHandler(user.id)}
                _hover={{ cursor: 'pointer' }}
                transition="0.2s"
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
      {<AllMessages />}
    </Flex>
  );
};

export default withApollo(ChatBox);
