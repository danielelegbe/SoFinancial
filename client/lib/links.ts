import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { store } from '../app/store';
import { setAccessToken } from '../features/user/userSlice';

export const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'access_token',
  isTokenValidOrUndefined: () => {
    const { user } = store.getState();
    const token = user.access_token;

    if (!token) {
      return true;
    }

    try {
      const { exp }: { exp: number } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  },

  fetchAccessToken: () => {
    return fetch('http://localhost:4000/auth/refresh-token', {
      credentials: 'include',
    });
  },
  handleFetch: (access_token) => {
    store.dispatch(setAccessToken(access_token));
  },

  handleError: (err) => {
    // full control over handling token fetch Error
    console.warn('Your refresh token is invalid. Try to relogin');
    console.log(err);
  },
});
export const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

export const authLink = setContext((_, { headers }) => {
  const { user } = store.getState();
  const token = user.access_token;

  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
  };
});
