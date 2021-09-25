import { ChatIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  GetAllPostsDocument,
  GetPostByIdDocument,
  useCreateCommentMutation,
} from '../../generated/graphql';

interface PropTypes {
  postId: number;
}

const AddCommentModal = ({ postId }: PropTypes) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [content, setContent] = useState('');
  const [addComment] = useCreateCommentMutation({
    refetchQueries: [GetPostByIdDocument],
  });

  const addCommentHandler = async () => {
    await addComment({
      variables: {
        createCommentCreateCommentInput: {
          postId,
          content,
        },
      },
    });
    onClose();
  };

  return (
    <>
      <Button
        rightIcon={<ChatIcon />}
        ml={5}
        colorScheme="blue"
        size="sm"
        onClick={onOpen}
      >
        Add Comment
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add A Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={addCommentHandler}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCommentModal;
