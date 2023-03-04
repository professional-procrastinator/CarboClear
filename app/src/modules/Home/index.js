import styles from './index.module.scss';
import useSession from '@/utils/hooks/useSession';
import { useEffect, useRef, useState } from 'react';
import useOnClickOutside, { Popup } from '@/components/Popup';
import LeaderboardPopup from '../cards/leaderboards';
import axios from '@/utils/axios';
import { getName } from 'country-list';
import Button from '@/components/Button';
import TasksCard from '../cards/tasks';
import CarbonCard from '../cards/carbon';

const HomePage = () => {
  const user = useSession();
  const leaderRef = useRef(null);
  const [leader, setLeader] = useState(false);
  const [posData, setPosData] = useState({});
  useOnClickOutside(leaderRef, () => setLeader(false));

  const getPositions = async () => {
    const intData = await axios.get('/leaderboard/international');
    const natData = await axios.get('/leaderboard/national');
    setPosData({
      international: intData.data.position,
      national: natData.data.position,
    });
  };

  useEffect(() => {
    getPositions();
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.home__intro}>
        Good Day,{' '}
        <span className={styles.highlight}>
          {user?.user?.name.split(' ')[0]}
        </span>
      </h1>
      {console.log(user)}
      <div className={styles.home__cards}>
        <div className={styles.home__cards__first}>
          <div className={styles.home__cards__first__card}>
            <div className={styles.first}>
              <div>
                <h1 className={styles.cards__heading}>{user?.user?.name}</h1>
                <h1 className={styles.cards__points}>
                  You've scored{' '}
                  <span className={styles.highlight}>{user?.user?.points}</span>{' '}
                  points
                </h1>
              </div>
              <Button
                style={{
                  marginLeft: 'auto',
                  marginRight: '30px',
                  width: '145px',
                }}
                onClick={() => {
                  setLeader(true);
                }}
              >
                Leaderboard
              </Button>
            </div>
            <div className={styles.cards__headings}>
              <div className={styles.cards__subheading}>
                <span className={styles.highlights}>
                  #{posData['international']}
                </span>
                <span className={styles.s}>in the world</span>
              </div>
              <div className={styles.cards__subheading}>
                <span className={styles.highlights}>
                  #{posData['national']}
                </span>
                <span className={styles.s}>in your country</span>
              </div>
            </div>
          </div>
          <div className={styles.home__cards__first__card}>
            <CarbonCard />
          </div>
          <div className={styles.home__cards__first__card}>
            <TasksCard />
          </div>
        </div>
        <div className={styles.home__cards__second}>
          <div className={styles.home__cards__second__card1}></div>
          <div className={styles.home__cards__second__card}>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              className={styles.home__cards__second__card__div}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                height={150}
                width={150}
                viewBox='0 0 24 24'
              >
                <path d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' />
              </svg>
              <h2 className={styles.home__cards__second__card__h2}>
                New itinerary
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Popup ref={leaderRef} popupState={leader}>
        <LeaderboardPopup></LeaderboardPopup>
      </Popup>
    </div>
  );
};

export default HomePage;
