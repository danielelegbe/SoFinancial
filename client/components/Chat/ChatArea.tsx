import { Avatar, Box, Flex, HStack, Progress, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
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

  if (!data || loading) {
    return (
      <Progress
        justifySelf="center"
        alignSelf="center"
        m="auto"
        color="blue.500"
        isIndeterminate
      />
    );
  }

  return (
    <Flex direction="column" pos="relative" w="100%">
      {data.getMessages?.map((message) => (
        <HStack
          spacing={2}
          align="center"
          p={2}
          m={3}
          borderRadius="md"
          key={message.id}
          bgColor={message.from.id === otherUser.id ? 'blue.700' : 'gray.200'}
          alignSelf={
            message.from.id === otherUser.id ? 'flex-start' : 'flex-end'
          }
        >
          <Box
            fontSize="sm"
            color={message.from.id === otherUser.id ? 'white' : 'black'}
          >
            <Text>{message.content}</Text>
            <Text>{dayjs(message.createdAt).format('DD/MM HH:MM')}</Text>
          </Box>
          <Avatar src={message.from.avatar} size="xs" />
        </HStack>
      ))}
      <ChatInput otherUserId={otherUser.id!} />
    </Flex>
  );
};

export default withApollo(ChatArea);
