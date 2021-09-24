import { getDataFromTree } from '@apollo/client/react/ssr';
import { Avatar, Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { data } = useMeQuery();
  const user = data?.me;
  return (
    <Flex as={'header'} maxH="80px" boxShadow="md" mb={5}>
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
        <Link as={NextLink} href="/articles">
          Articles
        </Link>
        <Link as={NextLink} href="/forum">
          Forum
        </Link>
        {user ? (
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
        ) : null}
      </Flex>
    </Flex>
  );
};

export default withApollo(Navbar, { getDataFromTree });
