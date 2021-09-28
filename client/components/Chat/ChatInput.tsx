import { ChatIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Circle, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSendMessageMutation } from '../../generated/graphql';

interface PropTypes {
  otherUserId: number;
}

const ChatInput = ({ otherUserId }: PropTypes) => {
  const [text, setText] = useState('');
  const [sendMessage] = useSendMessageMutation({});

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
    });

    setText('');
  };
  return (
    <Flex
      h={12}
      p={6}
      align="center"
      w="90%"
      as="form"
      onSubmit={sendMessageHandler}
    >
      <Input
        borderColor="gray.300"
        mx={4}
        w="100%"
        minWidth="100%"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Circle bg="blue.500" color="white" size="34px" as="button" type="submit">
        <ChatIcon />
      </Circle>
    </Flex>
  );
};

export default ChatInput;
