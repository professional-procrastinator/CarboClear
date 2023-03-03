import styles from './index.module.scss';
import axios from '../../../utils/axios.js';
import { useEffect, useState } from 'react';
export default function TasksCard({}) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      if (window.localStorage.getItem('tasks') !== null) {
        setTasks(JSON.parse(window.localStorage.getItem('tasks')));
        return;
      }

      const { data } = await axios.get('/tasks');
      setTasks(data.tasks);

      window.localStorage.setItem('tasks', JSON.stringify(data.tasks));
    };

    getTasks();
  }, []);

  if (tasks.length > 0) {
    return (
      <div className={styles.card}>
        <div className={styles.card__header}>
          <div className={styles.card__header__title}>Tasks</div>
          <div className={styles.card__header__status}>
            <span className={styles.card__header__status__text}>
              0/{tasks.length}
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
