import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';

import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

export default function Verification({
  task,
  popupState,
  markTaskAsDone,
  setPopup,
}) {
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef(null);
  const [predictionArr, setPredictions] = useState(null);

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
    };
  };

  useEffect(() => {
    if (!popupState) {
      setAttachment(null);
    }
  }, [popupState]);
  if (task)
    return (
      <div className={styles.body}>
        <div className={styles.body__title}>{task.name}</div>

        <div className={styles.body__description}>
          Upload an image of you doing the task!
        </div>

        <div className={styles.body__image}>
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
              task.tagsForAI.forEach((tag) => {
                predictionArr.forEach((prediction) => {
                  if (
                    tag.includes(prediction.class) ||
                    prediction.class.includes(tag)
                  ) {
                    markTaskAsDone(task);
                    return setPopup(false);
                  }
                });
              });
              setLoading(false);
            }}
          >
            {loading ? 'Proceeding' : 'Proceed'}
          </div>
        )}
      </div>
    );
}
