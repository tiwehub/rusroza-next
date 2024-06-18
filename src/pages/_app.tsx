import type { AppProps } from 'next/app';
import withApollo from '@/hooks/with-apollo';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withApollo(MyApp);
