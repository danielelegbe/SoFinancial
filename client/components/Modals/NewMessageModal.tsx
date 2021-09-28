import { ChatIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setOtherUser } from '../../features/chat/chatSlice';
import { useSendMessageMutation } from '../../generated/graphql';

const NewMessageModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [content, setContent] = useState('');
  const [sendMessage] = useSendMessageMutation();
  const otherUser = useSelector((state: RootState) => state.chat);
  const router = useRouter();
  const dispatch = useDispatch();

  const sendMessageHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    const { data } = await sendMessage({
      variables: {
        sendMessageData: {
          toUserId: otherUser.id!,
          content,
        },
      },
    });
    if (data?.sendMessage) {
      dispatch(setOtherUser(data.sendMessage.to.id));
      router.push('/chat');
    }
  };
  return (
    <Box>
      <Button
        rightIcon={<ChatIcon />}
        colorScheme="blue"
        size="sm"
        onClick={onOpen}
      >
        Start a new chat
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send A Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to say?"
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={sendMessageHandler}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NewMessageModal;
