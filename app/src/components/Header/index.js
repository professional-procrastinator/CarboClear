import useSession from '@/utils/hooks/useSession';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../Button';
import styles from './index.module.scss';

const Header = () => {
  const router = useRouter();
  const { user } = useSession();

  return (
    <div className={styles.header}>
      <div className={styles.header__row}>
        <h1
          className={styles.header__row__heading}
          onClick={() => {
            router.push('/home');
          }}
        >
          CarboClear.
        </h1>
        {!user ? (
          <div className={styles.header__row__actions}>
            <Link href='/login' className={styles.header__row__actions__login}>
              <span>Sign In</span>
            </Link>
            <Button
              style={{ width: '135px', height: '42px', fontSize: '16px' }}
              onClick={() => {
                router.push('/register');
              }}
            >
              Register
            </Button>
          </div>
        ) : (
          <div className={styles.header__row__avatar}>
            <span>{user.initials}</span>
          </div>
        )}
      </div>
      <div className={styles.header__line} />
    </div>
  );
};

export default Header;
