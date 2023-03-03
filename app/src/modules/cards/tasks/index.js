import styles from './index.module.scss';
import axios from '../../../utils/axios.js';
import { useEffect } from 'react';
export default function TasksCard({ tasks }) {
  if (tasks.length > 0) {
    return (
      <div className={styles.card}>
        <div className={styles.card__header}>
          <div className={styles.card__header__title}>Daily Tasks</div>
          <div className={styles.card__header__status}>
            <span className={styles.card__header__status__text}>
              {completedTasks / tasks.length}
            </span>
          </div>
        </div>
        <div className={styles.card__body}>
          {tasks.map((task) => {
            return (
              <div className={styles.card__body__task}>
                <div className={styles.card__body__task__title}>
                  {task.name}
                </div>
                <div className={styles.card__body__task__points}>
                  {task.points}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.card__footer}></div>
      </div>
    );
  }
}
