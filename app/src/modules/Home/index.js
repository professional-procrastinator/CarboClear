import styles from './index.module.scss';
import useSession from '@/utils/hooks/useSession';
import { useRef, useState } from 'react';
import useOnClickOutside, { Popup } from '@/components/Popup';
import LeaderboardPopup from '../cards/leaderboards';
import TasksCard from '../cards/tasks';

const HomePage = () => {
  const user = useSession();
  const leaderRef = useRef(null);
  const [leader, setLeader] = useState(false);
  useOnClickOutside(leaderRef, () => setLeader(false));
  return (
    <div className={styles.home}>
      <h1 className={styles.home__intro}>
        Good Day,{' '}
        <span className={styles.highlight}>
          {user?.user?.name.split(' ')[0]}
        </span>
      </h1>
      <div className={styles.home__cards}>
        <div className={styles.home__cards__first}>
          <div
            className={styles.home__cards__first__card}
            onClick={() => {
              setLeader(true);
            }}
          >
            <h1 className={styles.cards__heading}></h1>
          </div>
          <div className={styles.home__cards__first__card}></div>
          <TasksCard />
        </div>
        <div className={styles.home__cards__second}>
          <div className={styles.home__cards__second__card1}></div>
          <div className={styles.home__cards__second__card}></div>
        </div>
      </div>
      <Popup ref={leaderRef} popupState={leader}>
        <LeaderboardPopup></LeaderboardPopup>
      </Popup>
    </div>
  );
};

export default HomePage;
