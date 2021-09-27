import { CircularProgress, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useGetAllMessagesQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import ChatInput from './ChatInput';

const ChatArea = () => {
  const otherUser = useSelector((state: RootState) => state.chat);

  const { data, loading } = useGetAllMessagesQuery({
    variables: {
      getMessagesOtherUserId: otherUser.id!,
    },
  });

  if (!data || loading)
    return (
      <Flex align="center" justify="center">
        <CircularProgress m="auto" color="blue.500" isIndeterminate />
      </Flex>
    );

  return (
    <Flex direction="column" pos="relative" w="100%">
      {data.getMessages?.map((message) => (
        <Flex
          key={message.id}
          bgColor={message.from.id === otherUser.id ? 'blue.700' : 'gray.50'}
          alignSelf={
            message.from.id === otherUser.id ? 'flex-start' : 'flex-end'
          }
        >
          <Text>{message.content}</Text>
        </Flex>
      ))}
      <ChatInput otherUserId={otherUser.id!} />
    </Flex>
  );
};

export default withApollo(ChatArea);
