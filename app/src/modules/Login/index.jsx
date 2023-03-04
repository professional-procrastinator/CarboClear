import Input from '@/components/Input';
import { useState } from 'react';
import axios from '@/utils/axios';
import styles from './index.module.scss';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const register = async () => {
    setLoading(true);
    const res = await axios.post('/auth/login', {
      email,
      password,
    });

    if (res.data.success) {
      router.push('/home');
    } else {
      setError(res.data.message);
    }

    setLoading(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__card}>
        <h1 className={styles.container__card__heading}>Sign In</h1>
        <form
          className={styles.container__card__form}
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className={styles.container__card__form__inputs}>
            <label
              htmlFor='email'
              className={styles.container__card__form__inputs__for}
            >
              Your <span className={styles.highlight}>email</span>
            </label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder={'Your email'}
              type='email'
              name='email'
              className={styles.container__card__form__inputs__input}
            />
          </div>
          <div className={styles.container__card__form__inputs}>
            <label
              htmlFor='password'
              className={styles.container__card__form__inputs__for}
            >
              Your <span className={styles.highlight}>password</span>
            </label>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type='password'
              placeholder={'Your password'}
              value={password}
              name='password'
              className={styles.container__card__form__inputs__input}
            />
          </div>
          <p className={styles.container__card__form__error}>{error}</p>
          <Button
            style={{
              width: '85%',
              marginTop: '20px',
              height: '54px',
              cursor: loading ? 'not-allowed' : 'pointer',
              backgroundColor: loading
                ? 'var(--primary-light)'
                : 'var(--primary)',
            }}
            onClick={() => {
              if (loading) return;
              register();
            }}
            type='submit'
            className={styles.container__card__form__button}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
