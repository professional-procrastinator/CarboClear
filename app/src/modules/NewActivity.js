import styles from './NewActivity.module.scss';
import { useState } from 'react';
import axios from '@/utils/axios';

export default function NewActivityPopup() {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState('');

  const handleActivity = async () => {
    setLoading(true);
    axios.post('/activity', {
      activity,
    })
    setLoading(false);
  };

  return (
    <div className={styles.body}>
      <div className={styles.body__title}>New Activity</div>

      <div className={styles.body__description}>
        What are you planning on doing today? We might be able to help you do it
        in a more eco-friendly way!
      </div>

      <div className={styles.body__form}>
        <textarea
          className={styles.body__form__input}
          type='text'
          placeholder='Your activity'
          onChange={(evt) => setActivity(evt.target.value)}
          value={activity}
        />
      </div>

      <div className={styles.body__footer}>
        <div
          className={styles.body__footer__button}
          style={{
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: loading
              ? 'var(--primary-light)'
              : 'var(--primary)',
          }}
          onClick={() => {
            if (loading) return;

            handleActivity();
          }}
        >
          {loading ? 'Loading...' : 'Proceed'}
        </div>
      </div>
    </div>
  );
}
