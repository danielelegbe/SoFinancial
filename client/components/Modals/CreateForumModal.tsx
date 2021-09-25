import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCreateForumMutation, useMeQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';

const CreateForumModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useMeQuery().data;
  const user = data?.me;

  const [createForum] = useCreateForumMutation();
  const [forumName, setForumName] = useState('');
  const router = useRouter();

  const createForumHandler = async () => {
    await createForum({
      variables: {
        createForumNewForumInput: { name: forumName },
      },
    });
    router.push(`/forum/${forumName}`);
  };

  return (
    <>
      {user && (
        <Button
          ml={5}
          colorScheme="blue"
          rightIcon={<SmallAddIcon />}
          size="md"
          onClick={onOpen}
        >
          Create a forum
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Forum Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Forum name..."
              value={forumName}
              onChange={(e) => setForumName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={createForumHandler}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo(CreateForumModal);
