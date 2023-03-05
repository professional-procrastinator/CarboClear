import useSession from '@/utils/hooks/useSession';
import styles from './index.module.scss';

export default function Activites() {
  const { user } = useSession();
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header__title}>Your Activities</div>
      </div>

      <div className={styles.card__description}>
        This is a log of all the eco-friendly ways your activities can be done.
        Upload an image of you doing the task to earn more points! Click on an
        activity to see more details.
      </div>

      {user ? (
        <div className={styles.card__body}>
          <div className={styles.card__body__titles}>
            <div className={styles.card__body__titles__title}>ACTIVITY</div>
            <div className={styles.card__body__titles__title}>SUGGESTION</div>
            <div className={styles.card__body__titles__title}>VERIFY</div>
          </div>

          {user.activity.map((activity, index) => {
            return (
              <div className={styles.card__body__activity}>
                <div className={styles.card__body__activity__text}>
                  {activity.activity}
                </div>
                <div className={styles.card__body__activity__suggestion}>
                  {activity.suggestion}
                </div>

                {!activity.verified ? (
                  <div className={styles.card__body__activity__verify}>
                    <div
                      className={styles.card__body__activity__verify__button}
                    >
                      Verify
                    </div>
                  </div>
                ) : (
                  'Verified'
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
