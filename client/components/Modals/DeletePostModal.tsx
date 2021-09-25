import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  GetForumDocument,
  useDeletePostMutation,
} from '../../generated/graphql';

interface PropTypes {
  postId: number;
}

const DeletePostModal = ({ postId }: PropTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletePost, { client }] = useDeletePostMutation();
  const router = useRouter();

  const deletePostHandler = async () => {
    try {
      await deletePost({
        variables: {
          deletePostId: postId,
        },
        onCompleted: async () => {
          await client.refetchQueries({
            include: [GetForumDocument, 'GetForum'],
          });
        },
      });
      router.push(`/forum/${router.query.forumName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button ml={5} colorScheme="red" size="sm" onClick={onOpen}>
        Delete Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={deletePostHandler} colorScheme="red">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletePostModal;
