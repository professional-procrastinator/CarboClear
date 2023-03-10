import styles from './NewActivity.module.scss';
import { useState, useRef, useEffect } from 'react';
import axios from '@/utils/axios';
import useSession from '@/utils/hooks/useSession';

export default function NewActivityPopup({ popupState }) {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState('');
  const inputRef = useRef(null);
  const { updateUser } = useSession();

  const handleActivity = async () => {
    if (loading) return;
    setLoading(true);
    const { data } = await axios.post('/activity', {
      activity,
    });

    if (data.success) {
      setLoading(false);
      inputRef.current.disabled = true;
      console.log(data.activity);

      setActivity(
        activity + data.activity[data.activity.length - 1].suggestion
      );

      updateUser();
    }
  };

  useEffect(() => {
    if (!popupState) {
      setActivity('');
      inputRef.current.disabled = false;
    }
  }, [popupState]);
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
          ref={inputRef}
        />
      </div>

      <div className={styles.body__footer}>
        <div
          className={styles.body__footer__button}
          style={{
            cursor: loading ? 'not-allowed !important' : 'pointer',
            backgroundColor: loading
              ? 'var(--primary-light) !important'
              : 'var(--primary)',
          }}
          onClick={() => {
            handleActivity();
          }}
        >
          {loading ? 'Loading...' : 'Proceed'}
        </div>
      </div>
    </div>
  );
}
