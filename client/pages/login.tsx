import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setAccessToken } from '../features/user/userSlice';

const Login = () => {
  const { access_token } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  if (access_token) router.push('/');
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
            // validate={validationSchema}
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
    </>
  );
};

export default Login;