import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';

export default function Verification({
  task,
  popupState,
  markTaskAsDone,
  setPopup,
}) {
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setAttachment(reader.result);
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
          <img src={attachment} />
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
              setTimeout(() => {
                markTaskAsDone(task);
                setLoading(false);
                setPopup(false);
              }, 3000);
            }}
          >
            {loading ? 'Proceeding' : 'Proceed'}
          </div>
        )}
      </div>
    );
}
