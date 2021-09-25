import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {
  GetPostByIdDocument,
  useDeleteCommentMutation,
} from '../../generated/graphql';

interface PropTypes {
  commentId: number;
}

const DeleteCommentModal = ({ commentId }: PropTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteComment] = useDeleteCommentMutation({
    refetchQueries: [GetPostByIdDocument],
  });

  const deleteCommentHandler = async () => {
    try {
      await deleteComment({
        variables: {
          deleteCommentData: {
            id: commentId,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button ml={5} colorScheme="red" size="xs" onClick={onOpen}>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this comment?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={deleteCommentHandler} colorScheme="red">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCommentModal;
