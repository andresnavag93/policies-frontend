import { useContext } from 'react';

// COMPONENTS
import { Layout } from 'components/layout/layout';
import { Login } from 'components/login/login';

// CONTEXT
import { store } from 'context/contextProvider';

export const LoadingAuth = ({ Component, pageProps }) => {
  const {
    //@ts-ignore
    state: { token },
  } = useContext(store);

  if (token) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  } else {
    return <Login />;
  }
};
