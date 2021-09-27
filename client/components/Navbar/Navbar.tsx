import { getDataFromTree } from '@apollo/client/react/ssr';
import { Avatar, Box, Button, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import NextLink from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../features/user/userSlice';
import { useMeQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import AllCurrencies from '../Currencies/AllCurrencies';
import Search from '../Search/SearchArticle';
import styles from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await axios.get('http://localhost:4000/auth/logout', {
      withCredentials: true,
    });
    const { access_token } = response.data;

    dispatch(setAccessToken(access_token));
    window.location.href = '/';
  };

  const { data } = useMeQuery();
  const user = data?.me;
  return (
    <Flex
      direction="column"
      pos="sticky"
      w="100vw"
      zIndex="100"
      top={0}
      mb={8}
      left={0}
    >
      <Flex as={'header'} maxH="80px" boxShadow="md" bg="gray.50">
        <Box p={4} pl={20}>
          <Link as={NextLink} href="/">
            <Heading
              textDecor="underline"
              _hover={{ cursor: 'pointer' }}
              size="xl"
              as="h1"
            >
              SoFinancial
            </Heading>
          </Link>
        </Box>
        <Flex
          as="nav"
          align="center"
          justify="space-evenly"
          w="40%"
          m={'auto'}
          className={styles.nav}
        >
          <Link as={NextLink} href="/">
            Home
          </Link>
          {!user && (
            <Link as={NextLink} href="/register">
              Register
            </Link>
          )}
          {!user && (
            <Link as={NextLink} href="/login">
              Login
            </Link>
          )}
          <Link as={NextLink} href="/forum">
            Forum
          </Link>
          {user && (
            <Link as={NextLink} href="/chat">
              Chat
            </Link>
          )}
          {user && (
            <Stack direction="row" spacing={4} justify="center" align="center">
              <NextLink href={`/users/${user.username}`}>
                <Text
                  _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                  as="a"
                >
                  {user.username}
                </Text>
              </NextLink>
              <Avatar size="sm" name={user.username} src={user.avatar} />
            </Stack>
          )}
          <Search />
          {user && (
            <Button onClick={logoutHandler} size="sm">
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
      <AllCurrencies />
    </Flex>
  );
};

export default withApollo(Navbar, { getDataFromTree });
