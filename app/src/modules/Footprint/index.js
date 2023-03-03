import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

const Footprint = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/auth/me');

      setData({
        total: data.data.carbon,
        logs: data.data.logs,
      });
    };
    getData();
  }, []);

  if (data)
    return (
      <div className={styles.footprint}>
        <div className={styles.footprint__intro}>
          Track your <span>carbon footprint</span>
        </div>

        <div className={styles.footprint__body}>
          <div className={styles.footprint__body__total}>
            <div className={styles.footprint__body__total__heading}>
              Carbon Footprint
            </div>
            <div className={styles.footprint__body__total__value}>
              {data.total} <span>tonnes</span>
            </div>

            <div className={styles.footprint__body__total__description}>
              You can track your carbon footprint by logging your daily
              activities and offsetting your carbon emissions. You can even
              start cutting down on your carbon emissions by neutralizing your
              carbon footprint, and offsetting your carbon emissions.
            </div>
          </div>

          <div className={styles.footprint__body__emissions}></div>
          <div className={styles.footprint__body__offsets}></div>
        </div>
      </div>
    );
};

export default Footprint;
