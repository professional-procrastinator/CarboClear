import useSession from '@/utils/hooks/useSession';
import styles from './index.module.scss';
export default function CarbonCard() {
  const { user } = useSession();

  if (user)
    return (
      <div className={styles.card}>
        <div className={styles.card__header}>
          <div className={styles.card__header__title}>Carbon Footprint</div>

          <div
            className={styles.card__header__action}
            onClick={() => {
              window.location.href = '/footprint';
            }}
          >
            View
          </div>
        </div>

        <div className={styles.card__body}>
          <div className={styles.card__body__value}>
            {(Math.round((user.carbon / 1000) * 100) / 100).toFixed(2)}{' '}
          </div>

          <div className={styles.card__body__unit}>tonnes</div>
        </div>
      </div>
    );
}
