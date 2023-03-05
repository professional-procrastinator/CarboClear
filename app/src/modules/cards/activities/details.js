import styles from './popup.module.scss';
import { timeAgo } from '@/utils/dates';
import { useState, useEffect, useRef } from 'react';
import useSession from '@/utils/hooks/useSession';

import * as cocossd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

export default function DetailsPopup({ activity, popupState, setPopup }) {
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef(null);
  const [predictionArr, setPredictions] = useState(null);
  const { updateUser } = useSession();

  const handleUpload = async (file) => {
    setLoading(true);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      setAttachment(reader.result);
      const model = await cocossd.load();

      const img = imgRef.current;
      const predictions = await model.detect(img);
      console.log(predictions);
      if (predictions.length > 0) {
        setLoading(false);
        return setPredictions(predictions);
      }
      setLoading(false);
      alert('Please take a better picture!');
    };
  };

  useEffect(() => {
    if (!popupState) {
      setAttachment(null);
    }
  }, [popupState]);

  if (activity)
    return (
      <div>
        <div className={styles.body}>
          <div className={styles.body__header}>
            <div className={styles.body__header__title}>Activity</div>
            <div className={styles.body__header__status}>
              {timeAgo(activity.date)}
            </div>
          </div>
        </div>
        <div className={styles.body__details}>
          <div className={styles.body__description}>
            <span>Activity</span> - {activity.activity}
          </div>

          <div
            style={{
              marginTop: '0px !important',
            }}
            className={styles.body__description}
          >
            <span>Suggestion</span> - {activity.suggestion}
          </div>
        </div>

        <div className={styles.body__verification}>
          <div className={styles.body__verification__text}>
            Did you follow the suggestion? Upload an image of you following the
            suggestion.
          </div>

          <div
            style={{
              marginTop: attachment ? '20px' : '0px',
            }}
            className={styles.body__image}
          >
            <img src={attachment} ref={imgRef} />
          </div>

          {!attachment ? (
            <div className={styles.body}>
              <input
                type='file'
                placeholder='Attachments'
                id='attachmentInput'
                style={{ display: 'none' }}
                onChange={(evt) => {
                  handleUpload(evt.target.files[0]);
                }}
              />

              <label htmlFor='attachmentInput' className={styles.body__upload}>
                ↑{' '}
                <span
                  style={{
                    fontSize: '16px',
                  }}
                >
                  Upload image
                </span>
              </label>
            </div>
          ) : (
            <div
              className={styles.body__upload}
              style={{
                fontSize: '16px',
                marginTop: '20px',
                disabled: loading,
                backgroundColor: loading
                  ? 'var(--primary-light)'
                  : 'var(--primary)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                if (loading) return;

                setLoading(true);

                predictionArr.forEach(async (prediction) => {
                  if (activity.suggestion.includes(prediction.class)) {
                    const { data } = await axios.post('/activity/verify/:id');
                    if (data.success) {
                      setPopup(false);
                      return updateUser();
                    }
                    return setPopup(false);
                  }
                });
                setLoading(false);
                alert('Please take a better picture!');
              }}
            >
              {loading ? 'Proceeding' : 'Proceed'}
            </div>
          )}
        </div>
      </div>
    );
}
