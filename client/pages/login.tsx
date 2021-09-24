import {
  Stack,
  Text,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { setAccessToken } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useMeQuery } from '../generated/graphql';
import { RootState } from '../app/store';

const Login = () => {
  const { access_token } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (access_token) router.push('/');
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <Flex justify="center" align="center" h="80vh">
      <Stack
        spacing={6}
        boxShadow="lg"
        w="30%"
        h="80%"
        bgColor="gray.50"
        justify="center"
        align="center"
        direction="column"
      >
        <Text textAlign="center" fontSize="3xl" fontWeight="bold">
          Login
        </Text>
        <Formik
          initialValues={{ username: '', password: '' }}
          //   validate={validationSchema}
          onSubmit={async (values, actions) => {
            const response = await axios.post(
              'http://localhost:4000/auth/login',
              values,
              { withCredentials: true }
            );
            if (response.data) {
              dispatch(setAccessToken(response.data.access_token));
              window.location.href = '/forum';
            }

            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Box w="60%">
              <Form>
                <Stack spacing={5}>
                  <Field name="username" as={Input} placeholder="Username" />
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="Password"
                  />
                  <Button
                    mt={4}
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
                    type="submit"
                    size="md"
                    w="30%"
                    alignSelf="center"
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            </Box>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default Login;
