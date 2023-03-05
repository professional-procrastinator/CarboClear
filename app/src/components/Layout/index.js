const { default: Head } = require('next/head');
import { useRouter } from 'next/router';
import Header from '../Header';
import styles from './index.module.scss';

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>CarboClear</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
          rel='stylesheet'
        />
      </Head>
      {console.log(router.pathname)}
      <div className={router.pathname !== '/' ? 'container' : styles.container}>
        <div id='popupContainer'></div>
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
