import { ChatIcon } from '@chakra-ui/icons';
import {
  Circle,
  CircularProgress,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useGetAllMessagesQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';

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

  console.log(data);
  return (
    <Flex direction="column" pos="relative">
      <Flex align="center" pos="absolute" bottom="10px" left="90px" w="40vw">
        <Input borderColor="gray.400" mx={4} w="100%" minWidth="100%" />
        <Circle bg="blue.500" color="white" size="40px">
          <ChatIcon />
        </Circle>
      </Flex>
    </Flex>
  );
};

export default withApollo(ChatArea);
