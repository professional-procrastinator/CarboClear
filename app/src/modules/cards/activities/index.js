import styles from './index.module.scss';

export default function Activites() {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header__title}>Your Activities</div>
      </div>

      <div className={styles.card__body}></div>
    </div>
  );
}
