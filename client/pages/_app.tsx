import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { setUser } from '../features/user/userSlice';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  const progress = new ProgressBar({
    delay: 100,
    color: '#3182ce',
    size: 2,
  });

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);

  // useEffect(() => {
  //   fetch('http://localhost:4000/refresh-token', {
  //     credentials: 'include',
  //     method: 'POST',
  //   }).then(async (response) => {
  //     const { accessToken, id } = await response.json();

  //     store.dispatch(setUser({ accessToken, id }));
  //     setLoading(false);
  //   });
  // }, []);
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
