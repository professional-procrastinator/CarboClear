import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import useOnClickOutside from '../../utils/hooks/useOnClickOutside';
import { useRef } from 'react';
import { Popup } from '@/components/Popup';
import OffsetPopup from './popup/offset';
import EmissionPopup from './popup/emission';

const Footprint = () => {
  const [data, setData] = useState(null);
  const emissionRef = useRef(null);
  const offsetRef = useRef(null);
  const [emission, setEmission] = useState(false);
  const [offset, setOffset] = useState(false);
  useOnClickOutside(emissionRef, () => setEmission(false));
  useOnClickOutside(offsetRef, () => setOffset(false));

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/auth/me');
      let emissionLogs = [];
      let offsetLogs = [];

      //loop through data.data.logs and filter out the ones into type 0 and 1
      //then set the data to the state
      data.data.logs.map((log) => {
        if (log.type == '0') {
          emissionLogs.push(log);
        } else if (log.type == '1') {
          offsetLogs.push(log);
        }
      });
      setData({
        total: data.data.carbon,
        logs: emissionLogs,
        offsetLogs: offsetLogs,
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
              {(Math.round((data.total / 1000) * 100) / 100).toFixed(2)}{' '}
              <span>tonnes</span>
            </div>

            <div className={styles.footprint__body__total__description}>
              You can track your carbon footprint by logging your daily
              activities and offsetting your carbon emissions. You can even
              start cutting down on your carbon emissions by neutralizing your
              carbon footprint, and offsetting your carbon emissions.
            </div>
          </div>

          <div className={styles.footprint__body__emissions}>
            <div className={styles.footprint__body__emissions__header}>
              <div
                className={styles.footprint__body__emissions__header__heading}
              >
                Emissions
              </div>
              <div
                className={styles.footprint__body__emissions__header__action}
                onClick={() => setEmission(true)}
              >
                New
              </div>
            </div>

            <div className={styles.footprint__body__emissions__body}>
              {data.logs.length > 0 ? (
                <>
                  {data.logs.map((log) => {
                    if (log.type == '0') {
                      return (
                        <div
                          className={
                            styles.footprint__body__emissions__body__item
                          }
                        >
                          <div
                            className={
                              styles.footprint__body__emissions__body__item__info
                            }
                          >
                            <div
                              className={
                                styles.footprint__body__emissions__body__item__info__text
                              }
                            >
                              {log.text}
                            </div>
                            <div
                              className={
                                styles.footprint__body__emissions__body__item__info__date
                              }
                            >
                              {log.date}
                            </div>
                          </div>

                          <div
                            className={
                              styles.footprint__body__emissions__body__item__value
                            }
                          >
                            {(((log.amount / 1000) * 100) / 100).toFixed(4)}{' '}
                            <span>t</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </>
              ) : (
                <div className={styles.noLogs}>
                  Click on the 'New' button to fill out a new emission.
                </div>
              )}
            </div>
          </div>

          <div className={styles.footprint__body__offsets}>
            <div className={styles.footprint__body__offsets__header}>
              <div className={styles.footprint__body__offsets__header__heading}>
                Offsets
              </div>
              <div
                className={styles.footprint__body__offsets__header__action}
                onClick={() => setOffset(true)}
              >
                New
              </div>
            </div>

            <div className={styles.footprint__body__offsets__body}>
              {data.offsetLogs.length > 0 ? (
                <>
                  {data.logs.map((log) => {
                    if (log.type == 1) {
                      return (
                        <div
                          className={
                            styles.footprint__body__offsets__body__item
                          }
                        >
                          <div
                            className={
                              styles.footprint__body__offsets__body__item__info
                            }
                          >
                            <div
                              className={
                                styles.footprint__body__offsets__body__item__info__text
                              }
                            >
                              {log.text}
                            </div>
                            <div
                              className={
                                styles.footprint__body__offsets__body__item__info__date
                              }
                            >
                              {log.date}
                            </div>
                          </div>

                          <div
                            className={
                              styles.footprint__body__offsets__body__item__value
                            }
                          >
                            {(((log.amount / 1000) * 100) / 100).toFixed(4)}{' '}
                            <span>t</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </>
              ) : (
                <div className={styles.noLogs}>
                  Click on the 'New' button to fill out a new offset.
                </div>
              )}
            </div>
          </div>
        </div>

        <Popup ref={emissionRef} popupState={emission}>
          <EmissionPopup close={setEmission} />
        </Popup>

        <Popup ref={offsetRef} popupState={offset}>
          <OffsetPopup close={setOffset} />
        </Popup>
      </div>
    );
};

export default Footprint;
