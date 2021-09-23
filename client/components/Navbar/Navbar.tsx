import { Box, Flex, Link } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <Flex as={'header'} maxH="80px" boxShadow="md">
      <Box p={4} pl={20}>
        <Heading textDecor="underline" size="xl" as="h1">
          SoFinancial
        </Heading>
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
        <Link as={NextLink} href="/register">
          Register
        </Link>
        <Link as={NextLink} href="/login">
          Login
        </Link>
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

export default Navbar;
