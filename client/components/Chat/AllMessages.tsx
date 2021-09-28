import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  addNewMessage,
  IMessage,
  setAllMessages,
} from '../../features/chat/chatSlice';
import {
  useGetAllMessagesLazyQuery,
  useNewMessageSubscription,
} from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import ChatInput from './ChatInput';

const ChatArea = () => {
  const otherUser = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data } = useNewMessageSubscription();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  const [getMessages] = useGetAllMessagesLazyQuery({
    variables: {
      getMessagesOtherUserId: otherUser.id!,
    },

    fetchPolicy: 'network-only',

    onCompleted(data) {
      if (data) dispatch(setAllMessages(data.getMessages as IMessage[]));
    },
  });

  useEffect(() => {
    getMessages();

    data && dispatch(addNewMessage(data?.newMessage as IMessage));
    scrollToBottom();
  }, [data, dispatch, getMessages]);
  return (
    <Flex direction="column" justify="space-between" h="100%" w="100%">
      <Flex direction="column" overflowY="scroll">
        {otherUser?.messages.map(
          (message) =>
            message && (
              <HStack
                spacing={2}
                align="center"
                p={2}
                m={3}
                borderRadius="md"
                key={message.id}
                bgColor={
                  message.from?.id === otherUser.id ? 'blue.700' : 'gray.200'
                }
                alignSelf={
                  message.from?.id === otherUser.id ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  fontSize="sm"
                  color={message.from?.id === otherUser.id ? 'white' : 'black'}
                >
                  <Text>{message.content}</Text>
                  <Text>{dayjs(message.createdAt).format('HH:MM')}</Text>
                </Box>
                <Avatar src={message.from?.avatar} size="xs" />
              </HStack>
            )
        )}
        <Box ref={messagesEndRef} />
      </Flex>

      <Box bg="gray.100">
        <ChatInput otherUserId={otherUser.id!} />
      </Box>
    </Flex>
  );
};

export default withApollo(ChatArea);
