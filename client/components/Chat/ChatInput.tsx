import { ChatIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Circle, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  GetAllMessagesDocument,
  useSendMessageMutation,
} from '../../generated/graphql';

interface PropTypes {
  otherUserId: number;
}

const ChatInput = ({ otherUserId }: PropTypes) => {
  const [text, setText] = useState('');
  const [sendMessage] = useSendMessageMutation();

  const sendMessageHandler: React.FormEventHandler<HTMLDivElement> = async (
    e
  ) => {
    e.preventDefault();

    await sendMessage({
      variables: {
        sendMessageData: {
          content: text,
          toUserId: otherUserId,
        },
      },
      refetchQueries: [GetAllMessagesDocument],
    });

    setText('');
  };
  return (
    <Flex
      align="center"
      pos="absolute"
      bottom="10px"
      left="90px"
      w="40vw"
      as="form"
      onSubmit={sendMessageHandler}
    >
      <Input
        borderColor="gray.400"
        mx={4}
        w="100%"
        minWidth="100%"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Circle bg="blue.500" color="white" size="40px" as="button" type="submit">
        <ChatIcon />
      </Circle>
    </Flex>
  );
};

export default ChatInput;
