import { AppProps } from 'next/app';
import Error from 'next/error';
import 'antd/dist/antd.css';
import './styles.css';
import { LoadingAuth } from 'components/loadingAuth/loadingAuth';
import { ContextProvider } from 'context/contextProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }

  return (
    <ContextProvider>
      <LoadingAuth Component={Component} pageProps={pageProps} />
    </ContextProvider>
  );
};

export default MyApp;
