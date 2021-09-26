import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../features/user/userSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMeLazyQuery } from '../generated/graphql';
import withApollo from '../lib/withApollo';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [meQuery] = useMeLazyQuery();

  return (
    <>
      <Head>
        <title>Register</title>
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
          <Image
            src="/return-on-investment.png"
            width="100%"
            height="100%"
            alt="currency-icon"
          />
          <Text textAlign="center" fontSize="3xl" fontWeight="bold">
            Register
          </Text>
          <Formik
            initialValues={{ username: '', password: '', email: '' }}
            onSubmit={async (values, actions) => {
              const response = await axios.post(
                'http://localhost:4000/auth/register',
                values,
                { withCredentials: true }
              );
              if (response.data) {
                dispatch(setAccessToken(response.data.access_token));
                await meQuery();
                router.push('/forum');
              }

              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Box w="60%">
                <Form>
                  <Stack spacing={5}>
                    <Field name="email" as={Input} placeholder="Email" />
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
                      Register
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

export default withApollo(Register);
