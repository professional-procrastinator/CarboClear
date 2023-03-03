const { default: Head } = require('next/head');

import Header from '../Header';

const Layout = ({ children }) => {
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
      <div className='container'>
        <div id="popupContainer">

        </div>
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
