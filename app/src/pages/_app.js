import { UserProvider } from '@/utils/hooks/user';
import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
