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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
  }, [data, dispatch, getMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [otherUser.messages.length]);

  return (
    <Flex direction="column" justify="space-between" h="100%" w="100%">
      <Flex direction="column" overflowY="scroll">
        {otherUser?.messages.map((message, index) => {
          return (
            message && (
              <HStack
                ref={
                  index === otherUser.messages.length - 1
                    ? messagesEndRef
                    : null
                }
                spacing={2}
                align="center"
                p={2}
                m={3}
                borderRadius="md"
                key={message.id}
                bgColor={
                  message.from?.id === otherUser.id ? 'blue.500' : 'gray.200'
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
                  <Text>{dayjs(message.createdAt).format('HH:mm')}</Text>
                </Box>
                <Avatar src={message.from?.avatar} size="xs" />
              </HStack>
            )
          );
        })}
      </Flex>

      <Box bg="gray.100">
        <ChatInput otherUserId={otherUser.id!} />
      </Box>
    </Flex>
  );
};

export default withApollo(ChatArea);
