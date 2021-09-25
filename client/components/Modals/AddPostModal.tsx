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
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreatePostMutation, useMeQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';

const AddPostModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useMeQuery().data;
  const user = data?.me;

  const [createPost] = useCreatePostMutation();

  const router = useRouter();

  const { forumName } = router.query;

  return (
    <>
      {user && (
        <Button
          rightIcon={<SmallAddIcon />}
          ml={5}
          colorScheme="blue"
          size="md"
          onClick={onOpen}
        >
          Add Post
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ title: '', content: '' }}
              onSubmit={async ({ title, content }) => {
                const response = await createPost({
                  variables: {
                    createPostNewPostInput: {
                      content,
                      forum: forumName as string,
                      title,
                    },
                  },
                });
                if (response?.data) {
                  const postId = response.data.createPost.id;
                  router.push(`/forum/${forumName}/${postId}`);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={4} mb={8}>
                    <Field name="title" as={Input} placeholder="Title" />
                    <Field
                      name="content"
                      as={Textarea}
                      placeholder="What would you like to discuss?"
                    />
                    <Button
                      colorScheme="green"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Confirm
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default withApollo(AddPostModal);
