import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { setAccessToken } from '../features/user/userSlice';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  const progress = new ProgressBar({
    delay: 100,
    color: '#3182ce',
    size: 2,
  });

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);

  useEffect(() => {
    axios
      .post(
        'http://localhost:4000/auth/refresh-token',
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const { access_token } = response.data;
        store.dispatch(setAccessToken(access_token));
        setLoading(false);
      });
  }, []);
  return (
    !loading && (
      <Provider store={store}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    )
  );
}
export default MyApp;
