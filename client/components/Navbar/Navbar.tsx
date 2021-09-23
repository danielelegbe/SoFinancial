import { Box, Flex, Link } from '@chakra-ui/layout';
import { Heading, Progress } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useMeQuery } from '../../generated/graphql';
import withApollo from '../../lib/withApollo';
import styles from './Navbar.module.css';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const { data, loading, error } = useMeQuery();
  if (data) console.log(data);

  return (
    <Flex as={'header'} maxH="80px" boxShadow="md" mb={5}>
      <Box p={4} pl={20}>
        <Link as={NextLink} href="/">
          <Heading textDecor="underline" size="xl" as="h1">
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

        {!data?.me && (
          <Link as={NextLink} href="/register">
            Register
          </Link>
        )}
        {!data?.me && (
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
      </Flex>
    </Flex>
  );
};

export default withApollo(Navbar);
