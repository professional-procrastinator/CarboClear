import useSession from '@/utils/hooks/useSession';
import styles from './index.module.scss';
import { useRef, useState } from 'react';
import useOnClickOutside from '@/components/Popup';
import { Popup } from '@/components/Popup';
import DetailsPopup from './details';

export default function Activites() {
  const { user } = useSession();
  const [popup, setPopup] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const popupRef = useRef(null);

  useOnClickOutside(popupRef, () => setPopup(false));

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
        <>
          <div className={styles.card__titles}>
            <div className={styles.card__titles__title}>ACTIVITY</div>
            <div className={styles.card__titles__title}>SUGGESTION</div>
          </div>

          <div className={styles.card__body}>
            {user.activity.map((activity, index) => {
              return (
                <div
                  className={styles.card__body__activity}
                  onClick={() => {
                    setCurrentActivity(activity);
                    setPopup(true);
                  }}
                >
                  <div className={styles.card__body__activity__text}>
                    {activity.activity}
                  </div>
                  <div className={styles.card__body__activity__suggestion}>
                    {activity.suggestion}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      <Popup popupState={popup} ref={popupRef}>
        <DetailsPopup
          activity={currentActivity}
          popupState={popup}
          setPopup={setPopup}
        />
      </Popup>
    </div>
  );
}
